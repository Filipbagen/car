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
    const car = group.current
    // group.current.rotation.y = THREE.MathUtils.degToRad((props.scroll.current * 360))

    if (scrollProgress >= 0 && scrollProgress <= 0.2) {
      car.position.y = 0
      car.rotation.y = THREE.MathUtils.degToRad((scrollProgress * 720)) * 0.5
      
    } else if (scrollProgress >= 0.2 && scrollProgress <= 1) {
      // car.visible = true
      car.position.y = (scrollProgress - 0.2) * (height + 0.2 * height)
      car.rotation.y = 72 * Math.PI / 180 + (scrollProgress - 0.2) * 0.7

    }


    // (car.position.x >= width || car.position.x <= -width || car.position.y >= (height / 2) || car.position.y <= -height) ? console.log('gone') : car.visible = true
   
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0]}>{props.children}</group>
    </group>
  )
}
