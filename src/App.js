import * as THREE from 'three'
import { Suspense, useLayoutEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, MeshReflectorMaterial, Environment, Stage, PresentationControls, OrbitControls, Sparkles } from '@react-three/drei'
import Car from './Car'

/*
Author: Steven Grey (https://sketchfab.com/Steven007)
License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
Source: https://sketchfab.com/3d-models/lamborghini-urus-2650599973b649ddb4460ff6c03e4aa2
Title: Lamborghini Urus
*/
function Model(props) {
  const { scene, nodes, materials } = useGLTF('/car.glb')
  // useLayoutEffect(() => {
  //   scene.traverse((obj) => obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true))
  //   Object.assign(nodes.wheel003_020_2_Chrome_0.material, { metalness: 0.9, roughness: 0.4, color: new THREE.Color('#020202') })
  //   Object.assign(materials.WhiteCar, { roughness: 0.0, metalness: 0.3, emissive: new THREE.Color('#500000'), envMapIntensity: 0.5 })
  // }, [scene, nodes, materials])
  return <primitive object={scene} {...props} />
}

export default function App() {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
      {/* <OrbitControls /> */}
      <color attach="background" args={['#101010']} />
      <fog attach="fog" args={['#101010', 10, 20]} />
      <Suspense fallback={null}>
        <Environment path="/cube" />
        <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.1, Math.PI / 4]}>
          <Stage environment={null} intensity={1} contactShadow={false} shadowBias={-0.0015}>
            {/* <Model scale={0.01} /> */}
            <mesh scale={0.1}>
              <sphereGeometry position={[0,0,0]}/>
              <meshPhongMaterial color={'red'} />
            </mesh>
            <Sparkles count={500} size={10} position={[0,0,0]}/>
            <Car />
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
              color="#101010"
              metalness={0.5}
            />
          </mesh>
        </PresentationControls>
      </Suspense>
    </Canvas>
  )
}
