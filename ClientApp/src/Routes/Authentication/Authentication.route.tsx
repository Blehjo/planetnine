import { Component } from "react";
import SignInForm from "../../components/Sign-In-Form/Sign-In-Form.component";
import SignUpForm from "../../components/Sign-Up-Form/Sign-Up-Form.component"
import { AuthenticationContainer } from "./Authentication.styles";
import { Button, Col, Row } from "react-bootstrap";
import { SignInContainer } from "../../components/Sign-In-Form/Sign-In-Form.styles";

interface IToggle {
    signIn: boolean;
    name: string;
}

class Authentication extends Component<{}, IToggle> {
    constructor(props: {}) {
        super(props);
        this.toggleSignIn = this.toggleSignIn.bind(this);
    }

    state = {
        signIn: true,
        name: "Make An Account"
    }

    toggleSignIn() {
        this.setState({
            signIn: !this.state.signIn,
            name: this.state.name == "Make An Account" ? "Sign In" : "Make An Account"
        })
    }
    
    render() {
        const { signIn, name } = this.state;
        return (
            <AuthenticationContainer>
                <Row xs={1}>
                    <Col xs={12}>
                        {signIn ? <SignInForm/>
                        : <SignUpForm/>}
                        <div className="d-grid mt-3">
                            <SignInContainer>
                                <Button variant="light" as="input" type="button" value={name} size="lg" onClick={this.toggleSignIn}/>
                            </SignInContainer>
                        </div>
                    </Col>
                </Row>
            </AuthenticationContainer>
        );
    }
}

export default Authentication;