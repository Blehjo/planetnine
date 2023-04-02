import { Fragment } from "react";
import * as THREE from "three";

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
    new THREE.MeshBasicMaterial({ 
      map: new THREE.TextureLoader().load('https://previews.123rf.com/images/antonshahrai/antonshahrai2007/antonshahrai200700006/151534030-world-texture-satellite-image-of-the-earth-high-resolution-texture-of-the-planet-with-relief.jpg')
    })
  );
  console.log(sphere)

  scene.add(sphere);

  camera.position.z = 15;

  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }

  animate()

  return (
    <Fragment>
      {/* {animate} */}
    </Fragment>
  )
}