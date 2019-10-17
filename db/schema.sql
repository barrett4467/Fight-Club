DROP DATABASE IF EXISTS fight_club;
CREATE DATABASE fight_club;
USE fight_club;

CREATE TABLE players (
	id INT AUTO_INCREMENT NOT NULL,
	name VARCHAR(50),
    hp INT,
    attack INT,
    PRIMARY KEY (id)
);
CREATE TABLE opponents (
	id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50),
    hp INT,
    attack INT,
    PRIMARY KEY (id)
);
