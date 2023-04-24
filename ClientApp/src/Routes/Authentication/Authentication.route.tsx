import { Component } from "react";
import { AuthenticationContainer } from "./Authentication.styles";
import { Button, Col, Row } from "react-bootstrap";
import { SignInContainer } from "../../components/Sign-In-Form/Sign-In-Form.styles";
import SignInFormComponent from "../../components/Sign-In-Form/Sign-In-Form.component";
import SignUpFormComponent from "../../components/Sign-Up-Form/Sign-Up-Form.component";

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
            name: this.state.name == "Make An Account" ? "Have An Account?" : "Make An Account"
        })
    }
    
    render() {
        const { signIn, name } = this.state;
        return (
            <AuthenticationContainer>
                <Row xs={1}>
                    <Col xs={12}>
                        {signIn ? <SignInFormComponent/>
                        : <SignUpFormComponent/>}
                        <div className="d-grid mt-3">
                            <SignInContainer>
                                <button className="btn btn-light btn-lg" type="button" onClick={this.toggleSignIn}>{name}</button>
                            </SignInContainer>
                        </div>
                    </Col>
                </Row>
            </AuthenticationContainer>
        );
    }
}

export default Authentication;