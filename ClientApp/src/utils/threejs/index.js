import * as THREE from 'three';
// import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
// import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import  {BufferGeometryUtils}  from 'https://cdn.jsdelivr.net/npm/three@0.125.2/examples/jsm/utils/BufferGeometryUtils.js';
// const BufferGeometryUtils = require("three/examples/jsm/utils/BufferGeometryUtils.js");
// const mergeBufferGeometries = require("three/examples/jsm/utils/BufferGeometryUtils.js");

export function mergeMeshes (meshes) {
  // console.log("Buffer Geometry Utils: ", typeof BufferGeometryUtils)
  // console.log("Meshes: ", meshes)
  // var combined = new BufferGeometryUtils();
  // var combined = new THREE.BoxGeometry();
  var combined = [];
  for (var i = 0; i < meshes.length; i++) {
    meshes[i].updateMatrix();
    // combined.mergeGeometries(meshes[i].geometry, meshes[i].matrix);
    // combined.merge(meshes[i].geometry, meshes[i].matrix);
    combined.push(meshes[i].geometry);
  }
  return combined;
}


export function collisonXYZ(o1, o2) {
  if (Math.abs(o1.position.x - o2.position.x) > (o1.geometry.parameters.width + o2.geometry.parameters.width) / 2)
    return false;
  if (Math.abs(o1.position.y - o2.position.y) > (o1.geometry.parameters.height + o2.geometry.parameters.height) / 2)
    return false;
  if (Math.abs(o1.position.z - o2.position.z) > (o1.geometry.parameters.depth + o2.geometry.parameters.depth) / 2)
    return false;
  return true;
}


export function degToRad(angle) {
  return angle * (Math.PI / 180);
}


export function radToDeg(angle) {
  return 360 - (angle / Math.PI) * 180;
}
