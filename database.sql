CREATE DATABASE "time_tracker";

CREATE TABLE "entry" (
    "id" SERIAL PRIMARY KEY,
    "entry" VARCHAR(255) NOT NULL,
    "project_id" INT REFERENCES "project", 
    "entry_date" DATE NOT NULL,
    "hours" DECIMAL(4, 2) NOT NULL
);

CREATE TABLE "project" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(120) NOT NULL
);

CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
