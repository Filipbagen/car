import * as THREE from 'three'
import { Suspense, useLayoutEffect, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, MeshReflectorMaterial, Environment, Stage } from '@react-three/drei'
import Car from './components/Car'
import RotationWrapper from './components/RotationWrapper'
import Overlay from './components/Overlay'

const MyMesh = () => {
  const refMesh = useRef()

  useFrame(({ clock }) => {
    const a = Math.sin(clock.getElapsedTime())
    // refMesh.current.rotation.y = a
    // refMesh.current.rotation.x = a
    // refMesh.current.rotation.z = a
  })
  return (
    // <group
    //   onWheel={(e) => {
    //     let a = document.body.scrollTop
    //     let b = document.body.scrollHeight - document.body.clientHeight
    //     let c = a / b
    //     console.log(c)
    //     refMesh.current.rotation.y = c
    //   }}
    // >
    <mesh ref={refMesh}>
      <boxGeometry></boxGeometry>
      <meshLambertMaterial color={'red'}></meshLambertMaterial>
    </mesh>
    // {/* </group> */}
  )
}

export default function App() {
  const scroll = useRef(0)
  const overlay = useRef()
  const caption = useRef()
  return (
    <>
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} onCreated={(state) => state.events.connect(overlay.current)}>
        {/* <OrbitControls /> */}
        <color attach='background' args={['#101010']} />
        <fog attach='fog' args={['#101010', 10, 20]} />
        <Suspense fallback={null}>
          <Environment path='/cube' />

          {/* <PresentationControls speed={1.5} global zoom={1} polar={[-0.1, Math.PI / 4]} snap={true} > */}

          <Stage environment={null} intensity={1} contactShadow={false} shadowBias={-0.0015}>
            <RotationWrapper scroll={scroll}>
              <Car rotation={[0, 0, 0]} />
              {/* <MyMesh /> */}
            </RotationWrapper>
          </Stage>

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

          {/* </PresentationControls> */}
        </Suspense>
      </Canvas>
      <Overlay ref={overlay} caption={caption} scroll={scroll} />
    </>
  )
}
