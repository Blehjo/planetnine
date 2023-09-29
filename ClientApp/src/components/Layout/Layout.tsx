import { Component, Dispatch, ReactNode } from 'react';
import ReactLoading from "react-loading";
import { ConnectedProps, connect } from 'react-redux';
import { Container } from 'reactstrap';

import { RootState } from '../../store/store';
import { CheckUserSession, SignOutStart, checkUserSession, signOutStart } from '../../store/user/user.action';
import { NavMenu } from '../NavMenu/NavMenu.component';
import Sidebar from '../Sidebar/Sidebar.component';

type LayoutProps = ConnectedProps<typeof connector>;

interface Props extends LayoutProps {
  children: ReactNode
}

export class Layout extends Component<Props> {
  static displayName = Layout.name;

  componentDidMount(): void {
    this.props.checkUserSession();
  }

  render() {
    const { currentUser, isLoading } = this.props.user;
    return (
      <>
      {
        isLoading ?
        <>
        <NavMenu { ...this.props } />
        <Sidebar />
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <ReactLoading type="bars" color="lightgrey" height={375} width={375}/>
        </div> 
        </>:
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
