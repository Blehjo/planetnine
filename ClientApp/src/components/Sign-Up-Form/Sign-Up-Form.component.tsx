import { useState, FormEvent, ChangeEvent, Component } from 'react';
import { useDispatch } from 'react-redux';

import { SignUpContainer } from './Sign-Up-Form.styles';
import { Form, Row, Button } from 'react-bootstrap';
// import { signUpStart } from '../../store/user/user.action';

interface IDefaultFormFields {
  username: string;
  about?: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  imageLink?: string;
  imageSource?: string | ArrayBuffer | null | undefined;
  imageFile?: File | null;
};

class SignUpForm extends Component<{}, IDefaultFormFields> {
  constructor(props: {}) {
    super(props);

    this.state = {
      username: "",
      about: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      firstName: "",
      lastName: "",
      imageLink: "",
      imageSource: "",
      imageFile: undefined
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showPreview = this.showPreview.bind(this);
  }

  async handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      alert('passwords do not match');
      return;
    }

    console.log("Form Fields: ", this.state)

    // try {
    //   dispatch(signUpStart(email, password, displayName));
    //   resetFormFields();
    // } catch (error) {
    //   if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
    //     alert('Cannot create user, email already in use');
    //   } else {
    //     console.log('user creation encountered an error', error);
    //   }
    // }
  };

  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    this.setState({ ...this.state, [name]: value });
  }

  showPreview(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
        let imageFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = x => {
          this.setState({
            ...this.state,
            imageFile,
            imageSource: x.target?.result
          });
        }
        reader.readAsDataURL(imageFile);
    } else {
      this.setState({
          ...this.state,
          imageFile: null,
          imageSource: null
      });
    }
  }

  render() {
    const { username, about, emailAddress, password, confirmPassword, dateOfBirth, firstName, lastName, imageLink, imageSource, imageFile} = this.state;
    return (
      <SignUpContainer>
        <h2>Don't have an account?</h2>
        <span>Sign up with your username and password</span>
        <Form autoComplete="off" onSubmit={this.handleSubmit} style={{ marginTop: '1rem' }}>
          <Row>
            <Form.Group  className="col-6 mb-3" controlId="formUsername">
                <Form.Control onChange={this.handleChange} name="username" value={username} as="input" type="input" placeholder="Username" />
            </Form.Group>
            <Form.Group className="col-6 mb-3" controlId="formemailAddress">
                <Form.Control onChange={this.handleChange} name="emailAddress" value={emailAddress} as="input" type="emailAddress" placeholder="Email Address" />
            </Form.Group>
            <Form.Group className="col-6 mb-3" controlId="formFirstName">
                <Form.Control onChange={this.handleChange} name="firstName" value={firstName} as="input" type="firstName" placeholder="First Name" />
            </Form.Group>
            <Form.Group className="col-6 mb-3" controlId="formLastName">
                <Form.Control onChange={this.handleChange} name="lastName" value={lastName} as="input" type="lastName" placeholder="Last Name" />
            </Form.Group>
            <Form.Group className="col-6 mb-3" controlId="formPassword">
                <Form.Control onChange={this.handleChange} name="password" value={password} as="input" type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="col-6 mb-3" controlId="formConfirmPassword">
                <Form.Control onChange={this.handleChange} name="confirmPassword" value={confirmPassword} as="input" type="password" placeholder="Confirm Password" />
            </Form.Group>
            <Form.Group className="col-6 mb-3" controlId="formDateOfBirth">
                <Form.Control onChange={this.handleChange} name="dateOfBirth" value={dateOfBirth} type="date" placeholder="Date Of Birth" />
            </Form.Group>
            <Form.Group className="col-6 mb-3" controlId="formAbout">
                <Form.Control onChange={this.handleChange} name="about" value={about} type="input" placeholder="About" />
            </Form.Group>
            <Form.Group className="col-12 mb-3" controlId="formMedia">
                <Form.Control onChange={this.showPreview} name="medialink" as="input" accept="image/*" type="file" placeholder="Media" />
            </Form.Group>
            <div className="col-12 mb-3" style={{ justifyContent: 'center' }}>
                <Button className="col-12 mb-3" variant="light" as="input" type="submit" value="Join" />
            </div>
          </Row>
        </Form>
      </SignUpContainer>
    );
  }
};

export default SignUpForm;