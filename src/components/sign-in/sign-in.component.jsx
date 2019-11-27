import React, { Component } from 'react'
import './sign-in.style.scss'

import CustomButton from './../custom-button/custom-button.component';
import FormInput from './../form-input/form-input.component';
import { connect } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;

    emailSignInStart(email, password);    
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({[name]: value})
  }

  render() {
    const { googleSignInStart } = this.props;
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={ this.handleSubmit }>
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

          <div className="button-container">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton 
              isGoogleButton
              onClick={ googleSignInStart }
              style={{marginTop: '10px'}}
              type='button'
            >Sign In With Google</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
  googleSignInStart: () => dispatch(googleSignInStart()),
})

export default connect(null, mapDispatchToProps)(SignIn)