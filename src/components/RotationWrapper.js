import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'


export default function RotationWrapper(props) {
  const { width, height } = useThree((state) => state.viewport)
  // This reference will give us direct access to the THREE.Mesh object
  const group = useRef()
  // console.log('props: ' + {props})
  // const { width, height } = useThree((state) => state.viewport)

  // group.current.position.x = width

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    // let test = THREE.MathUtils.damp(group.current.position.x, -width, 1, delta)

    group.current.rotation.y = THREE.MathUtils.degToRad((props.scroll.current * 360))
    
    console.log(group.current.position.x)
    // group.current.position.x = -props.scroll.current *width

    // if (group.current.rotation.y > Math.PI / 2) {
      group.current.position.x = -props.scroll.current * width
    // } 
   
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0]}>{props.children}</group>
    </group>
  )
}
