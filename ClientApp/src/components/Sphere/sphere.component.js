import { Fragment } from "react";
import gsap from 'gsap';
import * as THREE from "three";
import vertexShader from '../../shaders/vertex.glsl';
import fragmentShader from '../../shaders/fragment.glsl';
import atmosphereVertexShader from '../../shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from '../../shaders/atmosphereFragment.glsl';

export const Sphere = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio(window.devicePixelRatio)
  document.body.appendChild( renderer.domElement );
  

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50), 
    new THREE.ShaderMaterial({ 
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        globeTexture: {
          value: new THREE.TextureLoader().load('https://t4.ftcdn.net/jpg/02/24/14/81/360_F_224148194_xrGaLP6RZbCL7B3vOMYYr2dVrcg95RFt.jpg')
        }
      }
    })
  );

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50), 
    new THREE.ShaderMaterial({ 
      // vertexShader: atmosphereVertexShader,
      // fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    })
  );
  atmosphere.scale.set(1.1, 1.1, 1.1);

  scene.add(atmosphere);
  
  const group = new THREE.Group()
  group.add(sphere);
  scene.add(group);

  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
  });

  const starVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -Math.random() * 3000;
    starVertices.push(x,y,z);
  }
  // console.log("Star Vertices: ", starVertices)
  starGeometry.setAttribute('position',
  new THREE.Float32BufferAttribute(
    starVertices, 3)
  )

  const stars = new THREE.Points(starGeometry, starMaterial)
  scene.add(stars);
  // console.log("stars", stars)

  camera.position.z = 15;

  const mouse = {
    x: undefined,
    y: undefined
  }

  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    sphere.rotation.y += .003;
    gsap.to(group.rotation, {
      x: -mouse.y * 0.3,
      y: mouse.x * 0.5,
      duration: 2
    })
  }

  animate()

  return (
    <Fragment>
      {/* {animate} */}
    </Fragment>
  )
}