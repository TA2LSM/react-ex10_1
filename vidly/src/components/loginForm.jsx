import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form';

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(32).required().label('Username'),
    password: Joi.string().min(4).required().label('Password'),
  };

  doSubmit = () => {
    // Call the server, save the changes, redirect user to different page
    console.log('Submitted');
  };

  render() {
    return (
      <div>
        <h3>Please Login</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username')}
          {this.renderInput('password', 'password')}
          {/* <div className='mb-3 form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='exampleCheck1'
            />
            <label
              className='form-check-label'
              htmlFor='exampleCheck1'
            >
              Keep me logged in
            </label>
          </div> */}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
