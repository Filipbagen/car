import { useFrame, useThree} from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'

export default function RotationWrapperSteer(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const group = useRef()
  const { width, height } = useThree((state) => state.viewport)
  
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    let scrollProgress = props.scroll.current

    if (scrollProgress <= 0.4) {
      group.current.visible = false
      group.current.position.x = [width, 0, 0]

    } else if (scrollProgress > 0.4 && scrollProgress < 1) {
      group.current.visible = true
      // group.current.position.x = -scrollProgress * width
      group.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.05)
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0]}>{props.children}</group>
    </group>
  )
}
