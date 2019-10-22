-- Test seeds for CHARACTER run in mysql
INSERT INTO characters
    (name, image, hp, attack_points_1, attack_points_2, createdAt, updatedAt)
VALUES("Big Guy", "assets/img/big-guy.png", 100, 5, 2, 1220, 1220),
    ("Camo Guy", "assets/img/camo-guy.png", 200, 7, 4, 1230, 1230),
    ("Pirate Lady", "assets/img/pirate-lady.png", 400, 3, 10, 1220, 1220),
    ("Cheetah Head", "assets/img/cheetah-head.png", 350, 7, 4, 1220, 1220);

-- Test seeds for OPPONENTS run in mysql
INSERT INTO opponents
    (name, image, hp, attack_points_1, attack_points_2, createdAt, updatedAt)
VALUES("Raiden", "assets/img/opponent1.png", 150, 3, 5, 1220, 1220),
    ("Chun-Li", "assets/img/opponent2.png", 270, 4, 2, 1230, 1230),
    ("Ridley", "assets/img/opponent3.png", 410, 5, 9, 1220, 1220),
    ("Doomfist", "assets/img/opponent4.png", 250, 6, 8, 1220, 1220);