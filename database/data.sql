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

INSERT INTO Director (director_name) VALUES
('Frank Darabont'),
('Christopher Nolan'),
('Quentin Tarantino'),
('Francis Ford Coppola'),
('Sidney Lumet');

INSERT INTO BelongTo (id_user, id_group) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);

INSERT INTO Logs (id_user, date, action) VALUES
(1, '2022-04-20 13:30:00', 'Logged in'),
(2, '2022-04-21 09:45:00', 'Added a new movie'),
(3, '2022-04-22 16:15:00', 'Updated profile'),
(1, '2022-04-23 11:00:00', 'Logged out');

INSERT INTO Preferences (id_user, id_genre) VALUES 
(1, 18),
(1, 28),
(2, 18),
(2, 53),
(3, 28),
(3, 53);
