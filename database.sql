CREATE DATABASE "time_tracker";

CREATE TABLE "entry" (
    "id" SERIAL PRIMARY KEY,
    "entry" VARCHAR(255) NOT NULL,
    "project_id" REFERENCES "project", 
    "entry_date" DATE NOT NULL,
    "start_time" DATE NOT NULL,
    "end_time" DATE NOT NULL
);

CREATE TABLE "project" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(120) NOT NULL
);