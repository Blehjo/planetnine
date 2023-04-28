import { useRef } from 'react'
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function Jupiter(props) {
  const boxRef = useRef();

  useFrame(() => {
    boxRef.current.rotation.y += 0.001;
  });

  const { nodes, materials } = useGLTF('/jupiter.gltf')
  return (
    <group rotation-x={Math.PI * 0.25} rotation-y={Math.PI * 0.25} scale={2} dispose={null}>
      <mesh 
        {...props}
        ref={boxRef} 
        geometry={nodes.Object_4.geometry} 
        material={materials['Scene_-_Root']} 
        scale={.75} 
      />
    </group>
  )
}

useGLTF.preload('/jupiter.gltf');