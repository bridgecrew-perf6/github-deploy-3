import React, { useRef } from 'react'
import {Canvas, useFrame, useThree, extend} from 'react-three-fiber'
import niceColors from 'nice-color-palettes'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })
const Controls = (props) => {

  const { gl, camera } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}

const Box = ({ position }) => {
  // Register box as a physics body with mass
  const ref = useRef()
  
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" roughness={0.5} color={niceColors[6][3]} />
    </mesh>
  )
}

export default function App() {
	return (
        <Canvas shadowMap colorManagement gl={{ alpha: false }} camera={{ position: [-1, 1, 2.5], fov: 50 }}>
        <color attach="background" args={niceColors[6][0]} />
        <hemisphereLight intensity={0.35} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-mapSize-width={256} shadow-mapSize-height={256} />
        <Box position={[0,0,0]}/>
        <Controls
            autoRotate
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.5}
            rotateSpeed={1}
        />
      </Canvas>
  )
}
