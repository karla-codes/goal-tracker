// this is the api request helper

class Data {
  api(path, method, body = null, requiresAuth = false, credentials = null) {
    const url = 'http://localhost:' + process.env.PORT || 5000 + '/api' + path;

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

    return fetch(url, options);
  }

  // API requests

  // GET user
  async getUser(email, password) {
    const user = await this.api('/users', 'GET', null, true, {
      email,
      password,
    });

    if (user.status === 200) {
      return user.json().then(data => data);
    } else if (user.status === 401) {
      return null;
    }
  }

  // POST (create) user
  async createUser(newUser) {
    const response = await this.api('/users', 'POST', newUser);

    if (response.status === 201) {
      console.log(
        `A new account was successfully created for ${newUser.fullName}`
      );
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
  }

  // GET user goals
  async getGoals(user) {
    const goals = await this.api('/goals', 'GET', null, true, {
      email: user.email,
      password: user.password,
    });

    if (goals.status === 200) {
      return goals.json().then(data => data);
    }
  }

  // GET single goal
  async getGoal(goalId, user) {
    const goal = await this.api(`/goals/${goalId}`, 'GET', null, true, {
      email: user.email,
      password: user.password,
    });

    if (goal.status === 200) {
      return goal.json().then(data => data);
    } else if (goal.status === 404) {
      return goal.json().then(data => data);
    }
  }

  // POST (create) goal
  async createGoal(newGoal, user) {
    const response = await this.api('/goals', 'POST', newGoal, true, {
      email: user.email,
      password: user.password,
    });

    if (response.status === 201) {
      console.log('Goal was successfully created');
      return;
    } else if (response.status === 404) {
      return response.json().then(data => data);
    } else if (response.status === 400) {
      return response.json().then(data => data);
    }
  }

  // UPDATE goal
  async updateGoal(goal, goalId, user) {
    const updatedGoal = await this.api(`/goals/${goalId}`, 'PUT', goal, true, {
      email: user.email,
      password: user.password,
    });

    if (updatedGoal.status === 204) {
      console.log(`Goal ${goalId} was updated successfully`);
      return;
    } else if (updatedGoal.status === 404) {
      return updatedGoal.json().then(data => data);
    } else if (updatedGoal.status === 403) {
      return;
    } else if (updatedGoal.status === 400) {
      return;
    }
  }

  // DELETE goal
  async deleteGoal(goalId, user) {
    const response = await this.api(`/goals/${goalId}`, 'DELETE', null, true, {
      email: user.email,
      password: user.password,
    });

    if (response.status === 204) {
      console.log('Goal was successfully deleted');
      return;
    } else if (response.status === 404) {
      return response.json().then(data => data.message);
    }
  }
}

export default Data;
