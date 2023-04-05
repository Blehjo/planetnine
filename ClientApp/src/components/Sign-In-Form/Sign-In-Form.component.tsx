import { useState, FormEvent, ChangeEvent, Component } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../Form-Input/Form-Input.component';
import { BUTTON_TYPE_CLASSES } from '../Button/Button.component';

import { SignInContainer, ButtonsContainer } from './Sign-In-Form.styles';
import { Col, Form, Row, Button } from 'react-bootstrap';
// import {
//   googleSignInStart,
//   emailSignInStart,
// } from '../../store/user/user.action';

interface IDefaultFormFields  {
  username: string;
  password: string;
};

class SignInForm extends Component<{}, IDefaultFormFields> {
  constructor (props: {}) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: '',
      password: ''
    }
  }

  async handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

  }

  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    this.setState({ ...this.state, [name]: value});
  }

  render() {
    const { username, password } = this.state;
    return (
      <SignInContainer>
        <h2>Already Signed Up?</h2>
        <span>Sign in with your username and password</span>
        <Form onSubmit={this.handleSubmit} style={{ marginTop: '1rem' }}>
          <Row>
          <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Control
                type="username"
                name="username"
                required
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                required
                onChange={this.handleChange}
                name="password"
                value={password}
              />
          </Form.Group>
          <div className="col-12 mb-3" style={{ justifyContent: 'center' }}>
            <Button className="col-12 mb-3" variant="light" as="input" type="submit" value="Sign In"/>
          </div>
          </Row>
        </Form>
      </SignInContainer>
    );
  }
};

export default SignInForm;