import { Suspense, useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, ContactShadows, Environment, SpotLight } from '@react-three/drei';
import * as THREE from 'three';

// ── Smooth spring lerp helper ─────────────────────────────────────────────────
// Simulates a spring by lerping current → target at `stiffness` rate per frame
const lerpSpring = (current: number, target: number, speed = 0.07) =>
  THREE.MathUtils.lerp(current, target, speed);

const useMaterials = () =>
  useMemo(() => ({
    cover:     new THREE.MeshStandardMaterial({ color: '#5e0c0c', roughness: 0.6, metalness: 0.1 }),
    coverBack: new THREE.MeshStandardMaterial({ color: '#2C1810', roughness: 0.7 }),
    page:      new THREE.MeshStandardMaterial({ color: '#FDF5E6', roughness: 0.9 }),
    spine:     new THREE.MeshPhysicalMaterial({ color: '#D4AF37', metalness: 0.9, roughness: 0.2, clearcoat: 0.5 }),
    gold:      new THREE.MeshPhysicalMaterial({
      color: '#FFD700', metalness: 1.0, roughness: 0.1,
      clearcoat: 1.0, clearcoatRoughness: 0.1,
      emissive: new THREE.Color('#D4AF37'), emissiveIntensity: 0.05,
    }),
  }), []);

// ── Front cover — spring-animated hinge ──────────────────────────────────────
const FrontCover = ({ isOpen, mats }: { isOpen: boolean; mats: ReturnType<typeof useMaterials> }) => {
  const pivotRef = useRef<THREE.Group>(null);
  const rotY = useRef(0);
  const target = isOpen ? -Math.PI * 0.88 : 0;

  useFrame(() => {
    if (!pivotRef.current) return;
    rotY.current = lerpSpring(rotY.current, target, 0.06);
    pivotRef.current.rotation.y = rotY.current;
  });

  return (
    // Outer group sets pivot at spine (x = −1.5)
    <group position={[-1.5, 0, 0.055]}>
      <group ref={pivotRef}>
        {/* Shift cover mesh so it rotates around the spine */}
        <group position={[1.5, 0, 0]}>
          <mesh castShadow material={mats.cover}>
            <boxGeometry args={[3, 4, 0.1]} />
          </mesh>

          {/* Gold outer border */}
          <mesh position={[0, 0, 0.054]} material={mats.gold}>
            <planeGeometry args={[2.82, 3.88]} />
          </mesh>
          {/* Dark inner panel */}
          <mesh position={[0, 0, 0.056]}>
            <planeGeometry args={[2.65, 3.72]} />
            <meshStandardMaterial color="#6b0a0a" />
          </mesh>
          {/* Title plate */}
          <mesh position={[0, 0.72, 0.058]} material={mats.gold}>
            <planeGeometry args={[2.15, 0.54]} />
          </mesh>
          {/* Horizontal rule */}
          <mesh position={[0, 0.22, 0.057]} material={mats.gold}>
            <planeGeometry args={[2.35, 0.025]} />
          </mesh>
          {/* Diamond ornament */}
          <mesh position={[0, -0.4, 0.057]} rotation={[0, 0, Math.PI / 4]} material={mats.gold}>
            <planeGeometry args={[0.45, 0.45]} />
          </mesh>

          {/* Cover text — own Suspense, won't block book render */}
          <Suspense fallback={null}>
            <Text
              position={[0, 0.72, 0.066]}
              fontSize={0.21} color="#1a0a00"
              font="https://fonts.gstatic.com/s/cinzel/v23/8vIJ7ww63mVu7gt79mT7.woff2"
              anchorX="center" anchorY="middle" letterSpacing={0.08}
            >
              SNOW WHITE
            </Text>
            <Text
              position={[0, 0.1, 0.064]}
              fontSize={0.1} color="#D4AF37"
              anchorX="center" anchorY="middle" letterSpacing={0.16}
            >
              and the Seven Dwarfs
            </Text>
          </Suspense>
        </group>
      </group>
    </group>
  );
};

// ── Single flipping page ──────────────────────────────────────────────────────
const FlippingPage = ({ index, isFlipping, mat }: {
  index: number;
  isFlipping: boolean;
  mat: THREE.MeshStandardMaterial;
}) => {
  const pivotRef = useRef<THREE.Group>(null);
  const rotY  = useRef(0);
  const ready = useRef(false);

  useEffect(() => {
    if (!isFlipping) { ready.current = false; return; }
    const t = setTimeout(() => { ready.current = true; }, index * 220);
    return () => clearTimeout(t);
  }, [isFlipping, index]);

  useFrame(() => {
    if (!pivotRef.current) return;
    const target = ready.current ? -Math.PI * 0.85 : 0;
    rotY.current = lerpSpring(rotY.current, target, 0.075);
    pivotRef.current.rotation.y = rotY.current;
  });

  return (
    <group position={[-1.48, 0, 0.038 - index * 0.012]}>
      <group ref={pivotRef}>
        <mesh position={[1.48, 0, 0]} material={mat} castShadow>
          <boxGeometry args={[2.95, 3.88, 0.01]} />
        </mesh>
      </group>
    </group>
  );
};

