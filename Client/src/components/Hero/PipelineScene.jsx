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

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera: Tilted downward to view the terrain waves
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);

    // Mouse vectors for parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const scroll = { y: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      // Normalize scroll position
      scroll.targetY = window.scrollY / window.innerHeight;
    };

    window.addEventListener('pointermove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 1. Color Palette Definitions
    const colorOceanic = new THREE.Color(0x172b36); // Oceanic Noir
    const colorForsythia = new THREE.Color(0xffc801); // Forsythia
    const colorMint = new THREE.Color(0xd9e8e2); // Mystic Mint

    // 2. Volumetric 3D Data Terrain (Heightmap Plane)
    // Using high segment count to make smooth waves
    const cols = 55;
    const rows = 55;
    const size = 20;
    const terrainGeometry = new THREE.PlaneGeometry(size, size, cols, rows);
    // Rotate plane to lie flat on the floor
    terrainGeometry.rotateX(-Math.PI / 2);

    // Keep copies of base positions to calculate sine wave offsets dynamically
    const basePositions = terrainGeometry.attributes.position.clone();

    // Terrain material: Wireframe showing the structural grid mesh
    const terrainMaterial = new THREE.MeshBasicMaterial({
      color: colorOceanic,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      depthWrite: false
    });

    const terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
    // Push the terrain slightly down and back
    terrainMesh.position.set(0, -2, -2);
    scene.add(terrainMesh);

    // 3. Floating Data Node Matrix (ambient coordinate nodes)
    const nodeCount = 150;
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
      size: 0.055,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true
    });
    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodePoints);

    // 4. Large wireframe waypoint hubs floating in the landscape
    const hubGeom = new THREE.IcosahedronGeometry(0.8, 1);
    const hubMat = new THREE.MeshBasicMaterial({
      color: colorForsythia,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    
    // We add 3 floating hubs across the scene
    const hubs = [
      { mesh: new THREE.Mesh(hubGeom, hubMat), basePos: new THREE.Vector3(-4, 1.5, -2), rotSpeed: 0.005 },
      { mesh: new THREE.Mesh(hubGeom, hubMat), basePos: new THREE.Vector3(4.5, 0.8, 1), rotSpeed: -0.004 },
      { mesh: new THREE.Mesh(hubGeom, hubMat), basePos: new THREE.Vector3(1, 2.5, -5), rotSpeed: 0.003 }
    ];

    hubs.forEach(h => {
      h.mesh.position.copy(h.basePos);
      // Add a tiny solid center to the hubs
      const centerGeom = new THREE.IcosahedronGeometry(0.12, 0);
      const centerMat = new THREE.MeshBasicMaterial({ color: 0xff9932 }); // Deep Saffron
      const center = new THREE.Mesh(centerGeom, centerMat);
      h.mesh.add(center);

      scene.add(h.mesh);
    });

    // Media query to check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Animation variables
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

    // Render loop
    const animate = () => {
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      if (isVisible) {
        const elapsedTime = clock.getElapsedTime();

        // 1. Lerp mouse coordinates & scroll offsets for fluid scroll-driven camera parallax
        mouse.x += (mouse.targetX - mouse.x) * 0.04;
        mouse.y += (mouse.targetY - mouse.y) * 0.04;
        scroll.y += (scroll.targetY - scroll.y) * 0.06;

        // Dynamic camera tracking: Camera shifts downward and rolls slightly as page scrolls down
        camera.position.x = mouse.x * 2;
        camera.position.y = 5 - (scroll.y * 3) + (mouse.y * 1);
        camera.position.z = 12 - (scroll.y * 4); // Fly into the coordinate space on scroll
        camera.lookAt(0, -1 - (scroll.y * 2), -2);

        // 2. Animate 3D Terrain Plane procedural data waves
        const posAttr = terrainGeometry.attributes.position;
        const count = posAttr.count;

        for (let i = 0; i < count; i++) {
          const x = basePositions.getX(i);
          const z = basePositions.getZ(i);

          // Construct overlapping sine waves to model a realistic ocean of data pipeline waves
          const wave1 = Math.sin(x * 0.4 + elapsedTime * 1.2) * Math.cos(z * 0.4 + elapsedTime * 0.8) * 0.75;
          const wave2 = Math.sin(x * 0.8 - elapsedTime * 0.9) * 0.25;
          const wave3 = Math.sin(z * 0.25 + elapsedTime * 0.5) * 0.4;
          
          posAttr.setY(i, wave1 + wave2 + wave3);
        }
        posAttr.needsUpdate = true;

        // 3. Rotate and float waypoint hubs
        hubs.forEach((h, index) => {
          h.mesh.rotation.y += h.rotSpeed;
          h.mesh.rotation.x += h.rotSpeed * 0.5;

          // Bobbing wave displacement
          const bob = Math.sin(elapsedTime * 0.8 + index * Math.PI) * 0.2;
          h.mesh.position.y = h.basePos.y + bob;
        });

        // 4. Slow drift on grid nodes
        nodePoints.rotation.y = elapsedTime * 0.015;

        renderer.render(scene, camera);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      
      const isMobile = w < 768;
      // Reframe objects for mobile viewports
      hubs[0].mesh.position.set(isMobile ? -2.2 : -4, 1.5, -2);
      hubs[1].mesh.position.set(isMobile ? 2.2 : 4.5, 0.8, 1);
      hubs[2].mesh.position.set(0, isMobile ? 3 : 2.5, -5);

      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleMotionChange);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Dispose geometries & materials
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
