import { Component } from 'react';
import PubSub from 'pubsub-js';
import Stats from 'three/examples/jsm/libs/stats.module'

class Monitor extends Component {
  componentWillMount() {
    const stats = new Stats();
    stats.domElement.style.position = 'absolute';
  	stats.domElement.style.bottom = '-35px';
  	stats.domElement.style.zIndex = 100;
    this.stats = stats;
    this.updateSubscriber = PubSub.subscribe('monitor', () => this._update(this));
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.updateSubscriber);
  }

  _update(monitor) {
    monitor.stats.update();
  }

  render() {
    const { domElement } = this.stats;
    // console.log("Dom Element: ", domElement);
    return (
      <div ref={(nodeElement) => nodeElement ? nodeElement.appendChild(domElement) : null}/>
    );
  }
}


export default Monitor;