// ── Interior reveal text ──────────────────────────────────────────────────────
const RevealText = () => (
  <Suspense fallback={null}>
    <Text
      position={[0.05, 0.45, 0.025]}
      fontSize={0.19} color="#2C1810"
      maxWidth={2.4} textAlign="center"
      font="https://fonts.gstatic.com/s/playfairdisplay/v21/nuFvD-vYSZtu_BHBMc_pG06H9FQ.woff"
    >
      {'Once upon a time,\nin a kingdom far away...'}
    </Text>
  </Suspense>
);

// ── Full book ────────────────────────────────────────────────────────────────
const Book = ({ step }: { step: number }) => {
  const mats   = useMaterials();
  const isOpen = step >= 1;

  return (
    <group rotation={[0.15, -0.35, 0]}>
      {/* Back cover */}
      <mesh position={[0, 0, -0.08]} material={mats.coverBack} receiveShadow>
        <boxGeometry args={[3.08, 4.08, 0.1]} />
      </mesh>

      {/* Gold spine */}
      <mesh position={[-1.52, 0, 0]} material={mats.spine}>
        <boxGeometry args={[0.07, 4.08, 0.26]} />
      </mesh>

      {/* Page block */}
      <mesh position={[0.05, 0, -0.01]} material={mats.page}>
        <boxGeometry args={[2.92, 3.9, 0.12]} />
      </mesh>

      {/* Interior flat page + reveal text */}
      <mesh position={[0.05, 0, 0.015]} material={mats.page}>
        <boxGeometry args={[2.9, 3.88, 0.01]} />
      </mesh>
      {isOpen && <RevealText />}

      {/* 3 staggered flipping pages */}
      {[0, 1, 2].map(i => (
        <FlippingPage key={i} index={i} isFlipping={step >= 2} mat={mats.page} />
      ))}

      {/* Animated front cover */}
      <FrontCover isOpen={isOpen} mats={mats} />
    </group>
  );
};

// ── Camera dolly ──────────────────────────────────────────────────────────────
const DollyCamera = ({ step }: { step: number }) => {
  const zRef = useRef(8.5);
  useFrame(({ camera }) => {
    zRef.current = lerpSpring(zRef.current, step >= 1 ? 6.6 : 8.5, 0.028);
    camera.position.z = zRef.current;
  });
  return null;
};

// ── Main export ───────────────────────────────────────────────────────────────
export default function SnowWhitePreloader({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [step, setStep]       = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [done, setDone]       = useState(false);

  useEffect(() => {
    const run = async () => {
      await new Promise<void>(r => setTimeout(r, 900));
      setStep(1);                               // open cover
      await new Promise<void>(r => setTimeout(r, 1900));
      setStep(2);                               // flip pages
      await new Promise<void>(r => setTimeout(r, 2400));
      setFadeOut(true);
      await new Promise<void>(r => setTimeout(r, 700));
      setDone(true);
      onComplete?.();
    };
    run();
  }, []);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#050a18]"
      style={{ opacity: fadeOut ? 0 : 1, transition: 'opacity 0.7s ease' }}
    >
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0.4, 8.5], fov: 42 }}>
        {/* Environment map: 'city' gives bright, sharp reflections for the gold */}
        <Suspense fallback={null}>
          <Environment preset="city" environmentIntensity={1.2} />
        </Suspense>

        {/* Brighter baseline lighting so nothing is lost in shadow */}
        <ambientLight intensity={0.8} />
        
        {/* Main bright light hitting the front of the book */}
        <directionalLight 
          position={[2, 5, 8]} 
          intensity={2.5} 
          color="#ffffff" 
          castShadow 
          shadow-mapSize={[1024, 1024]} 
        />
        
        {/* Warm key light for dramatic reading-lamp feel */}
        <SpotLight
          position={[4, 7, 5]}
          angle={0.5}
          penumbra={0.5}
          intensity={3}
          color="#ffedcc"
        />
        
        {/* Magical glints from below */}
        <pointLight position={[-3, -2, 4]} intensity={2.0} color="#D4AF37" distance={10} />
        
        {/* Cool moonlight rim light from the back */}
        <directionalLight position={[-5, 8, -6]} intensity={1.5} color="#a0c4ff" />

        <DollyCamera step={step} />

        {/* Book — outside Suspense, renders immediately */}
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.45}>
          <Book step={step} />
        </Float>

        {/* Shadow — non-blocking optional */}
        <Suspense fallback={null}>
          <ContactShadows position={[0, -2.6, 0]} opacity={0.5} scale={14} blur={2.5} />
        </Suspense>
      </Canvas>

      {/* Overlay text */}
      <div className="absolute bottom-10 w-full text-center pointer-events-none">
        <p
          className="text-[#D4AF37]/50 tracking-[0.5em] text-[10px] uppercase"
          style={{
            opacity:    step >= 1 ? 1 : 0,
            transform:  step >= 1 ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 1.2s ease 0.5s',
          }}
        >
          Preparing your story...
        </p>
      </div>
    </div>
  );
}
