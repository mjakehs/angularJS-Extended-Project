CREATE DATABASE "time_tracker";

CREATE TABLE "entry" (
    "id" SERIAL PRIMARY KEY,
    "entry" VARCHAR(255) NOT NULL,
    "project_id" INT REFERENCES "project", 
    "person_id" INT REFERENCES "person",
    "entry_date" DATE NOT NULL,
    "hours" DECIMAL(4, 2) NOT NULL
);

CREATE TABLE "project" (
    "id" SERIAL PRIMARY KEY,
    "person_id" INT REFERENCES "person",
    "name" VARCHAR(120) NOT NULL
);

CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "connections" (
	"id" SERIAL PRIMARY KEY,
	"person_one_id" INT,
	"person_two_id" INT,
	"connection_date" DATE DEFAULT CURRENT_DATE
);

CREATE TABLE "messages" (
	"id" SERIAL PRIMARY KEY,
	"message_body" VARCHAR(300) NOT NULL,
	"from_person_id" INT NOT NULL,
	"to_person_id" INT NOT NULL,
	"message_date" DATE NOT NULL
);

CREATE TABLE "person_project" (
	"id" SERIAL PRIMARY KEY,
	"project_id" INT REFERENCES "project",
	"owner_id" INT,
	"member_id" INT,
	"addition_date" DATE DEFAULT CURRENT_DATE
);