import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Col, Row } from 'reactstrap';

import './NavMenu.styles.css';
import SignInButtonComponent from '../SignInButton/SignInButton.component';

interface IProps {
  navigation?: any;
}

interface ICollapsed {
  collapsed: boolean;
}


export class NavMenu extends Component<IProps, ICollapsed> {
  static displayName = NavMenu.name;

  constructor (props: {}) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <Row key="navbar">
            <Navbar fixed='top' bg='dark' expand="sm">
              <Nav >
                <Navbar.Brand href="/"
                style={{ color: 'white', marginLeft: '.2rem' }}
                >
                    <img onClick={() => {
                        this.props.navigation.navigate('/')
                    }} height="25rem" width="25rem" style={{ cursor: 'pointer', objectFit: 'cover', margin: '0rem 1.3rem 0.3rem 1.1rem' }} src='https://i.imgur.com/K0z1k9P.jpg'/>
                    Planet 9
                </Navbar.Brand>
              </Nav>
              <Navbar.Toggle style={{ marginRight: '1rem' }} key="navbarToggle" aria-controls={`navBarItems}`} />
              <Navbar.Collapse key="navbarCollapse" id="navBarItems">
                <Col key="searchColumn" className=''>
                  <Nav key="navForm">

                  </Nav>
                </Col>
                <Row xs={4} style={{ justifyContent: "space-between", textAlign: "center", marginRight: '.5rem' }}>
                    <Col xs={2} key="navigationIcons">
                        <Nav.Link href="/vitals">Vitals</Nav.Link>
                    </Col>
                    <Col xs={2}>
                        <Nav.Link href="/crew" >Crew</Nav.Link>
                    </Col>
                    <Col xs={2}>
                        <Nav.Link href="/planets" >Planets</Nav.Link>
                    </Col>
                    <Col xs={4}>
                        <SignInButtonComponent/>
                    </Col>
                </Row>
              </Navbar.Collapse>
            </Navbar>
          </Row>
    );
  }
}
