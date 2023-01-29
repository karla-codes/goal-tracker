# Goal Pad

Goal Pad is a full stack app for keeping track of your goals. Goal pad lets you create an account where you can add, update, and delete goals.

## Motivation

After graduating from Treehouse's Full Stack Javascript techdegree, I was really motivated to create a project all on my own. I had recently acquired the [Self Journal](https://bestself.co/products/self-journal) and loved the idea of creating a digital version of it. The Self Journal has a lot of parts to it so I only focused on creating and defining goals.

## Tech stack

- Front-end
  - [React (Create React App)](https://create-react-app.dev/docs/getting-started)
- REST API
  - [Express](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/atlas/database) database
  - [Mongoose ODM](https://mongoosejs.com/)
  - [basic-auth](https://www.npmjs.com/package/basic-auth) for basic authorization
  - [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing
  - [react-markdown](https://www.npmjs.com/package/react-markdown)

## How to use

Goal Pad is live at [https://goal-pad.fly.dev/](https://goal-pad.fly.dev/). You can check out the demo account with email: **demo@email.com** and password: **password**. You can create/update/delete goals. The demo version does not let you create an account.

### Overview

The basic functionality of this app:

- Create account with an email address and password
- Authenticate and authorize users with [bcrypt](https://www.npmjs.com/package/bcrypt) and [basic-auth](https://www.npmjs.com/package/basic-auth)
- Create goals that include the following sections:
  - Goal title
  - Motivations
  - Progress Milestones
  - Accountability
  - Goal subject
- Edit and delete goals
