import { Component } from 'react';
import PubSub from 'pubsub-js';
import If from 'if-only';
import * as THREE from 'three';

import Detector from '../../utils/threejs/Detector';
import Monitor from './Monitor';
import Brick from './Brick';
import Message from '../BrickMessage/Message';
import { RollOverBrick } from './Helpers';
import {
  PerspectiveCamera,
  Controls,
  // AmbientLight,
  Light,
  Plane,
  Renderer,
} from './Core';
import { CSSToHex, getMeasurementsFromDimensions } from '../../utils/index';
import { colors, base } from '../../utils/threejs/constants';
import { SceneContainer } from './Scene.styles';
import { ShiftedContainer } from './Scene.styles';


class Scene extends Component {
  state = {
    drag: false,
    isShiftDown: false,
    isDDown: false,
    isRDown: false,
    rotation: 0,
    coreObjects: [],
  }

  constructor(props) {
    super(props);

    this._start = this._start.bind(this);
    this._stop = this._stop.bind(this);
    this._animate = this._animate.bind(this);
  }

  componentDidMount() {
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    this._initCore();
    this._initUtils();
    this._initEnv();

    this._setEventListeners();
    this._start();
  }

  componentDidUpdate(prevProps) {
    const { mode, grid, dimensions, objects } = this.props;
    if (mode !== prevProps.mode && mode === 'paint') {
      this.rollOverBrick.visible = false;
    }
    else if (mode !== prevProps.mode && mode === 'build') {
      this.rollOverBrick.visible = true;
    }

    if (grid !== prevProps.grid && grid === true) {
      this.grid.visible = true;
    }
    else if (grid !== prevProps.grid && grid !== true) {
      this.grid.visible = false;
    }
    else if (prevProps.dimensions.x !== dimensions.x || prevProps.dimensions.z !== dimensions.z) {
      this.rollOverBrick.setShape(dimensions);
    }

    if (objects.length !== prevProps.objects.length) {
      this._setObjectsFromState();
    }
  }

  _initCore() {
    const scene = new THREE.Scene();
    this.scene = scene;

    const renderer = new Renderer({ antialias: true });
    const width = window.document.querySelector('.container').offsetWidth;
    renderer.init(width - 25 , window.innerHeight);
    this.renderer = renderer;

    const camera = new PerspectiveCamera(45, (width - 25) / window.innerHeight, 1, 10000);
    camera.init();
    this.camera = camera;

    const controls = new Controls(this.camera, this.renderer.domElement);
    controls.init();
    this.controls = controls;

    this.mount.appendChild(this.renderer.domElement);
  }

  _initEnv() {
    const light = new Light(0xffffff, 2);
    light.init();
    this.scene.add(light);

    // var spotLightHelper = new THREE.SpotLightHelper( light );
    // this.scene.add( spotLightHelper );

    const ambientLight = new THREE.AmbientLight(0x606060);
    this.scene.add(ambientLight);

    // testing
    const pointLight = new THREE.PointLight( 0xfff0f0, 0.6, 100, 0 );
    pointLight.position.set( -1000, 1500, 500 );
    this.scene.add( pointLight );

    const plane = new Plane(3000);
    this.plane = plane;
    this.scene.add(plane);

    const grid = new THREE.GridHelper( 1500, 60, new THREE.Color( 0xbfbfbf ), new THREE.Color( 0xdedede ) );
    this.grid = grid;
    this.scene.add(grid);

    this.setState({ coreObjects: [ light, ambientLight, pointLight, plane, grid, this.rollOverBrick ] });
  }

  _initUtils() {
    const { brickColor, dimensions } = this.props;
    const rollOverBrick = new RollOverBrick(brickColor, dimensions);
    this.scene.add(rollOverBrick);
    this.rollOverBrick = rollOverBrick;
    const raycaster = new THREE.Raycaster();
    this.raycaster = raycaster;
    const mouse = new THREE.Vector2();
    this.mouse = mouse;
  }

  _setObjectsFromState() {
    const { objects } = this.props;
    const { coreObjects } = this.state;
    this.scene.children = [ ...objects, ...coreObjects ];
  }

  _setEventListeners() {
    document.addEventListener( 'mousemove', (event) => this._onMouseMove(event, this), false );
    document.addEventListener( 'mousedown', (event) => this._onMouseDown(event), false );
    document.addEventListener( 'mouseup', (event) => this._onMouseUp(event, this), false );
    document.addEventListener( 'keydown', (event) => this._onKeyDown(event, this), false );
    document.addEventListener( 'keyup', (event) => this._onKeyUp(event, this), false );
    window.addEventListener('resize', (event) => this._onWindowResize(event, this), false);
  }

  _onWindowResize(event, scene) {
    const width = window.document.querySelector('.container').offsetWidth;
    scene.camera.aspect = (width - 25) / window.innerHeight;
    scene.camera.updateProjectionMatrix();
    scene.renderer.setSize(width - 25, window.innerHeight);
    scene.renderer.domElement.style.paddingRight = window.document.defaultView.innerWidth;
  }

