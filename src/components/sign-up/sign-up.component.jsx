import React, { Component } from 'react'
import './sign-up.style.scss'

import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmPassword: '',
      displayName: '',
      email: '',
      password: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      confirmPassword: '',
      displayName: '',
      email: '',
      password: ''
    })
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({[name]: value})
  }

  render() {
    return (
      <div className="sign-up">
        <h2>I don't have an account</h2>
        <span>Sign up with your email and password</span>

        <form onSubmit={ this.handleSubmit }>
          <FormInput name='display-name' 
            label="Display Name"
            type="string"
            value={ this.state.displayName }
            handleChange={ this.handleChange }
            required
          />

          <FormInput name='email' 
            label="Email"
            type="email"
            value={ this.state.email }
            handleChange={ this.handleChange }
            required
          />

          <FormInput name='password' 
            label="Password"
            type="password"
            value={ this.state.password }
            handleChange={ this.handleChange }
            required
          />

          <FormInput name='confirm-password' 
            label="Confirm Password"
            type="password"
            value={ this.state.confirmPassword }
            handleChange={ this.handleChange }
            required
          />

          <CustomButton type="submit">Sign In</CustomButton>
        </form>
      </div>
    )
  }
}
