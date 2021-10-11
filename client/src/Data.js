// this is the api request helper

import { options } from '../../api/routes';

function Data() {
  function api(
    path,
    method,
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = 'http://localhost:5000/api' + path;

    // api request config
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // check if needs authorization
    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.email}:${credentials.password}`
      );

      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(path, options);
  }

  // API requests

  // GET user
  async function getUser(email, password) {
    const user = await api('/users', 'GET', null, true, { email, password });

    if (user.status === 200) {
      return user.json().then(data => data);
    } else if (user.status === 401) {
      return null;
    }
  }

  // POST (create) user
  async function createUser(newUser) {
    const response = await api('/users', 'POST', newUser);

    if (response.status === 201) {
      console.log(
        `A new account was successfully created for ${newUser.fullName}`
      );
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
  }

  // GET user goals
  async function getGoals(user) {
    const goals = await api('/goals', 'GET', null, true, {
      email: user.email,
      password: user.password,
    });

    if (goals.status === 200) {
      return goals.json().then(data => data);
    }
  }

  // POST (create) goal

  // DELETE goal

  // GET goal detail

  // PUT (edit) goal detail
}

export default Data;
