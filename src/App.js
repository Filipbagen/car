import * as THREE from 'three'
import { Suspense, useLayoutEffect, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF,
  MeshReflectorMaterial,
  Environment,
  Stage,
  PresentationControls,
  OrbitControls,
  Cloud,
} from '@react-three/drei'
import Car from './Car'

const MyMesh = () => {
  const refMesh = useRef()

  useFrame(({ clock }) => {
    const a = Math.sin(clock.getElapsedTime())
    refMesh.current.rotation.y = a
    refMesh.current.rotation.x = a
    refMesh.current.rotation.z = a
    refMesh.current.translateZ = a
  })
  return (
    <mesh ref={refMesh}>
      <boxGeometry></boxGeometry>
      <meshLambertMaterial color={'red'}></meshLambertMaterial>
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 5, 15], fov: 45 }}>
      {/* <OrbitControls /> */}
      <color attach='background' args={['#101010']} />
      <fog attach='fog' args={['#101010', 10, 20]} />
      <Suspense fallback={null}>
        <Environment path='/cube' />
        <MyMesh />
        {/* <PresentationControls speed={1.5} global zoom={1} polar={[-0.1, Math.PI / 4]}> */}
        {/* <Cloud opacity={0.2} speed={0.4} width={10} depth={-1} segments={20} /> */}
        {/* <Stage environment={null} intensity={1} contactShadow={false} shadowBias={-0.0015}> */}
        <ambientLight intensity={1} />

        <Car />
        {/* </Stage> */}
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
        {/* </PresentationControl> */}
      </Suspense>
    </Canvas>
  )
}
