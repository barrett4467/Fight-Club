-- Test seeds for CHARACTER run in mysql
INSERT INTO characters
    (name, image, hp, attack_points_1, attack_points_2, createdAt, updatedAt)
VALUES("Test1", "assets/img/big-guy.png", 100, 5, 2, 1220, 1220),
    ("Test2", "assets/img/camo-guy.png", 200, 7, 4, 1230, 1230),
    ("Test3", "assets/img/pirate-lady.png", 400, 3, 10, 1220, 1220),
    ("Test4", "assets/img/cheetah-head.png", 350, 7, 4, 1220, 1220);


INSERT INTO opponents
    (name, hp, attack)
VALUES
    ("testOpp", 200, 7);