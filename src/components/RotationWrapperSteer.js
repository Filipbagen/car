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
    const steeringWheel = group.current

    if (scrollProgress <= 0.2 && scrollProgress >= 0) {
      // steeringWheel.visible = false

    } else if (scrollProgress >= 0.2 && scrollProgress <= 1) {
      // steeringWheel.visible = true
      steeringWheel.position.x = - width + (scrollProgress - 0.2) * width * 2
      steeringWheel.rotation.y = -Math.PI + THREE.MathUtils.degToRad((scrollProgress * 360)) * 0.5
    }

    // (steeringWheel.position.x >= width || steeringWheel.position.x <= -width || steeringWheel.position.y >= height || steeringWheel.position.y <= -height) ? steeringWheel.visible = false : steeringWheel.visible = true

    
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0]}>{props.children}</group>
    </group>
  )
}
