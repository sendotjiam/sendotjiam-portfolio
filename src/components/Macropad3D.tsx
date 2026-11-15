'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { hasMacropadAssembled, markMacropadAssembled } from '@/utils/animationSession';

export type MacropadKeyId = 'about' | 'experience' | 'projects' | 'skills' | 'education' | 'contact';
export type SwitchProfileId = 'thock' | 'tactile' | 'clicky';

export interface ArtisanKeySpec {
  id: MacropadKeyId;
  numeral: string;
  label: string;
  sublabel: string;
  hotkey: string;
  targetId: string;
  material: 'sumi' | 'washi' | 'sakura' | 'shuiro';
  u: number;
  width: number;
  x: number;
  z: number;
  pitch: number;
}

// 2-Row Proportional Mechanical Keycap Matrix (Row 1 = 4.50u, Row 2 = 4.50u)
// Base 1u = 1.16 units, inter-key gap = 0.12 units, total row span = 5.46 units (x: -2.73 to +2.73)
export const ARTISAN_KEYS: ArtisanKeySpec[] = [
  // Row 1: About (1.25u) | Experiences (1.85u) | Projects (1.40u) -> 4.50u
  {
    id: 'about',
    numeral: '01',
    label: 'About',
    sublabel: 'OVERVIEW',
    hotkey: '1',
    targetId: 'about',
    material: 'sumi',
    u: 1.25,
    width: 1.45,
    x: -2.005,
    z: -0.08,
    pitch: 0.94,
  },
  {
    id: 'experience',
    numeral: '02',
    label: 'Experiences',
    sublabel: 'CAREER HISTORY',
    hotkey: '2',
    targetId: 'experience',
    material: 'washi',
    u: 1.85,
    width: 2.146,
    x: -0.087,
    z: -0.08,
    pitch: 1.0,
  },
  {
    id: 'projects',
    numeral: '03',
    label: 'Projects',
    sublabel: 'FEATURED APPS',
    hotkey: '3',
    targetId: 'projects',
    material: 'washi',
    u: 1.4,
    width: 1.624,
    x: 1.918,
    z: -0.08,
    pitch: 1.05,
  },
  // Row 2: Skills (1.35u) | Education (1.70u) | Contact (1.45u) -> 4.50u
  {
    id: 'skills',
    numeral: '04',
    label: 'Skills',
    sublabel: 'TECH STACK',
    hotkey: '4',
    targetId: 'skills',
    material: 'washi',
    u: 1.35,
    width: 1.566,
    x: -1.947,
    z: 1.04,
    pitch: 0.98,
  },
  {
    id: 'education',
    numeral: '05',
    label: 'Education',
    sublabel: 'UNIVERSITY',
    hotkey: '5',
    targetId: 'education',
    material: 'sakura',
    u: 1.7,
    width: 1.972,
    x: -0.058,
    z: 1.04,
    pitch: 1.1,
  },
  {
    id: 'contact',
    numeral: '06',
    label: 'Contact',
    sublabel: 'GET IN TOUCH',
    hotkey: '6',
    targetId: 'contact-cta',
    material: 'shuiro',
    u: 1.45,
    width: 1.682,
    x: 1.889,
    z: 1.04,
    pitch: 0.9,
  },
];

export const SWITCH_PROFILES: {
  id: SwitchProfileId;
  name: string;
  ledHex: number;
}[] = [
  { id: 'thock', name: 'Linear Thock', ledHex: 0xd9381e },
  { id: 'tactile', name: 'Holy Panda', ledHex: 0x0066cc },
  { id: 'clicky', name: 'Kailh Jade', ledHex: 0x0d9488 },
];

interface Macropad3DProps {
  activeSection?: MacropadKeyId;
  onSelectKey?: (key: ArtisanKeySpec) => void;
  onSceneReady?: () => void;
  onAssemblyComplete?: () => void;
  controlsVisible?: boolean;
  interactive?: boolean;
  skipAssembly?: boolean;
}

// ---------------------------------------------------------------------------
// Procedural Geometry Builders (Proportional Lofted Keycaps & Extrusions)
// ---------------------------------------------------------------------------

function createRoundedRectShape(
  width: number,
  height: number,
  radius: number,
  offsetX = 0,
  offsetY = 0
): THREE.Shape {
  const shape = new THREE.Shape();
  const hw = width / 2;
  const hh = height / 2;
  const r = Math.min(radius, hw, hh);

  shape.moveTo(offsetX - hw + r, offsetY - hh);
  shape.lineTo(offsetX + hw - r, offsetY - hh);
  shape.quadraticCurveTo(offsetX + hw, offsetY - hh, offsetX + hw, offsetY - hh + r);
  shape.lineTo(offsetX + hw, offsetY + hh - r);
  shape.quadraticCurveTo(offsetX + hw, offsetY + hh, offsetX + hw - r, offsetY + hh);
  shape.lineTo(offsetX - hw + r, offsetY + hh);
  shape.quadraticCurveTo(offsetX - hw, offsetY + hh, offsetX - hw, offsetY + hh - r);
  shape.lineTo(offsetX - hw, offsetY - hh + r);
  shape.quadraticCurveTo(offsetX - hw, offsetY - hh, offsetX - hw + r, offsetY - hh);
  return shape;
}

