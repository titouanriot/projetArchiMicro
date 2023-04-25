INSERT INTO User (first_name, last_name, email, birth_date, password, is_user_account_active, is_admin) VALUES
('John', 'Doe', 'john.doe@example.com', '1985-05-10', 'password123', TRUE, FALSE),
('Jane', 'Doe', 'jane.doe@example.com', '1990-07-12', 'qwerty123', TRUE, FALSE),
('Bob', 'Smith', 'bob.smith@example.com', '1978-03-22', 'letmein123', TRUE, TRUE),
('Alice', 'Jones', 'alice.jones@example.com', '1995-11-02', 'pass123word', TRUE, FALSE),
('David', 'Brown', 'david.brown@example.com', '1983-09-14', 'brown123', TRUE, FALSE);

INSERT INTO Groupe (group_name, owner) VALUES
('Movie lovers', 1),
('TV series fans', 2),
('Action movies', 3),
('Romantic comedies', 4),
('Sci-fi geeks', 5);

INSERT INTO Movie (original_title, title, language, category, poster_path, release_date, runtime, vote_average, vote_count, overview) VALUES 
('The Shawshank Redemption', 'Les évadés', 'en', 'drame', '/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg', '1994-09-23', 142, 8.7, 19480, "En 1947, Andy Dufresne, un jeune banquier, est condamné à la prison à vie pour le meurtre de sa femme et de son amant. Ayant beau clamer son innocence, il est emprisonné à la prison d'État de Shawshank, la pire de l'État du Maine. Il y fait la connaissance d'un autre prisonnier, Red, qui lui, est capable de se procurer tout ce dont on peut avoir besoin en prison."),
('The Dark Knight', 'The Dark Knight : Le Chevalier noir', 'en', 'action', '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', '2008-07-18', 152, 8.5, 23187, "Dans ce nouveau volet, Batman augmente les mises dans sa guerre contre le crime. Avec l'appui du lieutenant de police Jim Gordon et du procureur de Gotham, Harvey Dent, Batman vise à éradiquer le crime organisé qui pullule dans la ville. Leur association est très efficace mais elle sera bientôt bouleversée par le chaos déclenché par un criminel extraordinaire que les citoyens de Gotham connaissent sous le nom de Joker."),
('Pulp Fiction', 'Pulp Fiction', 'en', 'thriller', '/dRZpdpKLgN9nk57zggJCs1TjJb4.jpg', '1994-09-10', 154, 8.5, 20589, "L'odyssée sanglante et burlesque de petits malfrats dans la jungle de Hollywood à travers trois histoires qui s'entremêlent."),
('The Godfather', 'Le Parrain', 'en', 'Drame, Crime', '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', '1972-03-14', 175, 8.7, 15098, 'Le patriarche vieillissant d’une famille de criminels passe la main à son fils.'),
('12 Angry Men', 'Douze hommes en colère', 'en', 'Drame', '/3W0v956XxSG5xgm7LB6qu8ExYJ2.jpg', '1957-04-10', 96, 8.5, 5437, 'Douze jurés doivent délibérer sur le sort d’un jeune homme accusé de meurtre.'),
('Schindler''s List', 'La Liste de Schindler', 'en', 'Drame, Histoire, Guerre', '/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg', '1993-11-30', 195, 8.5, 11627, 'L’histoire vraie d’un homme d’affaires qui a sauvé la vie de plus de mille Juifs pendant la Shoah.');

INSERT INTO Director (director_name) VALUES
('Frank Darabont'),
('Christopher Nolan'),
('Quentin Tarantino'),
('Francis Ford Coppola'),
('Sidney Lumet');

INSERT INTO Genre (genre_name) VALUES
('drame'),
('action'),
('thriller'),
('crime'),
('romance'),
('science-fiction');

INSERT INTO BelongTo (id_user, id_group) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);

INSERT INTO Watched (id_user, id_movie, appreciation) VALUES
(1,1,5),
(1,2,4),
(1,3,3),
(2,1,4),
(2,2,5),
(2,3,4),
(3,1,5),
(3,2,4),
(4,4,5),
(4,5,4),
(5,2,4),
(5,4,5);

INSERT INTO DirectedBy (id_director, id_movie) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);

INSERT INTO HasGenre (id_genre, id_movie) VALUES
(1,1),
(2,2),
(3,3),
(1,4),
(1,5),
(4,4),
(1,6),
(5,2);

INSERT INTO Logs (id_user, date, action) VALUES
(1, '2022-04-20 13:30:00', 'Logged in'),
(2, '2022-04-21 09:45:00', 'Added a new movie'),
(3, '2022-04-22 16:15:00', 'Updated profile'),
(1, '2022-04-23 11:00:00', 'Logged out');

INSERT INTO Preferences (id_user, id_genre) VALUES 
(1, 1),
(1, 2),
(2, 1),
(2, 3),
(3, 2),
(3, 3);