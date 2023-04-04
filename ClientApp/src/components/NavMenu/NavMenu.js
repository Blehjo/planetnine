import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Col, Row } from 'reactstrap';

// import SignInButton from './SignInButton';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
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
            <Navbar fixed='top' bg='light' expand="sm">
              <Nav >
                <Navbar.Brand href="/"
                >
                    <img onClick={() => {
                        this.props.navigation.navigate('/')
                    }} height="25rem" width="15rem" style={{ cursor: 'pointer', objectFit: 'cover', margin: '0rem .3rem 0rem 1rem' }} src='https://i.imgur.com/20LpIoh.jpg'/>
                    Planet 9
                </Navbar.Brand>
              </Nav>
              <Navbar.Toggle style={{ marginRight: '1rem' }} key="navbarToggle" aria-controls={`navBarItems}`} />
              <Navbar.Collapse key="navbarCollapse" id="navBarItems">
                <Col key="searchColumn" className=''>
                  <Nav key="navForm">

                  </Nav>
                </Col>
                <Row style={{ justifyContent: "space-between", textAlign: "center", marginRight: '.5rem' }}>
                    <Col key="navigationIcons">
                        <Nav.Link href="/vitals" className="text-dark">Vitals</Nav.Link>
                    </Col>
                    <Col>
                        <Nav.Link href="/crew" className="text-dark">Crew</Nav.Link>
                    </Col>
                    <Col>
                        <Nav.Link href="/planets" className="text-dark">Planets</Nav.Link>
                    </Col>
                    <Col >
                        {/* <SignInButton/> */}
                    </Col>
                </Row>
              </Navbar.Collapse>
            </Navbar>
          </Row>
    );
  }
}
