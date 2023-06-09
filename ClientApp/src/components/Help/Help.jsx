import React from 'react';
import  { createPortal } from 'react-dom';


import styles from '../../styles/components/help.less';
import { Modal } from 'react-bootstrap';
import { Info, InfoCircle } from 'react-bootstrap-icons';

class Help extends React.Component {
  state = {
    open: false,
  }

  constructor(props) {
    super(props);
    this._toggleHelp = this._toggleHelp.bind(this);
    this._handleClickEscape = this._handleClickEscape.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleClickEscape, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleClickEscape, false);
  }

  render() {
    const { open } = this.state;
    const { inversed } = this.props;
    return (
      <div style={{ zIndex: '100', position: 'absolute', bottom: '.8rem', right: '0' }}  className={styles.help}>
        <div className={inversed ? styles.inversed : styles.text} onClick={this._toggleHelp}>
          <InfoCircle size={15} style={{ cursor: 'pointer', alignItems: 'start' }} />
          <span style={{ cursor: 'pointer', alignItems: 'end', padding: '1rem 1rem 1rem .2rem' }}>Help</span>
        </div>
        <Modal style={{ color: 'black' }} show={open} onHide={this._toggleHelp} className={"open ? styles.modalWrapper : styles.closedModal"}>
          <Modal.Header style={{ textAlign: 'center' }} closeButton>
              Brick Builder
          </Modal.Header>
          <Modal.Body>
            <h3>What is this?</h3>
            <p>Brick Builder is a simple web app to create brick objects (heavily inspired by Lego in fact). You can also import and export models from the menu!</p>
            <h2 style={{ textAlign: 'center' }}>
              Available commands
            </h2>
            <div className={styles.section}>
              <div className={styles.icon}>
                <i className="ion-hammer" />
              </div>
              <div style={{ flex: 1 }}>In BUILD mode you can place bricks with a <strong>LEFT</strong> click. Choose between different sizes in the menu bar. <br/> If you press <strong>D</strong> at the same time you delete bricks. <br/>If you press <strong>R</strong> you can rotate bricks.</div>
            </div>
            <div className={styles.section}>
              <div className={styles.icon}>
                <i className="ion-paintbrush" />
              </div>
              <div style={{ flex: 1 }}>In PAINT mode you set the chosen color (on the menu bar) to existing bricks.</div>
            </div>
            <div className={styles.github}>
              <i className="ion-social-github" />
              <a href={process.env.REPOSITORY_URL} target="_blank">View on Github</a>
            </div>
            </Modal.Body>
        </Modal>
      </div>
    );
  }

  _toggleHelp() {
    this.setState({
      open: ! this.state.open,
    });
  }

  _handleClickEscape(e) {
    if (e.keyCode === 27) {
      this.setState({
        open: false,
      });
    }
  }
};


export default Help;
