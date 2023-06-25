import React, { Component, Dispatch } from 'react';
import { Container } from 'reactstrap';
import { ConnectedProps, connect } from 'react-redux';
import ReactLoading from "react-loading";

import { NavMenu } from '../NavMenu/NavMenu.component';
import Sidebar from '../Sidebar/Sidebar.component';
import { RootState } from '../../store/store';
import { CheckUserSession, SignOutStart, checkUserSession, signOutStart } from '../../store/user/user.action';

type LayoutProps = ConnectedProps<typeof connector>;

interface Props extends LayoutProps {
  children: React.ReactNode
}

export class Layout extends React.Component<Props> {
  static displayName = Layout.name;

  componentDidMount(): void {
    this.props.checkUserSession();
  }

  render() {
    const { currentUser } = this.props.user;
    return (
      <>
      {
        !currentUser ?
        <div style={{ marginLeft: '-16rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <ReactLoading type="bars" color="lightgrey" height={375} width={375}/>
        </div> :
        <div>
          <NavMenu { ...this.props } />
          <Sidebar />
          <Container tag="main">
            {this.props.children}
          </Container>
        </div>
      }
      </>
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

export default connector(Layout);
