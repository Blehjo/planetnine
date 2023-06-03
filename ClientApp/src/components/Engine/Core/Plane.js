import * as THREE from 'three';
import { PlaneBufferGeometry } from 'three';

export class Plane extends THREE.Mesh {
  constructor(size) {
    const geometry = new PlaneBufferGeometry( size, size );
    geometry.rotateX( - Math.PI / 2 );
    const planeMaterial = new THREE.ShadowMaterial();
    planeMaterial.opacity = 0.2;

    super(geometry, planeMaterial);
    this.receiveShadow = true;
  }
}
