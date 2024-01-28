# Smart Test Task - Vue.js Web Application

## Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Technologies](#technologies)
- [Installation](#installation)
- [Structure](#structure)
- [Deployment](#deployment)

## Introduction

This Vue.js web application interacts with the ReqRes API to display a list of users. Users can be added, deleted, and their details can be viewed. Additionally, the application supports filtering by name and implements form validation for adding new users.

## Requirements

- Display a list of users from the ReqRes API, showing their name, email, and avatar.
- Implement the ability to add a new user through a form with input fields for name and email.
- Allow users to be deleted from the list with a corresponding button or icon.
- Create a "User Details" component to show additional information about each user upon clicking their name. Displayed details include: phone number, address
- Add a search field for filtering users by name or other parameters. The displayed user list should update dynamically as the user types.
- Implement form validation for adding new users. The email field should only accept valid email addresses, and the name field should not be empty. Display appropriate error messages if the form is submitted with invalid data.
- Apply styles to the application using CSS or a CSS preprocessor to create an attractive and user-friendly interface.

## Technologies

- **Vue.js:**: A JavaScript framework for building user interfaces.
- **Formkit:** A Vue.js form library for handling forms and form validation.
- **Axios:** A popular HTTP client for making requests to external APIs.

## Installation

1. **Clone the repo**

```bash
https://github.com/your-username/smart-test-task.git
```

2. **Install dependencies** It's recommended to use npm:

```
npm install
```

3. **Create a .env.local file**

## Structure

The project is structured as follows:

- _components:_ React components used throughout the application.
- _hooks:_ Custom React hooks.
- _public:_ Static assets such as images and styles.
- _services:_ Business logic and external service interactions.
- _types_: TypeScript types.

## Deployment

The project is currently deployed on [Vercel](https://smart-test-task.vercel.app/)

Feel free to check the live deployment and interact with the application.
