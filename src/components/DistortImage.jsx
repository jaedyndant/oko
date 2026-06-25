import { useRef, useMemo, useCallback, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Shaders ─────────────────────────────────────────────────────── */

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uHover;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform vec2 uResolution;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Distance from cursor (in UV space)
    float dist = distance(uv, uMouse);

    // Localized ripple: strength falls off with distance from cursor
    // Uses a smooth gaussian-like falloff for elegance
    float radius = 0.35;
    float falloff = smoothstep(radius, 0.0, dist);

    // Sine-wave displacement of UV coordinates
    // Frequency and amplitude tuned for a subtle, award-winning feel
    float frequency = 8.0;
    float amplitude = 0.03;
    float wave = sin(dist * frequency * 3.14159 - uTime * 2.0);

    // Displacement direction: radial from mouse position
    vec2 dir = uv - uMouse;
    vec2 normalizedDir = length(dir) > 0.001 ? normalize(dir) : vec2(0.0);

    // Apply displacement only when hovered, scaled by falloff and hover uniform
    vec2 displacement = normalizedDir * wave * amplitude * falloff * uHover;
    uv += displacement;

    // Secondary subtle chromatic shift for polish
    float chromatic = 0.003 * falloff * uHover;
    float r = texture2D(uTexture, uv + vec2(chromatic, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(chromatic, 0.0)).b;

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

/* ─── Inner Mesh (lives inside R3F Canvas) ────────────────────────── */

function DistortMesh({ imageUrl, hoverTarget }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const hoverValue = useRef(0);
  const mousePos = useRef(new THREE.Vector2(0.5, 0.5));

  const texture = useTexture(imageUrl);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    // Smooth hover transition (lerp toward target over ~0.4s)
    const target = hoverTarget.current ? 1 : 0;
    const speed = 4.0; // 1/0.25 — slightly faster attack than release
    const lerpSpeed = target === 1 ? speed : speed * 0.7;
    hoverValue.current = THREE.MathUtils.lerp(
      hoverValue.current,
      target,
      1 - Math.exp(-lerpSpeed * delta)
    );

    materialRef.current.uniforms.uHover.value = hoverValue.current;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value.lerp(mousePos.current, 0.1);
  });

  const handlePointerMove = useCallback((e) => {
    if (!e.uv) return;
    mousePos.current.set(e.uv.x, e.uv.y);
  }, []);

  const handlePointerEnter = useCallback(() => {
    hoverTarget.current = true;
  }, [hoverTarget]);

  const handlePointerLeave = useCallback(() => {
    hoverTarget.current = false;
  }, [hoverTarget]);

  // Match mesh aspect ratio to image
  const imageAspect = texture.image
    ? texture.image.width / texture.image.height
    : 16 / 9;
  const viewportAspect = viewport.width / viewport.height;

  let meshWidth, meshHeight;
  if (viewportAspect > imageAspect) {
    meshHeight = viewport.height;
    meshWidth = meshHeight * imageAspect;
  } else {
    meshWidth = viewport.width;
    meshHeight = meshWidth / imageAspect;
  }

  return (
    <mesh
      ref={meshRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <planeGeometry args={[meshWidth, meshHeight, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

/* ─── Public Component ────────────────────────────────────────────── */

/**
 * DistortImage — WebGL image with hover-driven ripple distortion.
 *
 * @param {string}  src        — Image URL (Unsplash, static asset, etc.)
 * @param {string}  alt        — Accessible label (used as aria-label on wrapper)
 * @param {string}  className  — Optional CSS class for the container div
 * @param {object}  style      — Optional inline styles for the container div
 * @param {number}  dpr        — Device pixel ratio cap (default 1.5 for perf)
 */
export default function DistortImage({
  src,
  alt = '',
  className = '',
  style = {},
  dpr = 1.5,
}) {
  const hoverTarget = useRef(false);

  return (
    <div
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
      role="img"
      aria-label={alt}
    >
      <Canvas
        dpr={Math.min(dpr, typeof window !== 'undefined' ? window.devicePixelRatio : 2)}
        gl={{ antialias: false, alpha: true }}
        camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 5] }}
        style={{ width: '100%', height: '100%' }}
        eventSource={undefined}
      >
        <DistortMesh imageUrl={src} hoverTarget={hoverTarget} />
      </Canvas>
    </div>
  );
}
