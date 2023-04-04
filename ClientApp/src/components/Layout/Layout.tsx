import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from '../NavMenu/NavMenu.component';
import Sidebar from '../Sidebar/Sidebar.component';

type Props = {
  children: React.ReactNode
}

export class Layout extends React.Component<Props> {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Sidebar />
        <Container tag="main">
          {this.props.children}
        </Container>
      </div>
    );
  }
}
