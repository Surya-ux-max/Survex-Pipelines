import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Detect if WebGL is supported by the browser
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

// Custom Shaders to compute waves on the GPU (avoids CPU layout/loop bottlenecks)
const terrainVertexShader = `
  uniform float time;
  varying vec3 vPosition;
  
  void main() {
    vec3 pos = position;
    
    // Construct overlapping sine waves on the GPU for zero CPU latency
    float wave1 = sin(pos.x * 0.4 + time * 1.2) * cos(pos.z * 0.4 + time * 0.8) * 0.75;
    float wave2 = sin(pos.x * 0.8 - time * 0.9) * 0.25;
    float wave3 = sin(pos.z * 0.25 + time * 0.5) * 0.4;
    
    pos.y = wave1 + wave2 + wave3;
    vPosition = pos;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const terrainFragmentShader = `
  uniform vec3 color;
  varying vec3 vPosition;
  
  void main() {
    // Add subtle visual depth gradient based on vertex height
    float heightColor = clamp((vPosition.y + 1.2) / 2.4, 0.0, 1.0);
    vec3 finalColor = mix(color * 0.7, color * 1.3, heightColor);
    
    gl_FragColor = vec4(finalColor, 0.18);
  }
`;

export default function PipelineScene() {
  const containerRef = useRef(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebGlSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const scroll = { y: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scroll.targetY = window.scrollY / window.innerHeight;
    };

    window.addEventListener('pointermove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 1. Set up high resolution Terrain plane
    const cols = 55;
    const rows = 55;
    const size = 20;
    const terrainGeometry = new THREE.PlaneGeometry(size, size, cols, rows);
    terrainGeometry.rotateX(-Math.PI / 2);

    // 2. Uniforms mapping properties to the GPU shaders
    const uniforms = {
      time: { value: 0 },
      color: { value: new THREE.Color(0x172b36) } // Oceanic Noir
    };

    const terrainMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: terrainVertexShader,
      fragmentShader: terrainFragmentShader,
      wireframe: true,
      transparent: true,
      depthWrite: false
    });

    const terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
    terrainMesh.position.set(0, -2, -2);
    scene.add(terrainMesh);

    // 3. Grid point cloud
    const nodeCount = 120;
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      nodePositions[i * 3] = (Math.random() - 0.5) * 24;
      nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 8 + 2;
      nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 4;
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodeMaterial = new THREE.PointsMaterial({
      color: 0xffc801, // Forsythia
      size: 0.05,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true
    });
    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodePoints);

    // 4. Waypoint Hub Nodes
    const hubGeom = new THREE.IcosahedronGeometry(0.8, 1);
    const hubMat = new THREE.MeshBasicMaterial({
      color: 0xffc801,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    
    const hubs = [
      { mesh: new THREE.Mesh(hubGeom, hubMat), basePos: new THREE.Vector3(-4, 1.5, -2), rotSpeed: 0.004 },
      { mesh: new THREE.Mesh(hubGeom, hubMat), basePos: new THREE.Vector3(4.5, 0.8, 1), rotSpeed: -0.003 },
      { mesh: new THREE.Mesh(hubGeom, hubMat), basePos: new THREE.Vector3(1, 2.5, -5), rotSpeed: 0.002 }
    ];

    hubs.forEach(h => {
      h.mesh.position.copy(h.basePos);
      const centerGeom = new THREE.IcosahedronGeometry(0.1, 0);
      const centerMat = new THREE.MeshBasicMaterial({ color: 0xff9932 });
      const center = new THREE.Mesh(centerGeom, centerMat);
      h.mesh.add(center);
      scene.add(h.mesh);
    });

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    let animationFrameId = null;
    let isVisible = true;
    let clock = new THREE.Clock();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = () => {
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      if (isVisible) {
        const elapsedTime = clock.getElapsedTime();

        // 1. Update uniforms (this ticks the waves on the GPU)
        uniforms.time.value = elapsedTime;

        // 2. Camera parallax
        mouse.x += (mouse.targetX - mouse.x) * 0.04;
        mouse.y += (mouse.targetY - mouse.y) * 0.04;
        scroll.y += (scroll.targetY - scroll.y) * 0.06;

        camera.position.x = mouse.x * 2;
        camera.position.y = 5 - (scroll.y * 3) + (mouse.y * 1);
        camera.position.z = 12 - (scroll.y * 4);
        camera.lookAt(0, -1 - (scroll.y * 2), -2);

        // 3. Hubs bobbing
        hubs.forEach((h, index) => {
          h.mesh.rotation.y += h.rotSpeed;
          h.mesh.rotation.x += h.rotSpeed * 0.5;
          const bob = Math.sin(elapsedTime * 0.8 + index * Math.PI) * 0.2;
          h.mesh.position.y = h.basePos.y + bob;
        });

        nodePoints.rotation.y = elapsedTime * 0.01;

        renderer.render(scene, camera);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      
      const isMobile = w < 768;
      hubs[0].mesh.position.set(isMobile ? -2.2 : -4, 1.5, -2);
      hubs[1].mesh.position.set(isMobile ? 2.2 : 4.5, 0.8, 1);
      hubs[2].mesh.position.set(0, isMobile ? 3 : 2.5, -5);

      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleMotionChange);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      terrainGeometry.dispose();
      terrainMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      hubGeom.dispose();
      hubMat.dispose();

      hubs.forEach(h => {
        h.mesh.children.forEach(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      });

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (!webGlSupported) {
    const PipelineFallback = React.lazy(() => import('./PipelineFallback'));
    return (
      <React.Suspense fallback={<div className="pipeline-fallback">Loading fallback...</div>}>
        <PipelineFallback />
      </React.Suspense>
    );
  }

  return (
    <div className="pipeline-canvas-wrap" ref={containerRef} aria-label="WebGL 3D dynamic volumetric terrain waves background" />
  );
}
