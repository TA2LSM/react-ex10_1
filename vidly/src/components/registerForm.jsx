import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form';

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().email().min(3).max(32).required().label('Username'),
    password: Joi.string().min(5).required().label('Password'),
    name: Joi.string().min(3).required().label('Name'),
  };

  doSubmit = () => {
    // Call the server, save the changes, redirect user to different page
    console.log('Submitted 2');
  };

  render() {
    return (
      <div>
        <h3>Please Register</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username')}
          {this.renderInput('password', 'password')}
          {this.renderInput('name')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