  _onMouseMove(event, scene) {
    const { isDDown, isRDown } = this.state;
    const { mode, dimensions, objects } = this.props;
    event.preventDefault();
    const drag = true;
    this.setState({ drag });
    const { width, height } = getMeasurementsFromDimensions(dimensions);
    const windowWidth = window.document.querySelector('.container').offsetWidth;
    const evenWidth = dimensions.x % 2 === 0;
    const evenDepth = dimensions.z % 2 === 0;
    scene.mouse.set( ( (event.clientX / (windowWidth - 25)) ) * 2 - 1.2, - ( event.clientY / window.innerHeight ) * 2 + 1.2 );
    scene.raycaster.setFromCamera( scene.mouse, scene.camera );
    const intersects = scene.raycaster.intersectObjects( [ ...objects, this.plane ], true );
    if ( intersects.length > 0) {
      const intersect = intersects[ 0 ];
      if (! isDDown) {
        scene.rollOverBrick.position.copy( intersect.point ).add( intersect.face.normal );
        scene.rollOverBrick.position.divide( new THREE.Vector3( base, height, base) ).floor()
          .multiply( new THREE.Vector3( base, height, base ) )
          .add( new THREE.Vector3( evenWidth ? base : base / 2, height / 2, evenDepth ? base : base / 2 ) );
      }
      if (intersect.object instanceof Brick && (isDDown || isRDown || mode === 'paint')) {
        this.setState({ brickHover: true });
      }
      else {
        this.setState({ brickHover: false });
      }
    }
  }

  _onMouseDown( event ) {
    this.setState({
      drag: false,
    });
  }

  _onMouseUp(event, scene) {
    const { mode, objects } = this.props;
    const { drag, isDDown, isRDown } = this.state;
    const width = window.document.querySelector('.container').offsetWidth;
    if (event.target.localName !== 'canvas') return;
    event.preventDefault();
    if (! drag) {
      scene.mouse.set( ( event.clientX / (width) ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
      scene.raycaster.setFromCamera( scene.mouse, scene.camera );
      const intersects = scene.raycaster.intersectObjects( [ ...objects, this.plane ] );
      if ( intersects.length > 0 ) {
        const intersect = intersects[ 0 ];
        if (mode === 'build') {
          // delete cube
          if ( isDDown ) {
            this._deleteCube(intersect);
          }
          // create cube
          else {
            this._createCube(intersect, scene.rollOverBrick);
          }
        }
        else if (mode === 'paint') {
          this._paintCube(intersect);
        }
      }
    }
  }

  _createCube(intersect, rollOverBrick) {
    const { rotation } = this.state;
    const { brickColor, dimensions, objects, addObject } = this.props;
    let canCreate = true;
    const { width, depth } = getMeasurementsFromDimensions(dimensions);
    const bricks = objects;
    const meshBoundingBox = new THREE.Box3().setFromObject(this.rollOverBrick);
    for (var i = 0; i < bricks.length; i++) {
      const brickBoundingBox = new THREE.Box3().setFromObject(bricks[i]);
      const collision = meshBoundingBox.intersectsBox(brickBoundingBox);
      if (collision) {
        const dx = Math.abs(brickBoundingBox.max.x - meshBoundingBox.max.x);
        const dz = Math.abs(brickBoundingBox.max.z - meshBoundingBox.max.z);
        const yIntsersect = brickBoundingBox.max.y - 9 > meshBoundingBox.min.y;
        if (yIntsersect && dx !== width && dz !== depth) {
          canCreate = false;
          break;
        }
      }
    }
    if (canCreate) {
      const { translation, rotation } = rollOverBrick;
      const brick = new Brick(intersect, brickColor, dimensions, rotation.y, translation);
      addObject(brick);
    }
  }

  _deleteCube(intersect) {
    const { removeObject } = this.props;
    if (intersect.object !== this.plane) {
      intersect.object.geometry.dispose();
      removeObject(intersect.object.customId);
    }
  }

  _paintCube(intersect) {
    const { brickColor, updateObject } = this.props;
    if (intersect.object !== this.plane) {
      intersect.object.updateColor(brickColor);
      updateObject(intersect.object);
    }
  }

  _onKeyDown(event, scene) {
    switch(event.keyCode) {
      case 16:
        scene.setState({
          isShiftDown: true,
        });
        break;
      case 68:
        scene.setState({
          isDDown: true,
        });
        scene.rollOverBrick.visible = false;
        break;
      case 82:
        scene.rollOverBrick.rotate( Math.PI / 2 );
        scene.setState({
          isRDown: true,
          rotation: scene.rollOverBrick.rotation.y,
        });
        break;
    }
  }

  _onKeyUp(event, scene ) {
    const { mode } = this.props;
    switch (event.keyCode) {
      case 16:
        scene.setState({
          isShiftDown: false,
        });
        break;
      case 68:
        scene.setState({
          isDDown: false,
        });
        scene.rollOverBrick.visible = true && mode === 'build';
        break;
      case 82:
        scene.setState({
          isRDown: false,
        });
        break;
    }
  }

  _start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this._animate);
    }
  }

  _stop() {
    cancelAnimationFrame(this.frameId);
  }

  _animate() {
    this.controls.update();
    PubSub.publish('monitor');

    this._renderScene();
    this.frameId = window.requestAnimationFrame(this._animate);
  }

  _renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    const { brickHover, isShiftDown, isDDown, isRDown } = this.state;
    const { mode, shifted } = this.props;

    return(
      <div style={{ position: 'relative' }}>
          {
            shifted ?
            <ShiftedContainer>
              <div style={{ cursor: isShiftDown ? 'move' : (brickHover ? 'pointer' : 'default') }} ref={(mount) => { this.mount = mount }} />
            </ShiftedContainer> : 
            <SceneContainer>
              <div style={{ cursor: isShiftDown ? 'move' : (brickHover ? 'pointer' : 'default') }} ref={(mount) => { this.mount = mount }} />
              <div style={{ left: "0", bottom: "3rem", position: "absolute" }}>
                <Monitor />
              </div>
            </SceneContainer>
          }
        <If cond={isDDown && mode === 'build'}>
          <Message>
            <i className="ion-trash-a" />
            <span>Deleting bricks</span>
          </Message>
        </If>
        <If cond={isRDown && mode === 'build'}>
          <Message>
            <i className="ion-refresh" />
            <span>Rotating bricks</span>
          </Message>
        </If>
      </div>
    );
  }
}


export default Scene;
