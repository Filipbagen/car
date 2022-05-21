import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'


export default function RotationWrapper(props) {
  const { width, height } = useThree((state) => state.viewport)
  // This reference will give us direct access to the THREE.Mesh object
  const group = useRef()
  const title = group.current

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    let scrollProgress = props.scroll.current
    // console.log("anna")

    if (scrollProgress >= 0 && scrollProgress <= 0.2) {
      // title.visible = true
      title.position.y = 0
      title.rotation.y = - THREE.MathUtils.degToRad((props.scroll.current * 360)) * 0.4
      
    } else if (scrollProgress > 0.2 && scrollProgress <= 1) {
      // title.visible = true
      title.position.y = (scrollProgress - 0.2) * height * 0.8
      title.rotation.y = - 30 * Math.PI/180 + (scrollProgress - 0.2)
    }
   
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0]}>{props.children}</group>
    </group>
  )
}
