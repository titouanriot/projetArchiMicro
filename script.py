import csv
from tmdbv3api import TMDb
from tmdbv3api import Movie

API_KEY = 'd2f4e4207e2018e4756438b0075025d1'

# Initier la connexion à l'API de TMDB
tmdb = TMDb()
tmdb.api_key = API_KEY
tmdb.language = 'fr-FR'

# Créer un objet pour récupérer les informations des films
movie = Movie()

total_pages = 100
movie_ids = []

with open('movies.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    # writer.writerow(['id', 'original_title', 'title', 'original_language', 'genres', 'poster_path', 'release_date', 'runtime', 'vote_average', 'vote_count', 'overview'])
    writer.writerow(['id', 'budget', 'genres', 'original_language', 'popularity', 'release_date', 'revenue', 'runtime', 'vote_average', 'vote_count'])

    for page in range(1, total_pages+1):
        popular_movies = movie.popular(page=page)
        for popular_movie in popular_movies:
            movie_ids.append(popular_movie['id'])
            m = movie.details(popular_movie['id'])
            # writer.writerow([m['id'], m['original_title'], m['title'], m['original_language'], m['genres'], m['poster_path'], m['release_date'], m['runtime'], m['vote_average'], m['vote_count'], m['overview']])
            writer.writerow([m['id'], m['budget'], [genre['name'] for genre in m['genres']], m['original_language'], m['popularity'], m['release_date'], m['revenue'], m['runtime'], m['vote_average'], m['vote_count']])


print(f"Nombre de films populaires : {len(movie_ids)}")

