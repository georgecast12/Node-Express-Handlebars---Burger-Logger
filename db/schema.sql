DROP DATABASE IF EXISTS burgers_db;
-- Creates the "burgers_db" database --
CREATE DATABASE burgers_db;
-- Creates the "todolist" database --
USE burgers_db;

CREATE TABLE burgers(
id int NOT NULL AUTO_INCREMENT,
burger_name varchar(255) NOT NULL,
devoured BOOLEAN,
dateStamp date,
PRIMARY KEY (id)
);
