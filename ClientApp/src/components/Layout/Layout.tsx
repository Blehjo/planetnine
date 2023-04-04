import { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from '../NavMenu/NavMenu';
import Sidebar from '../Sidebar/Sidebar.component';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Sidebar />
        {/* <Container tag="main">
          {this.props.children}
        </Container> */}
      </div>
    );
  }
}
