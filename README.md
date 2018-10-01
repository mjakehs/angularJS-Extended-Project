# AngularJS-Extended-Project

## Master Branch

Project Management application with three main views: 
- Entry allows for a user to submit a work entry to log their contribution to a project
- Project allows user to create a new project
- Report shows user total hours spend on all projects in a bar chart

Authentication with passport, cookie-session, and bcrypt for hashing passwords. 

## Feature-connections-and-messages Branch

The goal of this branch was to create a side panel UI and back-end functionality for social interactions between users.
This goal was not accomplished within the duration of this sprint.

Features that are currently (mostly) working:
- Connection requests and connections.
- Back-End routes and table statements for messaging.
- UI for managing other user's access to your project.
- Ability to send messages to other users and view messages.

Remainder of the to-do list for this branch:
- Fix project view to show assigned and created projects
- Remove ability to send connection requests to self
- Create a new route for / to login - redirect to index.html
- Style the social panel UI.

## App Dependencies

*  node.js -- run npm install to install all server dependencies
*  postgresQL -- create database "time_tracker" and run queries in database.sql file

