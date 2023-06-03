import * as THREE from 'three';
import { PlaneBufferGeometry, PlaneGeometry } from 'three';

export class Plane extends THREE.Mesh {
  constructor(size) {
    const geometry = new PlaneGeometry( size, size );
    geometry.rotateX( - Math.PI / 2 );
    const planeMaterial = new THREE.ShadowMaterial();
    planeMaterial.opacity = 0.2;

    super(geometry, planeMaterial);
    this.receiveShadow = true;
  }
}
