import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const LON_OFFSET = -Math.PI / 2

export default function Earth({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('../../../earth.gtlf')

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group scale={.13}>
            <mesh geometry={nodes.Object_4.geometry} material={materials['Scene_-_Root']} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('../../../earth.gltf')