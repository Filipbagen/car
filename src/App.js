import * as THREE from 'three'
import { Suspense, useLayoutEffect, useState, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, MeshReflectorMaterial, Environment, Stage, OrbitControls, Text, GradientTexture } from '@react-three/drei'
import Car from './components/Car'
import Steer from './components/Steer'
import SteeringWheel from './components/SteeringWheel'
import RotationWrapper from './components/RotationWrapper'
import RotationWrapperSteer from './components/RotationWrapperSteer'
import Overlay from './components/Overlay'
import { BoxGeometry, MeshLambertMaterial } from 'three'
import Barlow from './font/Barlow.ttf'

const MyMesh = () => {
  const refMesh = useRef()

  useFrame(({ clock }) => {
    const a = Math.sin(clock.getElapsedTime())
    // refMesh.current.rotation.y = a
    // refMesh.current.rotation.x = a
    // refMesh.current.rotation.z = a
  })
  return (
    <group onClick={(e) => console.log('click')}>
      <BoxGeometry />
      <MeshLambertMaterial />
    </group>
  )
}

export default function App() {
  const scroll = useRef(0)
  const overlay = useRef()
  const caption = useRef()

  return (
    <>
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45, position: [0,4,10] }} onCreated={(state) => state.events.connect(overlay.current)}>
      <ambientLight intensity={0.7} />
        <color attach='background' args={['#101010']} />
        <fog attach='fog' args={['#101010', 10, 20]} />
        <Suspense fallback={null}>
          <Environment path='/cube' />

          <Text
            position={[0, 2.5, 0]}
            scale={[15, 15, 1]}
            anchorX="center"
            anchorY="top-baseline"
            font={Barlow}
          >
            McLaren
          </Text>

          {/* <PresentationControls speed={1.5} global zoom={1} polar={[-0.1, Math.PI / 4]} snap={true} > */}

          {/* <Stage environment={null} intensity={1} contactShadow={false} shadowBias={-0.0015}> */}
            <RotationWrapper scroll={scroll}>
              <Car rotation={[0, -0.6, 0]} position={[0,-0.3,0]} />
            </RotationWrapper>
          {/* </Stage> */}

          {/* <SteeringWheel /> */}

          {/* <RotationWrapperSteer scroll={scroll}>
            <Steer rotation={[0, 0.5, 0]} scale={0.6} position={[5, 0.8, 0]} />
          </RotationWrapperSteer> */}

          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[170, 170]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color='#101010'
              metalness={0.5}
            />
          </mesh>
        </Suspense>
      </Canvas>
      <Overlay ref={overlay} caption={caption} scroll={scroll} />
    </>
  )
}
