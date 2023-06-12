import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame, useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export function Saturn(props) {
  const planet = useRef();

  const { nodes, materials } = useGLTF('saturn.glb');

  useFrame(() => (planet.current.rotation.y += 0.0002));

  useEffect(() => {
    console.log(nodes.Saturn001);
    console.log(materials)
  });
  return (
    <group rotation-x={Math.PI * 0.25} rotation-y={Math.PI * 0.25} scale={2} dispose={null}>
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.RingsTop.geometry}
        material={nodes.RingsTop.material}
      /> */}
      <mesh
        castShadow
        receiveShadow
        ref={planet}
        visible
        position={[0, 0, 0]}
        // Adding data from Saturn001.glb to the geometry and material of the sphere
        geometry={nodes.Saturn001.geometry}
        material={nodes.Saturn001.material}
      />
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.RingsBottom.geometry}
        material={nodes.RingsBottom.material}
      /> */}
    </group>
  );
};