function createRoundedBoxGeometry(
  width: number,
  height: number,
  depth: number,
  radius: number,
  bevelThickness = 0.04,
  bevelSize = 0.035,
  bevelSegments = 4,
  curveSegments = 12
): THREE.BufferGeometry {
  const innerW = Math.max(0.1, width - bevelSize * 2);
  const innerD = Math.max(0.1, depth - bevelSize * 2);
  const innerH = Math.max(0.04, height - bevelThickness * 2);
  const shape = createRoundedRectShape(innerW, innerD, Math.max(0.02, radius - bevelSize));

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: innerH,
    bevelEnabled: true,
    bevelSegments,
    steps: 1,
    bevelSize,
    bevelThickness,
    curveSegments,
  });

  geo.center();
  geo.rotateX(Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

function sampleRoundedRectRing(
  width: number,
  depth: number,
  radius: number,
  segmentsPerEdge = 8
): Array<{ x: number; z: number; u: number; v: number }> {
  const hw = width / 2;
  const hd = depth / 2;
  const r = Math.min(radius, hw - 1e-4, hd - 1e-4);
  const points: Array<{ x: number; z: number; u: number; v: number }> = [];

  const corners = [
    { cx: hw - r, cz: hd - r, start: 0, end: Math.PI / 2 },
    { cx: -hw + r, cz: hd - r, start: Math.PI / 2, end: Math.PI },
    { cx: -hw + r, cz: -hd + r, start: Math.PI, end: Math.PI * 1.5 },
    { cx: hw - r, cz: -hd + r, start: Math.PI * 1.5, end: Math.PI * 2 },
  ];

  for (let c = 0; c < 4; c++) {
    const corner = corners[c];
    for (let s = 0; s < segmentsPerEdge; s++) {
      const t = s / segmentsPerEdge;
      const angle = corner.start + (corner.end - corner.start) * t;
      const x = corner.cx + Math.cos(angle) * r;
      const z = corner.cz + Math.sin(angle) * r;
      points.push({
        x,
        z,
        u: x / width + 0.5,
        v: 1 - (z / depth + 0.5),
      });
    }
  }
  return points;
}

function weldSeamNormals(
  bodyGeo: THREE.BufferGeometry,
  topGeo: THREE.BufferGeometry,
  bodyRingStartVertex: number,
  topRingStartVertex: number,
  ringCount: number
) {
  const bodyNorm = bodyGeo.attributes.normal as THREE.BufferAttribute;
  const topNorm = topGeo.attributes.normal as THREE.BufferAttribute;
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();

  for (let i = 0; i < ringCount; i++) {
    const bi = bodyRingStartVertex + i;
    const ti = topRingStartVertex + i;
    a.fromBufferAttribute(bodyNorm, bi);
    b.fromBufferAttribute(topNorm, ti);
    a.add(b).normalize();
    bodyNorm.setXYZ(bi, a.x, a.y, a.z);
    topNorm.setXYZ(ti, a.x, a.y, a.z);
  }
  bodyNorm.needsUpdate = true;
  topNorm.needsUpdate = true;
}

function createSculptedKeycapGeometry(width = 1.6, depth = 0.98, height = 0.48) {
  const segsPerCorner = 9;
  const ringPointCount = segsPerCorner * 4;
  const ringStride = ringPointCount + 1;

  const topScaleW = 1 - 0.18 / width;
  const topScaleD = 1 - 0.18 / depth;

  const bodySpecs = [
    { w: 1.0, d: 1.0, y: 0.0, r: 0.18 },
    { w: 0.992, d: 0.992, y: 0.16, r: 0.175 },
    { w: 0.96, d: 0.96, y: 0.58, r: 0.16 },
    { w: 0.92, d: 0.915, y: 0.84, r: 0.145 },
    {
      w: topScaleW + (1 - topScaleW) * 0.34,
      d: topScaleD + (1 - topScaleD) * 0.34,
      y: 0.955,
      r: 0.135,
    },
    { w: topScaleW, d: topScaleD, y: 1.0, r: 0.125 },
  ];

  const bodyPositions: number[] = [];
  const bodyUvs: number[] = [];
  const bodyIndices: number[] = [];

  bodySpecs.forEach((spec, rIdx) => {
    const rw = width * spec.w;
    const rd = depth * spec.d;
    const ry = height * spec.y;
    const ring = sampleRoundedRectRing(rw, rd, spec.r, segsPerCorner);

    for (let i = 0; i <= ringPointCount; i++) {
      const pt = ring[i % ringPointCount];
      const nx = pt.x / (rw * 0.5);
      const nz = pt.z / (rd * 0.5);
      const dishCurve =
        rIdx >= 3 ? (rIdx - 2) * 0.004 * (0.45 * (1 - nx * nx) + 0.55 * (1 - nz * nz)) : 0;
      bodyPositions.push(pt.x, ry - dishCurve, pt.z);
      bodyUvs.push(pt.u, spec.y);
    }
  });

  for (let r = 0; r < bodySpecs.length - 1; r++) {
    const rowA = r * ringStride;
    const rowB = (r + 1) * ringStride;
    for (let i = 0; i < ringPointCount; i++) {
      const a = rowA + i;
      const b = rowA + i + 1;
      const c = rowB + i + 1;
      const d = rowB + i;
      bodyIndices.push(a, c, b, a, d, c);
    }
  }

  const bodyGeo = new THREE.BufferGeometry();
  bodyGeo.setAttribute('position', new THREE.Float32BufferAttribute(bodyPositions, 3));
  bodyGeo.setAttribute('uv', new THREE.Float32BufferAttribute(bodyUvs, 2));
  bodyGeo.setIndex(bodyIndices);
  bodyGeo.computeVertexNormals();

  // Top spherical concave finger dish
  const topW = width * topScaleW;
  const topD = depth * topScaleD;
  const topRingScales = [1.0, 0.82, 0.58, 0.34, 0.14];
  const dishDepth = 0.026;

  const topPositions: number[] = [];
  const topUvs: number[] = [];
  const topIndices: number[] = [];

  topRingScales.forEach((scale, rIdx) => {
    const ring = sampleRoundedRectRing(
      Math.max(0.04, topW * scale),
      Math.max(0.04, topD * scale),
      Math.max(0.015, 0.125 * scale),
      segsPerCorner
    );

    for (let i = 0; i <= ringPointCount; i++) {
      const pt = ring[i % ringPointCount];
      const nx = pt.x / (topW * 0.5);
      const nz = pt.z / (topD * 0.5);
      const radial = Math.min(1, nx * nx * 0.78 + nz * nz * 0.94);
      const scoop = rIdx === 0 ? 0 : dishDepth * (1 - radial);
      const edgeDrop = 0.005 * (0.45 * (1 - nx * nx) + 0.55 * (1 - nz * nz));
      const y = height - edgeDrop - scoop;
      topPositions.push(pt.x, y, pt.z);
      topUvs.push(pt.x / topW + 0.5, 1 - (pt.z / topD + 0.5));
    }
  });

  const centerIdx = topRingScales.length * ringStride;
  topPositions.push(0, height - 0.005 - dishDepth, 0);
  topUvs.push(0.5, 0.5);

  for (let r = 0; r < topRingScales.length - 1; r++) {
    const rowA = r * ringStride;
    const rowB = (r + 1) * ringStride;
    for (let i = 0; i < ringPointCount; i++) {
      const a = rowA + i;
      const b = rowA + i + 1;
      const c = rowB + i + 1;
      const d = rowB + i;
      topIndices.push(a, c, b, a, d, c);
    }
  }

  const lastRow = (topRingScales.length - 1) * ringStride;
  for (let i = 0; i < ringPointCount; i++) {
    topIndices.push(lastRow + i, centerIdx, lastRow + i + 1);
  }

  const topGeo = new THREE.BufferGeometry();
  topGeo.setAttribute('position', new THREE.Float32BufferAttribute(topPositions, 3));
  topGeo.setAttribute('uv', new THREE.Float32BufferAttribute(topUvs, 2));
  topGeo.setIndex(topIndices);
  topGeo.computeVertexNormals();

  weldSeamNormals(bodyGeo, topGeo, (bodySpecs.length - 1) * ringStride, 0, ringStride);
  return { body: bodyGeo, top: topGeo };
}

// ---------------------------------------------------------------------------
// Studio Environment & Aspect-Matched Proportional Keycap Legend Textures
// ---------------------------------------------------------------------------

function buildStudioEnvironment(renderer: THREE.WebGLRenderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const roomEnv = new RoomEnvironment();
  const mainEnv = pmrem.fromScene(roomEnv, 0.04).texture;
  roomEnv.dispose();
  pmrem.dispose();
  return mainEnv;
}

/**
 * Generates an aspect-matched decal texture for each keycap's exact physical width
 * so typography, corner numerals, and vermilion sun dots remain 1:1 uniform with zero stretching.
 */
function createProportionalKeyLegendTexture(
  spec: ArtisanKeySpec,
  planeW: number,
  planeD: number
): THREE.CanvasTexture {
  const height = 512;
  const width = Math.max(512, Math.round(height * (planeW / planeD)));
  const cvs = document.createElement('canvas');
  cvs.width = width;
  cvs.height = height;
  const ctx = cvs.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(cvs);

  ctx.clearRect(0, 0, width, height);

  const primaryInk =
    spec.material === 'sumi' || spec.material === 'shuiro'
      ? '#ffffff'
      : spec.material === 'sakura'
        ? '#0f2926'
        : '#111216';

  const accentInk =
    spec.material === 'sumi'
      ? '#ff6b52'
      : spec.material === 'shuiro'
        ? '#ffe4de'
        : spec.material === 'sakura'
          ? '#0d9488'
          : '#0066cc';

  // Top-left key numeral ("01" .. "06") + unit size indicator ("1.25u" .. "1.85u")
  ctx.fillStyle = accentInk;
  ctx.font = '800 54px "JetBrains Mono", "Plus Jakarta Sans", monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(spec.numeral, 44, 34);

  ctx.fillStyle = primaryInk;
  ctx.globalAlpha = 0.42;
  ctx.font = '700 32px "JetBrains Mono", monospace';
  ctx.fillText(`${spec.u.toFixed(2).replace(/0$/, '')}U`, 132, 46);
  ctx.globalAlpha = 1;

  // Top-right accent dot (true circle thanks to aspect-matched canvas)
  ctx.fillStyle =
    spec.material === 'shuiro'
      ? '#ffffff'
      : spec.material === 'sakura'
        ? '#0d9488'
        : '#d9381e';
  ctx.beginPath();
  ctx.arc(width - 58, 62, 16, 0, Math.PI * 2);
  ctx.fill();

  // Center full English label scaled proportionally to fit the custom key width
  ctx.fillStyle = primaryInk;
  ctx.font = '800 114px "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(spec.label, width / 2, 254);

  // Bottom English sub-caption
  ctx.fillStyle = primaryInk;
  ctx.globalAlpha = spec.material === 'washi' ? 0.62 : 0.78;
  ctx.font = '700 38px "JetBrains Mono", "Plus Jakarta Sans", sans-serif';
  ctx.fillText(spec.sublabel, width / 2, 412);
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

function createNameplateTexture(isDark: boolean, profile: SwitchProfileId): THREE.CanvasTexture {
  const cvs = document.createElement('canvas');
  cvs.width = 1600;
  cvs.height = 300;
  const ctx = cvs.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(cvs);

  // Recessed brushed Sumi plate background
  ctx.fillStyle = isDark ? '#0f1014' : '#181920';
  ctx.fillRect(0, 0, 1600, 300);

  // Brass border frame
  ctx.strokeStyle = '#c89d54';
  ctx.lineWidth = 8;
  ctx.strokeRect(14, 14, 1572, 272);

  // Left Seal Square (Sendo Tjiamis Monogram - Synced with Switch Profile Theme)
  const profileSpec = SWITCH_PROFILES.find((p) => p.id === profile) || SWITCH_PROFILES[0];
  const accentHex = '#' + profileSpec.ledHex.toString(16).padStart(6, '0');
  ctx.fillStyle = accentHex;
  ctx.beginPath();
  ctx.roundRect(42, 46, 136, 136, 18);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 66px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ST', 110, 116);

  // Center-Left English Engraving (Identity & Role)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 62px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('SENDO TJIAMIS · iOS ENGINEER', 210, 90);

  ctx.fillStyle = '#e5be77';
  ctx.font = '700 38px "JetBrains Mono", monospace';
  const profileLabel =
    profile === 'thock'
      ? 'QUICK JUMP DECK · SWITCH: LINEAR THOCK'
      : profile === 'tactile'
        ? 'QUICK JUMP DECK · SWITCH: HOLY PANDA'
        : 'QUICK JUMP DECK · SWITCH: KAILH JADE';
  ctx.fillText(profileLabel, 210, 156);

  // Bottom instruction bar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.68)';
  ctx.font = '600 30px "JetBrains Mono", monospace';
  ctx.fillText('PRESS KEYS (1-6) TO NAVIGATE · TURN BRASS KNOB (R) FOR SOUND', 42, 240);

  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

function createGroundShadowTexture(): THREE.CanvasTexture {
  const cvs = document.createElement('canvas');
  cvs.width = 512;
  cvs.height = 512;
  const ctx = cvs.getContext('2d');
  if (ctx) {
    const g = ctx.createRadialGradient(256, 256, 36, 256, 256, 240);
    g.addColorStop(0, 'rgba(15, 16, 22, 0.38)');
    g.addColorStop(0.55, 'rgba(15, 16, 22, 0.14)');
    g.addColorStop(1, 'rgba(15, 16, 22, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);
  }
  const tex = new THREE.CanvasTexture(cvs);
  tex.needsUpdate = true;
  return tex;
}

// ---------------------------------------------------------------------------
// Component Implementation (2-Row Proportional 3D Macropad with Deep Key Press)
// ---------------------------------------------------------------------------

export default function Macropad3D({
  onSelectKey,
  onSceneReady,
  onAssemblyComplete,
  controlsVisible = true,
  interactive = true,
  skipAssembly: skipAssemblyProp = false,
}: Macropad3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [switchProfile, setSwitchProfile] = useState<SwitchProfileId>('thock');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [lastPressedKey, setLastPressedKey] = useState<MacropadKeyId | null>(null);

  const soundEnabledRef = useRef<boolean>(true);
  const switchProfileRef = useRef<SwitchProfileId>('thock');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const tapKeyRef = useRef<((id: MacropadKeyId, triggerAction?: boolean) => void) | null>(null);
  const rotateKnobRef = useRef<(() => void) | null>(null);
  const onSceneReadyRef = useRef<(() => void) | undefined>(onSceneReady);
  const onAssemblyCompleteRef = useRef<(() => void) | undefined>(onAssemblyComplete);
  const interactiveRef = useRef<boolean>(interactive);

  useEffect(() => {
    onSceneReadyRef.current = onSceneReady;
  }, [onSceneReady]);

  useEffect(() => {
    onAssemblyCompleteRef.current = onAssemblyComplete;
  }, [onAssemblyComplete]);

  useEffect(() => {
    interactiveRef.current = interactive;
  }, [interactive]);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    switchProfileRef.current = switchProfile;
  }, [switchProfile]);

  useEffect(() => {
    setIsDarkTheme(document.documentElement.classList.contains('dark'));
  }, []);

  // Synthesized Web Audio mechanical switch profiles (Thock / Tactile / Clicky + Rotary Detent)
  const playMechanicalSound = useCallback(
    (type: 'down' | 'up' | 'detent', pitch = 1.0) => {
      if (!soundEnabledRef.current) return;
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const now = ctx.currentTime;
        const profile = switchProfileRef.current;

        if (type === 'detent') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(1320, now);
          osc.frequency.exponentialRampToValueAtTime(340, now + 0.022);
          gain.gain.setValueAtTime(0.14, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.026);
          return;
        }

        const isDown = type === 'down';

        // Transient click burst
        const noiseLen = Math.floor(ctx.sampleRate * (isDown ? 0.02 : 0.014));
        const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
        const data = noiseBuf.getChannelData(0);
        for (let i = 0; i < noiseLen; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noiseLen * 0.28));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuf;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        const baseFreq =
          profile === 'thock' ? 1150 : profile === 'tactile' ? 1850 : 2850;
        filter.frequency.setValueAtTime(baseFreq * pitch * (isDown ? 1 : 1.18), now);
        filter.Q.value = profile === 'clicky' ? 4.2 : 2.1;

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(isDown ? 0.16 : 0.08, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + (isDown ? 0.022 : 0.015));

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(now);

        // Housing body resonance ("Thock" vs "Holy Panda" vs "Jade Click")
        const bodyOsc = ctx.createOscillator();
        const bodyGain = ctx.createGain();
        bodyOsc.type = profile === 'clicky' ? 'triangle' : 'sine';
        const startHz =
          profile === 'thock' ? 210 : profile === 'tactile' ? 320 : 540;
        const endHz =
          profile === 'thock' ? 78 : profile === 'tactile' ? 115 : 190;

        bodyOsc.frequency.setValueAtTime(startHz * pitch * (isDown ? 1 : 1.2), now);
        bodyOsc.frequency.exponentialRampToValueAtTime(endHz * pitch, now + (isDown ? 0.05 : 0.032));

        bodyGain.gain.setValueAtTime(isDown ? 0.2 : 0.09, now);
        bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + (isDown ? 0.052 : 0.034));

        bodyOsc.connect(bodyGain);
        bodyGain.connect(ctx.destination);
        bodyOsc.start(now);
        bodyOsc.stop(now + (isDown ? 0.055 : 0.036));
      } catch {
        // Ignore restricted audio context errors
      }
    },
    []
  );

  const handleKeyTrigger = useCallback(
    (spec: ArtisanKeySpec) => {
      onSelectKey?.(spec);
      setLastPressedKey(spec.id);

      if (spec.id === 'contact') {
        try {
          navigator.clipboard?.writeText('sendotjiamis9898@gmail.com');
        } catch {
          // Ignore clipboard permission errors
        }
        const ctaEl = document.getElementById('about');
        ctaEl?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      const target = document.getElementById(spec.targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [onSelectKey]
  );

  const cycleSwitchProfile = useCallback(() => {
    rotateKnobRef.current?.();
  }, []);

  const toggleTheme = useCallback(() => {
    const nextDark = !document.documentElement.classList.contains('dark');
    setIsDarkTheme(nextDark);
    document.documentElement.classList.toggle('dark', nextDark);
    document.documentElement.classList.toggle('light', !nextDark);
    try {
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    } catch {
      // Ignore storage errors
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isDark = () => document.documentElement.classList.contains('dark');
    const initialSwitchAttr = document.documentElement.dataset.switchTheme as
      | SwitchProfileId
      | undefined;
    const initialSwitchSpec =
      SWITCH_PROFILES.find((p) => p.id === initialSwitchAttr) || SWITCH_PROFILES[0];
    switchProfileRef.current = initialSwitchSpec.id;
    setSwitchProfile(initialSwitchSpec.id);

    // 1. Isometric Orthographic Studio Scene (Lower 48-degree studio angle to showcase vertical key travel)
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-4, 4, 4, -4, 0.1, 60);
    camera.position.set(0.85, 8.0, 7.6);
    camera.lookAt(0, -0.06, 0.06);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const mainEnv = buildStudioEnvironment(renderer);
    scene.environment = mainEnv;

    const disposables: Array<{ dispose: () => void }> = [mainEnv];
    const pendingTimers: number[] = [];

    // 2. Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xfffaf2, 0xc7c2ba, isDark() ? 0.8 : 0.88);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffdf9, isDark() ? 1.6 : 1.5);
    keyLight.position.set(5.4, 11.8, 6.4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 28;
    const d = 5.6;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffd7c2, isDark() ? 1.2 : 0.8);
    rimLight.position.set(-6.0, 5.5, -4.8);
    scene.add(rimLight);

    const accentPointLight = new THREE.PointLight(initialSwitchSpec.ledHex, 0.9, 8.5, 2.0);
    accentPointLight.position.set(0.0, 1.5, 1.4);
    scene.add(accentPointLight);

    // 3. Ground Contact Shadow (Scaled to match 2-row landscape chassis)
    const shadowTex = createGroundShadowTexture();
    disposables.push(shadowTex);
    const shadowPlaneGeo = new THREE.PlaneGeometry(8.2, 5.8);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: isDark() ? 0.48 : 0.24,
      depthWrite: false,
    });
    disposables.push(shadowPlaneGeo, shadowPlaneMat);
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.set(0.08, -0.76, 0.08);
    scene.add(shadowPlane);

    // 4. Stationary Keyboard Rig
    const rigGroup = new THREE.Group();
    const recoilGroup = new THREE.Group();
    const chassisGroup = new THREE.Group();
    rigGroup.add(recoilGroup);
    recoilGroup.add(chassisGroup);
    scene.add(rigGroup);

    rigGroup.rotation.set(0.11, -0.05, -0.008);

    // 5. Japanese Artisan Materials (GMK Sumi & Shu-iro)
    const aluminumMat = new THREE.MeshPhysicalMaterial({
      color: isDark() ? 0x191a20 : 0xf0f2f5,
      roughness: isDark() ? 0.28 : 0.24,
      metalness: isDark() ? 0.82 : 0.58,
      clearcoat: 0.2,
      clearcoatRoughness: 0.28,
      envMapIntensity: 1.2,
    });

    const brassMat = new THREE.MeshPhysicalMaterial({
      color: 0xc89d54,
      roughness: 0.22,
      metalness: 0.92,
      clearcoat: 0.3,
      clearcoatRoughness: 0.18,
      envMapIntensity: 1.6,
    });

    const cavityMat = new THREE.MeshStandardMaterial({
      color: isDark() ? 0x0d0e12 : 0x22232a,
      roughness: 0.72,
      metalness: 0.25,
    });

    const ledBarMat = new THREE.MeshStandardMaterial({
      color: initialSwitchSpec.ledHex,
      emissive: initialSwitchSpec.ledHex,
      emissiveIntensity: 0.95,
      roughness: 0.2,
    });

    disposables.push(aluminumMat, brassMat, cavityMat, ledBarMat);

    // 6. Custom Landscape SENDO-06 Chassis (6.14 wide x 3.96 deep, centered around z = 0.0)
    const chassisW = 6.14;
    const chassisD = 3.96;
    const centerZ = 0.0;
    const deckZ = -1.18;
    const keyDepth = 0.98;

    // Lower Brushed Brass Weight Plate
    const brassBaseGeo = createRoundedBoxGeometry(
      chassisW - 0.18,
      0.16,
      chassisD - 0.18,
      0.34,
      0.03,
      0.03
    );
    disposables.push(brassBaseGeo);
    const brassBaseMesh = new THREE.Mesh(brassBaseGeo, brassMat);
    brassBaseMesh.position.set(0, -0.52, centerZ);
    brassBaseMesh.castShadow = true;
    chassisGroup.add(brassBaseMesh);

    // Main Chamfered Aluminum Body
    const baseBodyGeo = createRoundedBoxGeometry(chassisW, 0.56, chassisD, 0.38, 0.06, 0.055);
    disposables.push(baseBodyGeo);
    const baseBodyMesh = new THREE.Mesh(baseBodyGeo, aluminumMat);
    baseBodyMesh.position.set(0, -0.24, centerZ);
    baseBodyMesh.castShadow = true;
    baseBodyMesh.receiveShadow = true;
    chassisGroup.add(baseBodyMesh);

    // Top Bezel Frame with Cutouts for each Proportional Key Well
    const bezelShape = createRoundedRectShape(chassisW - 0.14, chassisD - 0.14, 0.32, 0, centerZ);

    ARTISAN_KEYS.forEach((k) => {
      bezelShape.holes.push(
        createRoundedRectShape(k.width + 0.07, keyDepth + 0.08, 0.13, k.x, k.z)
      );
    });

    const bezelGeo = new THREE.ExtrudeGeometry(bezelShape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
      curveSegments: 12,
    });
    bezelGeo.center();
    bezelGeo.rotateX(Math.PI / 2);
    bezelGeo.computeVertexNormals();
    disposables.push(bezelGeo);

    const bezelMesh = new THREE.Mesh(bezelGeo, aluminumMat);
    bezelMesh.position.set(0, 0.1, centerZ);
    bezelMesh.castShadow = true;
    bezelMesh.receiveShadow = true;
    chassisGroup.add(bezelMesh);

    // Inner Brushed Brass Switch Plate (visible between keycaps and during deep press)
    const switchPlateGeo = new THREE.BoxGeometry(chassisW - 0.38, 0.05, chassisD - 0.38);
    disposables.push(switchPlateGeo);
    const switchPlateMesh = new THREE.Mesh(switchPlateGeo, brassMat);
    switchPlateMesh.position.set(0, -0.02, centerZ);
    switchPlateMesh.receiveShadow = true;
    chassisGroup.add(switchPlateMesh);

    // Front Torii Accent LED Strip
    const ledGeo = createRoundedBoxGeometry(1.65, 0.045, 0.06, 0.015, 0.008, 0.008);
    disposables.push(ledGeo);
    const ledMesh = new THREE.Mesh(ledGeo, ledBarMat);
    ledMesh.position.set(0, -0.16, centerZ + chassisD / 2 + 0.005);
    chassisGroup.add(ledMesh);

    // 7. Raised Top-Left English Nameplate Badge (x = -0.69, z = deckZ, width = 4.08)
    const nameplateW = 4.08;
    const nameplateD = 0.82;
    const nameplateX = -0.69;
    const nameplatePadGeo = createRoundedBoxGeometry(
      nameplateW,
      0.16,
      nameplateD,
      0.12,
      0.02,
      0.02
    );
    disposables.push(nameplatePadGeo);
    const nameplatePadMesh = new THREE.Mesh(nameplatePadGeo, brassMat);
    nameplatePadMesh.position.set(nameplateX, 0.24, deckZ);
    nameplatePadMesh.castShadow = true;
    chassisGroup.add(nameplatePadMesh);

    const nameplateTex = createNameplateTexture(isDark(), switchProfileRef.current);
    disposables.push(nameplateTex);
    const nameplateGeo = new THREE.PlaneGeometry(nameplateW - 0.12, nameplateD - 0.08);
    const nameplateMat = new THREE.MeshBasicMaterial({
      map: nameplateTex,
      toneMapped: false,
    });
    disposables.push(nameplateGeo, nameplateMat);
    const nameplateMesh = new THREE.Mesh(nameplateGeo, nameplateMat);
    nameplateMesh.rotation.x = -Math.PI / 2;
    nameplateMesh.position.set(nameplateX, 0.325, deckZ);
    chassisGroup.add(nameplateMesh);

    // 8. Interactive CNC Knurled Brass Rotary Encoder Knob (Top-Right: x = 2.15, z = deckZ)
    const knobX = 2.15;
    const knobWellGeo = new THREE.CylinderGeometry(0.56, 0.56, 0.06, 36);
    disposables.push(knobWellGeo);
    const knobWellMesh = new THREE.Mesh(knobWellGeo, cavityMat);
    knobWellMesh.position.set(knobX, 0.2, deckZ);
    chassisGroup.add(knobWellMesh);

    const knobGroup = new THREE.Group();
    knobGroup.position.set(knobX, 0.22, deckZ);
    chassisGroup.add(knobGroup);

    const knobBodyGeo = new THREE.CylinderGeometry(0.45, 0.47, 0.36, 36);
    const knobTopGeo = new THREE.CylinderGeometry(0.4, 0.45, 0.06, 36);
    disposables.push(knobBodyGeo, knobTopGeo);

    const knobBodyMesh = new THREE.Mesh(knobBodyGeo, brassMat);
    knobBodyMesh.position.y = 0.18;
    knobBodyMesh.castShadow = true;
    knobBodyMesh.receiveShadow = true;
    knobBodyMesh.userData = { isRotaryKnob: true };
    knobGroup.add(knobBodyMesh);

    const knobTopMesh = new THREE.Mesh(knobTopGeo, brassMat);
    knobTopMesh.position.y = 0.39;
    knobTopMesh.castShadow = true;
    knobTopMesh.userData = { isRotaryKnob: true };
    knobGroup.add(knobTopMesh);

    // 18 CNC Knurled Grip Ridges around the Brass Knob
    const ridgeGeo = new THREE.BoxGeometry(0.032, 0.32, 0.045);
    disposables.push(ridgeGeo);
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const ridge = new THREE.Mesh(ridgeGeo, brassMat);
      ridge.position.set(Math.cos(angle) * 0.455, 0.17, Math.sin(angle) * 0.455);
      ridge.rotation.y = -angle;
      ridge.userData = { isRotaryKnob: true };
      knobGroup.add(ridge);
    }

    // Rotary Knob Indicator Marker
    const markerGeo = new THREE.BoxGeometry(0.06, 0.025, 0.22);
    const markerMat = new THREE.MeshBasicMaterial({
      color: initialSwitchSpec.ledHex,
      toneMapped: false,
    });
    disposables.push(markerGeo, markerMat);
    const markerMesh = new THREE.Mesh(markerGeo, markerMat);
    markerMesh.position.set(0, 0.425, -0.14);
    markerMesh.userData = { isRotaryKnob: true };
    knobGroup.add(markerMesh);

    // 9. Build the 6 Proportional Sculpted Keycaps & Mechanical Switch Housings
    const sharedHousingGeo = createRoundedBoxGeometry(0.68, 0.11, 0.48, 0.07, 0.015, 0.015);
    const sharedStemGeo = createRoundedBoxGeometry(0.34, 0.24, 0.28, 0.05, 0.012, 0.012);
    disposables.push(sharedHousingGeo, sharedStemGeo);

    interface KeyEntity {
      spec: ArtisanKeySpec;
      group: THREE.Group;
      hitMeshes: THREE.Object3D[];
      bodyMat: THREE.MeshPhysicalMaterial;
      wellGlowMat: THREE.MeshBasicMaterial;
      sakuraLight?: THREE.PointLight;
      positionY: number;
      velocityY: number;
      targetY: number;
      hoverMix: number;
      pressMix: number;
      hovered: boolean;
      pointerDown: boolean;
      tapHoldUntil: number;
      assemblyHoldMs: number;
      assemblyState: 'waiting' | 'dropping' | 'rebounding' | 'done';
      assemblyStartMs: number;
      assemblyScale: number;
      initialTiltX: number;
      initialTiltZ: number;
    }

    const keyEntities = new Map<MacropadKeyId, KeyEntity>();
    const hitTargets: THREE.Object3D[] = [knobBodyMesh, knobTopMesh];
    const skipAssembly = Boolean(
      skipAssemblyProp || reduceMotionQuery.matches || hasMacropadAssembled()
    );
    const ASSEMBLY_DROP_Y = 1.18;
    const KNOB_DROP_Y = 0.95;

    ARTISAN_KEYS.forEach((spec, idx) => {
      // Static switch housing & LED ring mounted on the switch plate inside each well
      const wellSwitchMesh = new THREE.Mesh(sharedHousingGeo, cavityMat);
      wellSwitchMesh.position.set(spec.x, 0.04, spec.z);
      chassisGroup.add(wellSwitchMesh);

      // Perimeter LED ring inside the switch well (never intersects the top keycap dish)
      const wellRingShape = createRoundedRectShape(spec.width + 0.06, keyDepth + 0.06, 0.13);
      wellRingShape.holes.push(createRoundedRectShape(spec.width - 0.16, keyDepth - 0.16, 0.08));
      const wellGlowGeo = new THREE.ShapeGeometry(wellRingShape, 12);
      const wellGlowMat = new THREE.MeshBasicMaterial({
        color: initialSwitchSpec.ledHex,
        transparent: true,
        opacity: 0.0,
        toneMapped: false,
        depthWrite: false,
      });
      disposables.push(wellGlowGeo, wellGlowMat);
      const wellGlowMesh = new THREE.Mesh(wellGlowGeo, wellGlowMat);
      wellGlowMesh.rotation.x = -Math.PI / 2;
      wellGlowMesh.position.set(spec.x, 0.07, spec.z);
      chassisGroup.add(wellGlowMesh);

      // Moving keycap assembly
      const keyGroup = new THREE.Group();
      keyGroup.position.set(spec.x, 0.08, spec.z);
      chassisGroup.add(keyGroup);

      const stemMesh = new THREE.Mesh(sharedStemGeo, brassMat);
      stemMesh.position.y = 0.14;
      keyGroup.add(stemMesh);

      // Custom sculpted keycap geometry for this key's exact proportional width
      const keyGeoParts = createSculptedKeycapGeometry(spec.width, keyDepth, 0.48);
      const mergedKeyGeo = mergeGeometries(
        [keyGeoParts.body.clone(), keyGeoParts.top.clone()],
        false
      );
      mergedKeyGeo.computeVertexNormals();

      const planeW = spec.width - 0.26;
      const planeD = 0.8;
      const legendPlaneGeo = new THREE.PlaneGeometry(planeW, planeD);
      const legendTex = createProportionalKeyLegendTexture(spec, planeW, planeD);
      disposables.push(
        keyGeoParts.body,
        keyGeoParts.top,
        mergedKeyGeo,
        legendPlaneGeo,
        legendTex
      );

      const hitMeshes: THREE.Object3D[] = [];
      let bodyMat: THREE.MeshPhysicalMaterial;
      let sakuraLight: THREE.PointLight | undefined;

      if (spec.material === 'sakura') {
        bodyMat = new THREE.MeshPhysicalMaterial({
          color: 0xdffaf6,
          roughness: 0.1,
          metalness: 0.0,
          transmission: 0.92,
          transparent: true,
          opacity: 0.96,
          ior: 1.48,
          thickness: 0.44,
          attenuationColor: new THREE.Color(0x5eead4),
          attenuationDistance: 0.65,
          clearcoat: 1.0,
          clearcoatRoughness: 0.06,
          envMapIntensity: 1.5,
          emissive: new THREE.Color(0x14b8a6),
          emissiveIntensity: 0.0,
        });

        // Attach to chassisGroup so NUM_POINT_LIGHTS stays constant from Frame 1 onwards
        sakuraLight = new THREE.PointLight(0x14b8a6, skipAssembly ? 0.55 : 0, 1.8, 2.0);
        sakuraLight.position.set(spec.x, 0.09 + 0.2, spec.z);
        chassisGroup.add(sakuraLight);
      } else {
        const baseHex =
          spec.material === 'sumi'
            ? 0x1b1c22
            : spec.material === 'shuiro'
              ? initialSwitchSpec.ledHex
              : isDark()
                ? 0xf5f5f7
                : 0xffffff;

        bodyMat = new THREE.MeshPhysicalMaterial({
          color: baseHex,
          roughness: 0.34,
          metalness: 0.04,
          clearcoat: 0.22,
          clearcoatRoughness: 0.22,
          envMapIntensity: 0.98,
          emissive: new THREE.Color(
            spec.material === 'shuiro' ? initialSwitchSpec.ledHex : 0xd9381e
          ),
          emissiveIntensity: 0.0,
        });
      }

      const capMesh = new THREE.Mesh(mergedKeyGeo, bodyMat);
      capMesh.castShadow = true;
      capMesh.receiveShadow = true;
      capMesh.userData = { keyId: spec.id };
      keyGroup.add(capMesh);
      hitMeshes.push(capMesh);

      // Un-tonemapped high-contrast proportional English Legend Plane on keycap dish
      const legendMat = new THREE.MeshBasicMaterial({
        map: legendTex,
        transparent: true,
        toneMapped: false,
        depthWrite: false,
      });
      disposables.push(legendMat);
      const legendMesh = new THREE.Mesh(legendPlaneGeo, legendMat);
      legendMesh.rotation.x = -Math.PI / 2;
      legendMesh.position.y = 0.483;
      legendMesh.userData = { keyId: spec.id };
      keyGroup.add(legendMesh);
      hitMeshes.push(legendMesh);

      disposables.push(bodyMat);
      hitTargets.push(...hitMeshes);

      const startY = skipAssembly ? 0 : ASSEMBLY_DROP_Y;
      const startScale = skipAssembly ? 1 : 0.92;
      keyGroup.position.y = 0.09 + startY;
      keyGroup.scale.setScalar(startScale);
      keyGroup.visible = skipAssembly;

      keyEntities.set(spec.id, {
        spec,
        group: keyGroup,
        hitMeshes,
        bodyMat,
        wellGlowMat,
        sakuraLight,
        positionY: startY,
        velocityY: 0,
        targetY: 0,
        hoverMix: 0,
        pressMix: 0,
        hovered: false,
        pointerDown: false,
        tapHoldUntil: 0,
        assemblyHoldMs: 0,
        assemblyState: skipAssembly ? 'done' : 'waiting',
        assemblyStartMs: 130 + idx * 95,
        assemblyScale: startScale,
        initialTiltX: (idx % 2 === 0 ? 1 : -1) * 0.14,
        initialTiltZ: (idx < 3 ? -1 : 1) * 0.08,
      });
    });

    // 10. 240Hz Key Spring & Deep Mechanical Actuation Physics
    // Deep 4.0mm bottom-out travel (-0.36 units flush into the bezel well) + tactile tilt + well LED flash
    const PRESS_TRAVEL_Y = -0.36;
    const REST_BASE_Y = 0.09;

    const chassisPhysics = {
      lift: skipAssembly ? 0 : -0.42,
      liftVel: skipAssembly ? 0 : 1.8,
      pitch: skipAssembly ? 0 : 0.14,
      pitchVel: 0,
      roll: skipAssembly ? 0 : -0.05,
      rollVel: 0,
    };

    const knobPhysics = {
      angle: skipAssembly ? 0 : Math.PI * 0.75,
      targetAngle: 0,
      vel: 0,
      hovered: false,
      yOffset: skipAssembly ? 0 : KNOB_DROP_Y,
      yVel: 0,
      scale: skipAssembly ? 1 : 0.92,
      assemblyState: (skipAssembly ? 'done' : 'waiting') as
        | 'waiting'
        | 'dropping'
        | 'rebounding'
        | 'done',
      assemblyStartMs: 60,
    };

    if (!skipAssembly) {
      knobGroup.position.y = 0.22 + knobPhysics.yOffset;
      knobGroup.rotation.y = knobPhysics.angle;
      knobGroup.scale.setScalar(knobPhysics.scale);
      knobGroup.visible = false;
    }

    let sceneReadyFired = false;
    let assemblyCompleteFired = false;
    let simTimeMs = 0;

    const RIG_BASE_ROT_X = 0.11;
    const RIG_BASE_ROT_Y = -0.05;
    const RIG_BASE_ROT_Z = -0.008;

    const cursorParallax = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
    };

    const pointerState = {
      activeKeyId: null as MacropadKeyId | null,
      downX: 0,
      downY: 0,
    };

    function applyChassisImpulse(x: number, z: number, force = 1) {
      if (reduceMotionQuery.matches) return;
      chassisPhysics.liftVel -= 0.032 * force;
      chassisPhysics.pitchVel += z * 0.018 * force;
      chassisPhysics.rollVel -= x * 0.015 * force;
    }

    function stepPhysics(dt: number, nowMs: number) {
      const stepMs = dt * 1000;
      simTimeMs += stepMs;

      keyEntities.forEach((entity) => {
        if (entity.assemblyState === 'waiting') {
          if (simTimeMs >= entity.assemblyStartMs) {
            entity.assemblyState = 'dropping';
            entity.group.visible = true;
            entity.velocityY = -2.2;
            entity.targetY = PRESS_TRAVEL_Y;
          } else {
            return;
          }
        }

        const isPressed = entity.pointerDown || nowMs < entity.tapHoldUntil;
        if (entity.assemblyState === 'dropping') {
          entity.targetY = PRESS_TRAVEL_Y;
          entity.assemblyScale = Math.min(1, entity.assemblyScale + dt * 6.4);
        } else if (entity.assemblyState === 'rebounding') {
          entity.assemblyScale = 1;
          if (entity.assemblyHoldMs > 0) {
            entity.assemblyHoldMs = Math.max(0, entity.assemblyHoldMs - stepMs);
            entity.targetY = PRESS_TRAVEL_Y;
          } else {
            entity.targetY = 0;
          }
        } else {
          entity.targetY = isPressed ? PRESS_TRAVEL_Y : entity.hovered ? 0.028 : 0;
          entity.assemblyScale = 1;
        }

        if (entity.assemblyState === 'dropping' && entity.positionY > 0) {
          // Phase A: Pure gravity free-fall above switch stem (206.6ms -> overlapping cascade)
          entity.velocityY += -34 * dt;
          entity.positionY += entity.velocityY * dt;
        } else {
          // Phase B/C: Snappy mechanical switch spring once stem is engaged
          const force = (entity.targetY - entity.positionY) * 680;
          const damp = -entity.velocityY * 26;
          entity.velocityY += (force + damp) * dt;
          entity.positionY += entity.velocityY * dt;
        }

        if (
          entity.assemblyState === 'dropping' &&
          entity.positionY <= PRESS_TRAVEL_Y + 0.06
        ) {
          entity.assemblyState = 'rebounding';
          entity.assemblyHoldMs = 85;
          entity.pressMix = 1.0;
          applyChassisImpulse(entity.spec.x, entity.spec.z, 1.15);
        } else if (
          entity.assemblyState === 'rebounding' &&
          entity.assemblyHoldMs <= 0 &&
          Math.abs(entity.positionY) <= 0.008 &&
          Math.abs(entity.velocityY) <= 0.04
        ) {
          entity.assemblyState = 'done';
        }

        // Clamp bottom-out against brass switch plate
        if (entity.positionY < PRESS_TRAVEL_Y - 0.04) {
          entity.positionY = PRESS_TRAVEL_Y - 0.04;
          entity.velocityY = Math.max(0, entity.velocityY);
        }

        const pressRatio = Math.max(0, Math.min(1, -entity.positionY / Math.abs(PRESS_TRAVEL_Y)));
        const airFactor =
          entity.assemblyState === 'dropping'
            ? Math.max(0, Math.min(1, entity.positionY / ASSEMBLY_DROP_Y))
            : 0;
        entity.group.position.y = REST_BASE_Y + entity.positionY;
        // Shift slightly down-screen (+z) and compress height so orthographic camera clearly shows the key sunk into the well
        entity.group.position.z = entity.spec.z + pressRatio * 0.085;
        entity.group.rotation.x = -pressRatio * 0.05 + airFactor * entity.initialTiltX;
        entity.group.rotation.z = airFactor * entity.initialTiltZ;
        const s = entity.assemblyScale;
        entity.group.scale.set(
          s * (1 - pressRatio * 0.025),
          s * (1 - pressRatio * 0.18),
          s * (1 - pressRatio * 0.025)
        );

        const isHoldingBottom = isPressed || entity.assemblyHoldMs > 0;
        const targetHover = entity.hovered || isHoldingBottom ? 1 : 0;
        entity.hoverMix += (targetHover - entity.hoverMix) * Math.min(1, dt * 16);

        const targetPress = isHoldingBottom ? 1 : pressRatio;
        entity.pressMix += (targetPress - entity.pressMix) * Math.min(1, dt * 26);

        // Perimeter well LED ring flash + subtle keycap rim illumination
        entity.wellGlowMat.opacity = entity.pressMix * 0.95 + entity.hoverMix * 0.18;
        entity.bodyMat.emissiveIntensity = entity.pressMix * 0.15;

        if (entity.sakuraLight) {
          entity.sakuraLight.position.y = REST_BASE_Y + entity.positionY + 0.2;
          entity.sakuraLight.intensity = 0.55 + entity.hoverMix * 0.55 + entity.pressMix * 1.1;
        }
      });

      // Rotary Knob spring
      if (reduceMotionQuery.matches) {
        knobPhysics.angle = knobPhysics.targetAngle;
        knobPhysics.vel = 0;
        knobPhysics.yOffset = 0;
        knobPhysics.yVel = 0;
        knobPhysics.scale = 1;
        knobPhysics.assemblyState = 'done';
        knobGroup.visible = true;
      } else {
        if (knobPhysics.assemblyState === 'waiting') {
          if (simTimeMs >= knobPhysics.assemblyStartMs) {
            knobPhysics.assemblyState = 'dropping';
            knobPhysics.yVel = -1.8;
            knobGroup.visible = true;
          }
        }
        if (knobPhysics.assemblyState !== 'waiting') {
          knobPhysics.scale = Math.min(1, knobPhysics.scale + dt * 6.4);
          if (knobPhysics.assemblyState !== 'done') {
            knobPhysics.yVel += -28 * dt;
            knobPhysics.yOffset += knobPhysics.yVel * dt;

            if (knobPhysics.yOffset <= 0) {
              knobPhysics.yOffset = 0;
              if (knobPhysics.assemblyState === 'dropping') {
                knobPhysics.assemblyState = 'rebounding';
                applyChassisImpulse(knobX, deckZ, 0.85);
              }
              if (knobPhysics.yVel < -0.25) {
                knobPhysics.yVel = -knobPhysics.yVel * 0.38;
              } else {
                knobPhysics.yVel = 0;
              }
            }
          }

          const kForce = (knobPhysics.targetAngle - knobPhysics.angle) * 320;
          const kDamp = -knobPhysics.vel * 22;
          knobPhysics.vel += (kForce + kDamp) * dt;
          knobPhysics.angle += knobPhysics.vel * dt;

          if (
            knobPhysics.assemblyState === 'rebounding' &&
            knobPhysics.yOffset <= 0.004 &&
            Math.abs(knobPhysics.yVel) <= 0.02 &&
            Math.abs(knobPhysics.angle - knobPhysics.targetAngle) <= 0.01 &&
            Math.abs(knobPhysics.vel) <= 0.02
          ) {
            knobPhysics.yOffset = 0;
            knobPhysics.yVel = 0;
            knobPhysics.assemblyState = 'done';
          }
        }
      }
      knobGroup.rotation.y = knobPhysics.angle;
      knobGroup.position.y = 0.22 + knobPhysics.yOffset + (knobPhysics.hovered ? 0.015 : 0);
      knobGroup.scale.setScalar(knobPhysics.scale);

      // Subtle press recoil on chassis
      if (reduceMotionQuery.matches) {
        chassisPhysics.lift = 0;
        chassisPhysics.pitch = 0;
        chassisPhysics.roll = 0;
        cursorParallax.currentX = 0;
        cursorParallax.currentY = 0;
      } else {
        chassisPhysics.liftVel += (-chassisPhysics.lift * 280 - chassisPhysics.liftVel * 22) * dt;
        chassisPhysics.lift += chassisPhysics.liftVel * dt;

        chassisPhysics.pitchVel += (-chassisPhysics.pitch * 240 - chassisPhysics.pitchVel * 20) * dt;
        chassisPhysics.pitch += chassisPhysics.pitchVel * dt;

        chassisPhysics.rollVel += (-chassisPhysics.roll * 240 - chassisPhysics.rollVel * 20) * dt;
        chassisPhysics.roll += chassisPhysics.rollVel * dt;

        const parallaxFollow = Math.min(1, dt * 8);
        cursorParallax.currentX += (cursorParallax.targetX - cursorParallax.currentX) * parallaxFollow;
        cursorParallax.currentY += (cursorParallax.targetY - cursorParallax.currentY) * parallaxFollow;
      }
    }

    // 11. Demand-Driven Render Loop
    let rafId = 0;
    let lastTime = performance.now();
    let physicsAccum = 0;

    function wakeLoop() {
      if (!rafId) {
        lastTime = performance.now();
        container?.setAttribute('data-rendering', 'active');
        rafId = requestAnimationFrame(tick);
      }
    }

    function tick(now: number) {
      rafId = 0;
      if (sceneReadyFired) {
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;

        physicsAccum = Math.min(physicsAccum + dt, 0.08);
        const step = 1 / 240;
        while (physicsAccum >= step) {
          stepPhysics(step, now);
          physicsAccum -= step;
        }
      } else if (!skipAssembly) {
        // Warmup pass: compile all MeshPhysicalMaterial shaders, allocate transmission FBO, and upload CanvasTextures
        keyEntities.forEach((e) => {
          e.group.visible = true;
          e.group.scale.setScalar(0.0001);
        });
        knobGroup.visible = true;
        knobGroup.scale.setScalar(0.0001);
        renderer.compile(scene, camera);
        renderer.render(scene, camera);
        keyEntities.forEach((e) => {
          e.group.visible = false;
          e.group.scale.setScalar(e.assemblyScale);
        });
        knobGroup.visible = false;
        knobGroup.scale.setScalar(knobPhysics.scale);
      }

      rigGroup.rotation.x = RIG_BASE_ROT_X + cursorParallax.currentY * 0.065;
      rigGroup.rotation.y = RIG_BASE_ROT_Y + cursorParallax.currentX * 0.095;
      rigGroup.rotation.z = RIG_BASE_ROT_Z - cursorParallax.currentX * 0.015;
      rigGroup.position.x = cursorParallax.currentX * 0.08;
      rigGroup.position.y = -cursorParallax.currentY * 0.05;
      shadowPlane.position.x = 0.08 + cursorParallax.currentX * 0.08;

      recoilGroup.position.y = chassisPhysics.lift;
      recoilGroup.rotation.x = chassisPhysics.pitch;
      recoilGroup.rotation.y = 0;
      recoilGroup.rotation.z = chassisPhysics.roll;

      renderer.render(scene, camera);

      if (!sceneReadyFired) {
        sceneReadyFired = true;
        lastTime = performance.now();
        physicsAccum = 0;
        onSceneReadyRef.current?.();
        if (skipAssembly) {
          assemblyCompleteFired = true;
          markMacropadAssembled();
          onAssemblyCompleteRef.current?.();
        } else {
          wakeLoop();
        }
        return;
      }

      let allKeysAssembled = knobPhysics.assemblyState === 'done';
      let active = false;
      keyEntities.forEach((e) => {
        if (e.assemblyState !== 'done') {
          allKeysAssembled = false;
          active = true;
        }
        if (
          e.pointerDown ||
          now < e.tapHoldUntil ||
          e.assemblyHoldMs > 0 ||
          Math.abs(e.positionY - e.targetY) > 0.0005 ||
          Math.abs(e.velocityY) > 0.002 ||
          e.pressMix > 0.01
        ) {
          active = true;
        }
      });

      if (!assemblyCompleteFired && allKeysAssembled) {
        assemblyCompleteFired = true;
        markMacropadAssembled();
        onAssemblyCompleteRef.current?.();
      }

      const chassisMoving =
        Math.abs(chassisPhysics.lift) > 0.0004 ||
        Math.abs(chassisPhysics.liftVel) > 0.002 ||
        Math.abs(chassisPhysics.pitch) > 0.0004 ||
        Math.abs(chassisPhysics.pitchVel) > 0.002 ||
        Math.abs(chassisPhysics.roll) > 0.0004 ||
        Math.abs(chassisPhysics.rollVel) > 0.002 ||
        Math.abs(knobPhysics.yOffset) > 0.0005 ||
        Math.abs(knobPhysics.yVel) > 0.002 ||
        Math.abs(knobPhysics.angle - knobPhysics.targetAngle) > 0.001 ||
        Math.abs(knobPhysics.vel) > 0.002 ||
        Math.abs(cursorParallax.currentX - cursorParallax.targetX) > 0.0008 ||
        Math.abs(cursorParallax.currentY - cursorParallax.targetY) > 0.0008;

      if (active || chassisMoving || !assemblyCompleteFired) {
        wakeLoop();
      } else {
        container?.setAttribute('data-rendering', 'idle');
      }
    }

    // 12. Programmatic Key Tap & Rotary Turn Imperative Hooks
    tapKeyRef.current = (id: MacropadKeyId, triggerAction = false) => {
      if (!assemblyCompleteFired || !interactiveRef.current) return;
      const entity = keyEntities.get(id);
      if (!entity) return;
      entity.tapHoldUntil = performance.now() + 260;
      entity.velocityY = -4.2;
      applyChassisImpulse(entity.spec.x, entity.spec.z, 1.25);
      playMechanicalSound('down', entity.spec.pitch);

      const upTimer = window.setTimeout(() => {
        playMechanicalSound('up', entity.spec.pitch * 1.06);
      }, 190);
      pendingTimers.push(upTimer);

      if (triggerAction) {
        const navTimer = window.setTimeout(() => {
          handleKeyTrigger(entity.spec);
        }, 220);
        pendingTimers.push(navTimer);
      }
      wakeLoop();
    };

    rotateKnobRef.current = () => {
      if (!assemblyCompleteFired || !interactiveRef.current) return;
      knobPhysics.targetAngle -= Math.PI / 3;
      applyChassisImpulse(knobX, deckZ, 0.7);
      playMechanicalSound('detent', 1.0);

      const currentIdx = SWITCH_PROFILES.findIndex((p) => p.id === switchProfileRef.current);
      const nextSpec = SWITCH_PROFILES[(currentIdx + 1) % SWITCH_PROFILES.length];
      switchProfileRef.current = nextSpec.id;
      setSwitchProfile(nextSpec.id);
      document.documentElement.dataset.switchTheme = nextSpec.id;
      try {
        localStorage.setItem('switchProfile', nextSpec.id);
      } catch {
        // Ignore storage errors
      }

      ledBarMat.color.setHex(nextSpec.ledHex);
      ledBarMat.emissive.setHex(nextSpec.ledHex);
      accentPointLight.color.setHex(nextSpec.ledHex);
      markerMat.color.setHex(nextSpec.ledHex);

      keyEntities.forEach((entity) => {
        entity.wellGlowMat.color.setHex(nextSpec.ledHex);
        if (entity.spec.material === 'shuiro') {
          entity.bodyMat.color.setHex(nextSpec.ledHex);
          entity.bodyMat.emissive.setHex(nextSpec.ledHex);
        }
      });

      const nextPlateTex = createNameplateTexture(isDark(), nextSpec.id);
      disposables.push(nextPlateTex);
      nameplateMat.map = nextPlateTex;
      nameplateMat.needsUpdate = true;

      wakeLoop();
    };

    // 13. Raycasting & Pointer Events (Guaranteed 220ms mechanical bottom-out on click/tap)
    const raycaster = new THREE.Raycaster();
    const pointerVec = new THREE.Vector2();

    function raycastScene(e: PointerEvent): { keyId?: MacropadKeyId; isKnob?: boolean } {
      if (!canvas) return {};
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return {};
      pointerVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerVec.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      raycaster.setFromCamera(pointerVec, camera);
      const hits = raycaster.intersectObjects(hitTargets, false);
      if (hits.length === 0) return {};
      const hitObj = hits[0].object;
      if (hitObj.userData?.isRotaryKnob) {
        return { isKnob: true };
      }
      return { keyId: hitObj.userData?.keyId as MacropadKeyId | undefined };
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!assemblyCompleteFired || !interactiveRef.current) return;
      const hit = raycastScene(e);
      const prevKnobHover = knobPhysics.hovered;
      knobPhysics.hovered = Boolean(hit.isKnob);
      let changed = prevKnobHover !== knobPhysics.hovered;

      keyEntities.forEach((entity, id) => {
        const nextHover = id === hit.keyId;
        if (entity.hovered !== nextHover) {
          entity.hovered = nextHover;
          changed = true;
        }
      });

      canvas.style.cursor = hit.isKnob || hit.keyId ? 'pointer' : 'default';
      if (changed) wakeLoop();
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!assemblyCompleteFired || !interactiveRef.current) return;
      if (e.button !== 0) return;
      pointerState.downX = e.clientX;
      pointerState.downY = e.clientY;
      const hit = raycastScene(e);

      if (hit.isKnob) {
        rotateKnobRef.current?.();
        return;
      }

      if (hit.keyId) {
        const entity = keyEntities.get(hit.keyId);
        if (entity) {
          pointerState.activeKeyId = hit.keyId;
          entity.pointerDown = true;
          // Lock a 260ms bottom-out hold so fast trackpad taps & clicks complete full travel
          entity.tapHoldUntil = performance.now() + 260;
          entity.velocityY = -4.2;
          applyChassisImpulse(entity.spec.x, entity.spec.z, 1.25);
          playMechanicalSound('down', entity.spec.pitch);
          wakeLoop();
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!pointerState.activeKeyId) return;
      const pressedId = pointerState.activeKeyId;
      const entity = keyEntities.get(pressedId);
      pointerState.activeKeyId = null;

      if (entity) {
        entity.pointerDown = false;
        const remainingHold = Math.max(0, entity.tapHoldUntil - performance.now());

        const upTimer = window.setTimeout(() => {
          applyChassisImpulse(-entity.spec.x * 0.25, -entity.spec.z * 0.25, -0.35);
          playMechanicalSound('up', entity.spec.pitch * 1.06);
          wakeLoop();
        }, Math.min(remainingHold, 180));
        pendingTimers.push(upTimer);

        const dist = Math.hypot(e.clientX - pointerState.downX, e.clientY - pointerState.downY);
        const releaseHit = raycastScene(e);
        if (dist < 18 && (!releaseHit.keyId || releaseHit.keyId === pressedId)) {
          // Sequence smooth scroll right after the keystroke bottoms out & begins rebound
          const navDelay = Math.max(210, remainingHold);
          const navTimer = window.setTimeout(() => {
            handleKeyTrigger(entity.spec);
          }, navDelay);
          pendingTimers.push(navTimer);
        }
      }
      wakeLoop();
    };

    const onPointerLeave = () => {
      knobPhysics.hovered = false;
      keyEntities.forEach((e) => {
        e.hovered = false;
        e.pointerDown = false;
      });
      pointerState.activeKeyId = null;
      canvas.style.cursor = 'default';
      wakeLoop();
    };

    const onWindowPointerMove = (e: PointerEvent) => {
      if (!assemblyCompleteFired || !interactiveRef.current || reduceMotionQuery.matches) return;
      if (e.pointerType && e.pointerType !== 'mouse') return;
      const vw = Math.max(window.innerWidth, 1);
      const vh = Math.max(window.innerHeight, 1);
      cursorParallax.targetX = Math.max(-1, Math.min(1, (e.clientX / vw) * 2 - 1));
      cursorParallax.targetY = Math.max(-1, Math.min(1, (e.clientY / vh) * 2 - 1));
      wakeLoop();
    };

    const onDocumentMouseLeave = () => {
      cursorParallax.targetX = 0;
      cursorParallax.targetY = 0;
      wakeLoop();
    };

    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointermove', onWindowPointerMove, { passive: true });
    document.addEventListener('mouseleave', onDocumentMouseLeave);
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointerleave', onPointerLeave);

    // Physical keyboard hotkeys 1-6 and R for Rotary Knob
    const onKeyDown = (e: KeyboardEvent) => {
      if (!assemblyCompleteFired || !interactiveRef.current) return;
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      ) {
        return;
      }
      if (e.key.toLowerCase() === 'r') {
        rotateKnobRef.current?.();
        return;
      }
      const match = ARTISAN_KEYS.find((k) => k.hotkey === e.key);
      if (match) {
        tapKeyRef.current?.(match.id, true);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // 14. Theme & Resize Observers
    const syncTheme = () => {
      const dark = isDark();
      setIsDarkTheme(dark);
      hemiLight.intensity = dark ? 0.8 : 0.88;
      keyLight.intensity = dark ? 1.6 : 1.5;
      rimLight.intensity = dark ? 1.2 : 0.8;
      shadowPlaneMat.opacity = dark ? 0.48 : 0.24;

      aluminumMat.color.setHex(dark ? 0x191a20 : 0xf0f2f5);
      aluminumMat.roughness = dark ? 0.28 : 0.24;
      aluminumMat.metalness = dark ? 0.82 : 0.58;

      const nextPlateTex = createNameplateTexture(dark, switchProfileRef.current);
      disposables.push(nextPlateTex);
      nameplateMat.map = nextPlateTex;
      nameplateMat.needsUpdate = true;

      keyEntities.forEach((entity) => {
        if (entity.spec.material === 'washi') {
          entity.bodyMat.color.setHex(dark ? 0xf5f5f7 : 0xffffff);
        }
      });

      wakeLoop();
    };

    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const handleResize = () => {
      if (!container) return;
      const w = Math.max(container.clientWidth, 260);
      const h = Math.max(container.clientHeight, 240);
      const aspect = w / h;
      // Fit the 6.14-wide x 3.96-deep 2-row macro bar across any aspect ratio without clipping
      const minHalfW = 3.62;
      const minHalfH = 2.66;
      const viewHalfH = Math.max(minHalfH, minHalfW / aspect);
      camera.left = -viewHalfH * aspect;
      camera.right = viewHalfH * aspect;
      camera.top = viewHalfH;
      camera.bottom = -viewHalfH;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      wakeLoop();
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    wakeLoop();

    return () => {
      pendingTimers.forEach((id) => window.clearTimeout(id));
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointermove', onWindowPointerMove);
      document.removeEventListener('mouseleave', onDocumentMouseLeave);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('keydown', onKeyDown);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, [handleKeyTrigger, playMechanicalSound]);

  const currentSwitch = SWITCH_PROFILES.find((p) => p.id === switchProfile) || SWITCH_PROFILES[0];

  return (
    <div
      className="relative w-full flex flex-col items-center select-none"
      role="region"
      aria-label="SENDO-06 3D Mechanical Macropad"
      data-last-pressed={lastPressedKey ?? undefined}
    >
      {/* Unboxed 3D WebGL Stage */}
      <div
        ref={containerRef}
        className="relative w-full h-[300px] sm:h-[360px] flex items-center justify-center overflow-visible"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block focus:outline-none"
          tabIndex={-1}
        />
      </div>

      {/* Minimal Floating Hardware Controls (Switch Profile + Sound + Theme) */}
      <div
        aria-hidden={!controlsVisible}
        className={`flex items-center justify-center gap-2.5 -mt-1 flex-wrap transition-opacity duration-300 ${
          controlsVisible ? 'opacity-100' : 'opacity-0'
        } ${interactive ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <button
          type="button"
          disabled={!interactive}
          tabIndex={interactive ? 0 : -1}
          onClick={cycleSwitchProfile}
          title="Turn CNC Brass Rotary Knob (Shortcut: R)"
          className="inline-flex items-center gap-1.5 min-h-[44px] h-11 px-4 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-[13px] font-medium text-apple-label border border-[var(--separator)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--shuiro)] transition-colors" aria-hidden="true" />
          <span>Switch: {currentSwitch.name}</span>
        </button>

        <button
          type="button"
          disabled={!interactive}
          tabIndex={interactive ? 0 : -1}
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            soundEnabledRef.current = next;
            if (next) playMechanicalSound('detent', 1.1);
          }}
          aria-pressed={soundEnabled}
          aria-label={soundEnabled ? 'Mute mechanical switch sound' : 'Enable mechanical switch sound'}
          className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-apple-label border border-[var(--separator)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
        >
          {soundEnabled ? (
            <svg aria-hidden="true" className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          ) : (
            <svg aria-hidden="true" className="w-4 h-4 fill-none stroke-current stroke-2 text-apple-secondary" viewBox="0 0 24 24">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="22" y1="9" x2="16" y2="15" />
              <line x1="16" y1="9" x2="22" y2="15" />
            </svg>
          )}
        </button>

        <button
          type="button"
          disabled={!interactive}
          tabIndex={interactive ? 0 : -1}
          onClick={toggleTheme}
          aria-label={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
          className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-apple-label border border-[var(--separator)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-tint"
        >
          {isDarkTheme ? (
            <svg aria-hidden="true" className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            <svg aria-hidden="true" className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
        </button>
      </div>

      {/* Screen-Reader & Keyboard Tab Fallback Navigation */}
      <nav aria-label="3D Macropad Section Navigation" className="sr-only">
        {ARTISAN_KEYS.map((k) => (
          <button
            key={k.id}
            type="button"
            disabled={!interactive}
            tabIndex={interactive ? 0 : -1}
            onClick={() => tapKeyRef.current?.(k.id, true)}
            className="focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:px-3 focus-visible:py-1.5 focus-visible:rounded-lg focus-visible:bg-apple-tint focus-visible:text-white"
          >
            Jump to {k.label} ({k.numeral})
          </button>
        ))}
      </nav>
    </div>
  );
}
