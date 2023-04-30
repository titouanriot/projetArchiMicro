import ast
import pandas as pd
from pandas.core.frame import DataFrame
from sqlalchemy.orm import Session
from typing import List, Set

from app.services.movieService import MovieService

N_MOVIES_TO_RECOMMEND: int = 5


""" Supprimer les films déjà vus par au moins une personne du groupe """
def remove_seen_movies(movies_df: DataFrame, movie_list: List[int]):
    non_duplicate_movie_list: List[int] = list(set(movie_list))
    unseen_movies_df: DataFrame = movies_df.loc[(~movies_df['id'].isin(non_duplicate_movie_list))]
    return unseen_movies_df

""" Supprimer les films qui ont des genres n'intéressant aucune personne du groupe """
def remove_movies_without_any_favorite_genre(movies_df: DataFrame, genre_list: List[str]):
    non_duplicate_genre_list: List[str] = list(set(genre_list))
    recommendable_movies_df: DataFrame = movies_df.loc[movies_df[non_duplicate_genre_list].any(axis=1)]
    return recommendable_movies_df

""" Calculer un poids par film pour augmenter la pertinence de la recommendation """
def compute_weight(movies_df: DataFrame, favorite_genres: List[str]):
    movies_df_copy: DataFrame = movies_df.copy()
    favorite_genres_set: Set[str] = set(favorite_genres)
    
    for index, movie in movies_df_copy.iterrows():
        movie_genres_set: Set[str] = set(ast.literal_eval(movie['genres']))
        common_genres: Set[str] = favorite_genres_set.intersection(movie_genres_set)

        poids: int = 0
        for genre in common_genres:
            poids += favorite_genres.count(genre)

        movies_df_copy.loc[index, 'Poids'] = poids

    return movies_df_copy

""" Garder les films avec le poids maximal """
def sort_movies_by_descending_weight(movies_df: DataFrame):
    movies_sorted_by_weight: DataFrame = movies_df.sort_values(by='Poids', ascending=False)
    return movies_sorted_by_weight.head(N_MOVIES_TO_RECOMMEND)

""" Parmi les films avec un poids maximal, prendre le plus populaire """
def sort_movies_by_descending_popularity(movies_df: DataFrame):
    movies_sorted_by_popularity: DataFrame = movies_df.sort_values(by='popularity', ascending=False)
    return movies_sorted_by_popularity.head(N_MOVIES_TO_RECOMMEND)

""" Mettre bout à bout l'ensemble des fonctions ci-dessus pour recommander un film """
def recommend_movies(seen_movie_lists: List[List[int]], favorite_genre_lists: List[List[str]], db: Session):
    single_movie_list: List[int] = [movie for sublist in seen_movie_lists for movie in sublist]
    single_genre_list: List[int] = [genre for sublist in favorite_genre_lists for genre in sublist]

    movies_df: DataFrame = MovieService.create_df_from_db(db)

    # Définir un genre 'Autre' pour les films sans genre
    movies_df['genres'] = movies_df['genres'].replace('[]', "['Autre']")

    # Récupérer la liste des genres
    genres_list: List[str] = movies_df['genres'].apply(lambda x: eval(x)).explode().unique()

    # Créer une nouvelle colonne dans le df pour chaque genre, mettre 1 ou 0 selon si le film est de ce genre ou non
    for genre in genres_list:
        movies_df[genre] = movies_df['genres'].apply(lambda x: 1 if genre in x else 0)

    unseen_movies_df: DataFrame = remove_seen_movies(movies_df, single_movie_list)
    recommendable_movies_df: DataFrame = remove_movies_without_any_favorite_genre(unseen_movies_df, single_genre_list)
    weighted_movies_df: DataFrame = compute_weight(recommendable_movies_df, single_genre_list)
    movies_sorted_by_weight: DataFrame = sort_movies_by_descending_weight(weighted_movies_df)
    movies_sorted_by_popularity: DataFrame = sort_movies_by_descending_popularity(movies_sorted_by_weight)

    return movies_sorted_by_popularity['id'].tolist()