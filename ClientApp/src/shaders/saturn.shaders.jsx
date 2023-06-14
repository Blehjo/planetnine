import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Saturn(props) {
  const boxRef = useRef();

  const { nodes } = useGLTF('saturn.html');

  useFrame(() => {
    boxRef.current.rotation.y += 0.0001
  });

  return (
    <group rotation-x={Math.PI * 0.25} rotation-y={Math.PI * 0.25} scale={.0045} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RingsTop.geometry}
        material={nodes.RingsTop.material}
      />
      <mesh
        {...props}
        ref={boxRef}
        geometry={nodes.Saturn001.geometry}
        material={nodes.Saturn001.material}
        scale={.75}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RingsBottom.geometry}
        material={nodes.RingsBottom.material}
      />
    </group>
  );
}

useGLTF.preload('/saturn.html');