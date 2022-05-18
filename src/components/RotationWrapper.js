import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'


export default function RotationWrapper(props) {
  const { width, height } = useThree((state) => state.viewport)
  // This reference will give us direct access to the THREE.Mesh object
  const group = useRef()

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    let scrollProgress = props.scroll.current
    
    // group.current.rotation.y = THREE.MathUtils.degToRad((props.scroll.current * 360))



    if (scrollProgress >= 0 && scrollProgress <= 0.2) {
      group.current.position.y = 0
      group.current.rotation.y = THREE.MathUtils.degToRad((props.scroll.current * 360))
      
    } else if (scrollProgress > 0.2 && scrollProgress < 1) {
      group.current.position.y = (scrollProgress - 0.2) * height
    }







    // if (scrollProgress >= 0 && scrollProgress <= 0.2) {
    //   group.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.05)
    //   group.current.rotation.y = THREE.MathUtils.degToRad((props.scroll.current * 360))

    // } else if (scrollProgress > 0.2 && scrollProgress < 1) {
    //   // group.current.rotation.y = THREE.MathUtils.degToRad((props.scroll.current * 360))
    //   group.current.position.lerp(new THREE.Vector3(-props.scroll.current * width, 0, 0), 0.05)
    // }
   
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0]}>{props.children}</group>
    </group>
  )
}
