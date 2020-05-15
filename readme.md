## About

This is a personal proyect in which I'll use most of the tools I know and some ideas I had while learning the things.

You're free to base any project with this, but **please** don't be that one person that simply forks and reposts somewhere else, be mindful and create something better if you plan on doing that.

## Technologies used.

- Mongo. Used a development local database and one provided by MongoLab (In the heroku addons section).
- Express. The main tool that glues everything together.
- Browserify. Used it as a mean to bundle modern javascript.
- Pug. Definitely an easy to use, good looking and python like template engine.
- JWT. Since there's some non-important information that could improve user experience I decided to make a system that tries to find a lecture you've not read before by storing an array of everything you've read.

## Ideas.

I bundled all the settings that I get from the environment or that I should get in a settings utility, that I can share across the web, because Javascript only runs imported modules once.