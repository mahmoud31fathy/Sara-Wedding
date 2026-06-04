import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles, ContactShadows, Text } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';

function CameraController() {
  useFrame((state) => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max(scrollY / (maxScroll || 1), 0), 1);
    
    const targetZ = THREE.MathUtils.lerp(6, -18, progress);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.1);
    
    const targetRotX = THREE.MathUtils.lerp(0, 0.15, progress);
    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, targetRotX, 0.1);
  });
  return null;
}

function Ring({ position, rotation, rotationSpeed }) {
  const ringRef = useRef();
  
  useFrame((state, delta) => {
    ringRef.current.rotation.x += delta * rotationSpeed[0];
    ringRef.current.rotation.y += delta * rotationSpeed[1];
  });

  // Hyper-realistic gold material
  const goldMaterial = new THREE.MeshPhysicalMaterial({
    // color: '#D4AF37',
    color: '#bf9a33',
    metalness: 1,
    roughness: 0.1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.5,
  });

  return (
    <group position={position} rotation={rotation} ref={ringRef}>
      <mesh material={goldMaterial}>
        <torusGeometry args={[1.8, 0.08, 32, 100]} />
      </mesh>
    </group>
  );
}

function EternityKnot() {
  const knotRef = useRef();
  
  useFrame((state, delta) => {
    knotRef.current.rotation.x += delta * 0.1;
    knotRef.current.rotation.y -= delta * 0.15;
    knotRef.current.rotation.z += delta * 0.05;
  });

  const goldMaterial = new THREE.MeshPhysicalMaterial({
    // color: '#D4AF37',
    color: '#bf9a33',
    metalness: 1,
    roughness: 0.1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.5,
  });

  return (
    <group position={[0, 0, -25]}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={knotRef} material={goldMaterial}>
          <torusKnotGeometry args={[3, 0.3, 128, 16]} />
        </mesh>
      </Float>
    </group>
  );
}

function FloatingPearls() {
  const groupRef = useRef();
  
  useFrame((state, delta) => {
    groupRef.current.rotation.y -= delta * 0.05;
    groupRef.current.rotation.x += delta * 0.02;
  });
  
  const positions = useMemo(() => {
    return Array.from({ length: 40 }).map(() => [
      (Math.random() - 0.5) * 20, 
      (Math.random() - 0.5) * 20, 
      (Math.random() - 0.5) * 20
    ]);
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, -25]}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[Math.random() * 0.2 + 0.1, 32, 32]} />
          <meshStandardMaterial 
            color="#FAF6F0" 
            roughness={0.1} 
            metalness={0.9} 
            envMapIntensity={2} 
          />
        </mesh>
      ))}
    </group>
  );
}

function VintageDust() {
  return (
    <Sparkles 
      count={150} 
      scale={20} 
      size={3} 
      speed={0.1} 
      opacity={0.4} 
      color="#D4AF37" 
      position={[0, 0, -10]}
    />
  );
}

export default function Hero3D() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 45 }}>
        <Suspense fallback={null}>
          <CameraController />
          <color attach="background" args={['#FAF6F0']} />
          
          {/* Ambient light lowered so scene isn't washed out */}
          <ambientLight intensity={0.4} color="#FFF" />
          
          {/* Intense spotlight to create specular highlights that trigger the bloom */}
          <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={10} color="#FFF" />
          <pointLight position={[-10, -10, -5]} intensity={2} color="#9CAF88" />
          <pointLight position={[0, 0, -20]} intensity={5} color="#D4AF37" distance={30} />

          <group position={[0, 0, 0]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <Ring 
                position={[-0.5, 0, 0]} 
                rotation={[Math.PI / 4, 0, 0]} 
                rotationSpeed={[0.2, 0.3]} 
              />
              <Ring 
                position={[0.5, 0, 0]} 
                rotation={[-Math.PI / 4, 0, 0]} 
                rotationSpeed={[-0.2, 0.1]} 
              />
            </Float>
          </group>
          
          <EternityKnot />
          <FloatingPearls />
          <VintageDust />

          <ContactShadows position={[0, -4, 0]} opacity={0.3} scale={15} blur={2.5} far={4} color="#3E362E" />
          
          <Environment preset="city" />

          {/* Post Processing: High threshold ensures the cream background doesn't bloom and wash out the screen */}
          <EffectComposer>
            <Bloom luminanceThreshold={1.5} mipmapBlur intensity={0.8} />
            <DepthOfField focusDistance={0.02} focalLength={0.06} bokehScale={2} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
