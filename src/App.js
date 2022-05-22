import * as THREE from 'three'
import { React, Suspense, useLayoutEffect, useState, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, MeshReflectorMaterial, Environment, Stage, OrbitControls, Text, GradientTexture, Loader, Lightformer } from '@react-three/drei'
import Car from './components/Car'
import SteeringWheel from './components/SteeringWheel'
import RotationWrapper from './components/RotationWrapper'
import RotationWrapperSteer from './components/RotationWrapperSteer'
import Overlay from './components/Overlay'
import { BoxGeometry, MeshLambertMaterial } from 'three'
import Barlow from './font/Barlow.ttf'
import RotationWrapperText from './components/RotationWrapperText'
// import Toggle from './components/Toggle'
import { BoxBufferGeometry } from 'three'

function Heading(props) {
  const mesh = useRef()
  const { width, height } = useThree((state) => state.viewport)

  useFrame(( state ) => {
    let scrollProgress = props.scroll.current
    let title = mesh.current

    if (scrollProgress <= 0.4) {
      title.position.y = 0
      title.rotation.y = THREE.MathUtils.degToRad((props.scroll.current * 360)) * 0.4
      // console.log(title.rotation.y)
      
    } else if (scrollProgress > 0.4 && scrollProgress <= 1) {
      title.position.y = (scrollProgress - 0.4) * height * 0.8
      title.rotation.y = 1 + (scrollProgress - 0.4)
    }

  })
  
  return (
    <mesh ref={mesh}>
      <Text
          position={[0, 2.5, 0]}
          scale={[15, 15, 1]}
          anchorX="center"
          anchorY="top-baseline"
          font={Barlow}
          color={'white'}
        >
          McLaren
      </Text>
    </mesh>
  )
}

function Carr(props) {
  const mesh = useRef()
  const { width, height } = useThree((state) => state.viewport)

  useFrame(( state ) => {
    let scrollProgress = props.scroll.current
    let car = mesh.current

    if (scrollProgress <= 0.35) {
      // car.position.x = - 0.5
      car.rotation.y = - THREE.MathUtils.degToRad((props.scroll.current * 360))

    } 
    else if (scrollProgress >= 0.35 && scrollProgress <= 1) {

      car.position.x = - (scrollProgress - 0.35) * width * 2
      car.position.z = (scrollProgress - 0.35) * width * 2

      // car.position.x = -0.5 + ( scrollProgress - 0.4 ) * width * 5
      // car.rotation.y = - THREE.MathUtils.degToRad((props.scroll.current * 360)) - (scrollProgress - 0.4) * 0.5

    }
  })
  
  return (
    <mesh ref={mesh}>
      <Car position={[0, -0.4, 0]} rotation={[0, Math.PI / 2, 0]} />
    </mesh>
  )
} 


function Wheel(props) {
  const mesh = useRef()
  const { width, height } = useThree((state) => state.viewport)

  useFrame(( state ) => {
    let scrollProgress = props.scroll.current
    let wheel = mesh.current

    if (scrollProgress <= 0.4) {
      wheel.position.x = width

    } else if (scrollProgress >= 0.4 && scrollProgress <= 1) {
      wheel.position.x = width - (scrollProgress - 0.4) * width * 3
      wheel.rotation.y = - Math.sin(scrollProgress * width * Math.PI / 2)

      if (Math.abs(wheel.position.x) < Math.abs(wheel.position.x - 0.01)) {
        wheel.position.x = 0
      }

    }
  })
  
  return (
    <mesh ref={mesh}>
      <SteeringWheel scale={1.7} />
    </mesh>
  )
}


export default function App() {
  const scroll = useRef(0)
  const overlay = useRef()
  const caption = useRef()

  return (
      <div className="App">
        {/* onCreated={(state) => state.events.connect(overlay.current)} */}
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45, position: [0, 3, 10] }} >
        
        <ambientLight intensity={0.7} />
        <color attach='background' args={['#101010']} />
        <fog attach='fog' args={['#101010', 10, 20]} />
        <Suspense fallback={null}>
        <Environment path='/cube' />

        <Heading scroll={scroll}/>
        <Carr scroll={scroll} />
        <Wheel scroll={scroll} />


        <mesh rotation={[-Math.PI / 2, 0, 0]}>
             <planeGeometry args={[170, 170]} />
             <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={40}
              roughness={0.5}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color='#101010'
              metalness={0.5}
            />
        </mesh>

        </Suspense>
      </Canvas>
      <Loader />
      <Overlay ref={overlay} caption={caption} scroll={scroll} />
    </div>
  );
}





// export default function App() {
//   const scroll = useRef(0)
//   const overlay = useRef()
//   const caption = useRef()



//   return (
//     <>
//       {/* <Canvas dpr={[1, 2]} shadows camera={{ fov: 45, position: [0,3,13] }} onCreated={(state) => state.events.connect(overlay.current)}>
//       <ambientLight intensity={0.7} />
//         <color attach='background' args={['#101010']} />
//         <fog attach='fog' args={['#101010', 10, 20]} />
//         <Suspense fallback={null}>
//           <Environment path='/cube' /> */}





//   <Canvas>

//     <animated.mesh scale={scale} onClick={() => setActive(!active)} ref={myMesh}>
//       <boxGeometry />
//       <meshPhongMaterial color="royalblue" />
//     </animated.mesh>

//     </Canvas>




//           {/* <Toggle /> */}

//           {/* <Car rotation={[0, -0.6, 0]} position={[0,-0.3,0]} /> */}

//           {/* <RotationWrapperText scroll={scroll}> */}
//             {/* <Text
//               position={[0, 2.5, 0]}
//               scale={[15, 15, 1]}
//               anchorX="center"
//               anchorY="top-baseline"
//               font={Barlow}
//               color={'white'}
//             >
//               McLaren
//             </Text> */}
//           {/* </RotationWrapperText> */}

//           {/* <PresentationControls speed={1.5} global zoom={1} polar={[-0.1, Math.PI / 4]} snap={true} > */}

//           {/* <Stage environment={null} intensity={1} contactShadow={false} shadowBias={-0.0015}> */}

//             {/* <RotationWrapper scroll={scroll}>
//               <Car rotation={[0, -0.6, 0]} position={[0,-0.3,0]} />
//             </RotationWrapper> */}
//           {/* </Stage> */}

//           {/* <RotationWrapperSteer scroll={scroll}> */}
//             {/* <SteeringWheel rotation={[0, 1, 0]} /> */}
//           {/* </RotationWrapperSteer> */}

//           {/* <mesh rotation={[-Math.PI / 2, 0, 0]}>
//             <planeGeometry args={[170, 170]} />
//             <MeshReflectorMaterial
//               blur={[300, 100]}
//               resolution={2048}
//               mixBlur={1}
//               mixStrength={40}
//               roughness={1}
//               depthScale={1.2}
//               minDepthThreshold={0.4}
//               maxDepthThreshold={1.4}
//               color='#101010'
//               metalness={0.5}
//             />
//           </mesh>
//         </Suspense>
//       </Canvas>
//       <Loader />
//       <Overlay ref={overlay} caption={caption} scroll={scroll} /> */}
//     </>
//   )
// }
