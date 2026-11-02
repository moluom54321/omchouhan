import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";

// This component is lazy-loaded — Three.js bundle only downloads
// after hero text has already painted (LCP element visible first)
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} position={[-2, 1, -2]} scale={1.5}>
          <MeshDistortMaterial color="#00E5FF" attach="material" distort={0.5} speed={2} roughness={0} metalness={0.8} />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere args={[1, 64, 64]} position={[2, -1, -1]} scale={1.2}>
          <MeshDistortMaterial color="#6C63FF" attach="material" distort={0.6} speed={1.5} roughness={0} metalness={0.8} />
        </Sphere>
      </Float>
    </>
  );
};

const HeroScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="w-full h-full absolute inset-0 -z-10 opacity-60 pointer-events-none"
      // Graceful degradation: if WebGL fails, nothing breaks — Scene just won't show
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Scene />
    </Canvas>
  );
};

export default HeroScene;
