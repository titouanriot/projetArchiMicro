import csv
from tmdbv3api import TMDb, Movie

API_KEY = '6b33818ca7560993ece79da70a9fc439'
FILE_NAME = 'toto.csv'
NB_MOVIES_TO_LOAD = 20

# Initier la connexion à l'API de TMDB
tmdb = TMDb()
tmdb.api_key = API_KEY
tmdb.language = 'fr-FR'

movie = Movie()
total_pages = NB_MOVIES_TO_LOAD // 20
movie_ids = []

with open('./dataset/'+FILE_NAME, mode='w', newline='') as file:
    writer = csv.writer(file)
    # writer.writerow(['id', 'budget', 'genres', 'original_language', 'popularity', 'release_date', 'revenue', 'runtime', 'vote_average', 'vote_count'])
    writer.writerow(['id', 'genres', 'popularity'])

    for page in range(1, total_pages+1):
        popular_movies = movie.popular(page=page)
        for popular_movie in popular_movies:
            movie_ids.append(popular_movie['id'])
            m = movie.details(popular_movie['id'])
            # writer.writerow([m['id'], m['budget'], [genre['name'] for genre in m['genres']], m['original_language'], m['popularity'], m['release_date'], m['revenue'], m['runtime'], m['vote_average'], m['vote_count']])
            writer.writerow([m['id'], [genre['name'] for genre in m['genres']], m['popularity']])


print(f"Nombre de films chargés : {len(movie_ids)}")
