import { Component, Dispatch, Fragment } from "react";
import { Modal, NavLink } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import { RootState } from "../../store/store";

import { CheckUserSession, checkUserSession } from "../../store/user/user.action";
import { ConnectedProps, connect } from "react-redux";
import { DropdownContainer, ModalContainer } from "./SignInButton.styles";
import { signOutStart } from "../../store/user/user.action";
import { SignOutStart } from "../../store/user/user.action";

type SignInButtonProps = ConnectedProps<typeof connector>;

interface IProps extends SignInButtonProps {
    navigation?: any;
}

interface ICollapsed {
    collapsed: boolean;
    openModal: boolean;
}

export class SignInButton extends Component<IProps, ICollapsed> {

    constructor (props: IProps) {
        super(props);
    
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.navigateToProfile = this.navigateToProfile.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.state = {
          collapsed: true,
          openModal: false,
        };
    }

    toggleNavbar() {
        const width = window.innerWidth;
        if (width <= 575) {
            this.setState({
                openModal: !this.state.openModal
            });
        }
        this.setState({
          collapsed: !this.state.collapsed
        });
    }

    navigateToProfile() {
        this.props.navigation.navigate('profile')
    }

    handleSignOut() {
        this.props.signOut();
        this.toggleNavbar();
    }

    render() {
        const { currentUser } = this.props.user;
        const { collapsed, openModal } = this.state;
        
        return (
            <Fragment>
                {
                    currentUser ?
                    <NavLink><Person className="signoutcss" onClick={this.toggleNavbar} style={{ cursor: 'pointer' }} color="white" size={20} /></NavLink> : 
                    <NavLink className="signoutcss" href="/authentication" style={{ cursor: 'pointer' }}>Sign In</NavLink>
                }
                {
                    !collapsed && 
                    <DropdownContainer>
                    <div>
                        {`Signed in as ${currentUser?.username}`}
                    </div>
                    <hr/>
                    <div>
                        Your projects
                    </div>
                    <div>
                        Your posts
                    </div>
                    <div>
                        Your planets
                    </div>
                    <div
                    onClick={this.navigateToProfile}
                    >
                        Your profile
                    </div>
                    <hr/>
                    <div>
                        Settings
                    </div>
                    <div>
                        Help
                    </div>
                    <hr/>
                    <div onClick={this.handleSignOut}>
                        Sign Out
                    </div>
                    </DropdownContainer>
                }
                {
                    openModal && 
                    <ModalContainer>
                        <div>
                            {`Signed in as ${currentUser?.username}`}
                        </div>
                        <hr/>
                        <div>
                            Your projects
                        </div>
                        <div>
                            Your posts
                        </div>
                        <div>
                            Your planets
                        </div>
                        <div>
                            Your profile
                        </div>
                        <hr/>
                        <div>
                            Settings
                        </div>
                        <div>
                            Help
                        </div>
                        <hr/>
                        <div onClick={this.props.signOut}>
                            Sign Out
                        </div>
                    </ModalContainer>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { user: state.user };
};

const mapDispatchToProps = (dispatch: Dispatch<CheckUserSession | SignOutStart>) => ({
    checkUserSession: () => dispatch(checkUserSession()),
    signOut: () => dispatch(signOutStart())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SignInButton);
