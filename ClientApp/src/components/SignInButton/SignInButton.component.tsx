import { Component, Dispatch, Fragment } from "react";
import { NavLink } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import { RootState } from "../../store/store";

import { CheckUserSession, checkUserSession } from "../../store/user/user.action";
import { ConnectedProps, connect } from "react-redux";

type SignInButtonProps = ConnectedProps<typeof connector>;

export class SignInButton extends Component<SignInButtonProps> {

    componentDidMount(): void {
        this.props.checkUserSession() 
    }

    render() {
        const { currentUser } = this.props.user;
        return (
            <Fragment>
            {
                currentUser ?
                <NavLink><Person style={{ cursor: 'pointer' }} color="white" size={20} /></NavLink> : 
                <NavLink href="/authentication" style={{ cursor: 'pointer' }}>Sign In</NavLink>
            }
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { user: state.user };
};

const mapDispatchToProps = (dispatch: Dispatch<CheckUserSession>) => ({
    checkUserSession: () => dispatch(checkUserSession())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SignInButton);
