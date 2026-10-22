import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const width = currentContainer.clientWidth;
    const height = currentContainer.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    // User calibrated camera position
    camera.position.set(3.91, 1.71, -0.76);
    // Point camera towards the right side target where the model is placed
    camera.lookAt(0.9, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    currentContainer.replaceChildren(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xe6e8e6, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(3, 6, 3);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xb85a4b, 4.0, 6);
    pointLight.position.set(-1, 1.5, -1);
    scene.add(pointLight);

    const modelGroup = new THREE.Group();
    // User calibrated model position placing him on the right side
    modelGroup.position.set(0.9, -1.17, 0);
    modelGroup.rotation.set(0, 0, 0);
    scene.add(modelGroup);

    let mixer: THREE.AnimationMixer | null = null;
    let loadedObject: THREE.Group | null = null;
    const clock = new THREE.Clock();

    const loader = new GLTFLoader();
    loader.load(
      '/assets/trooper/12.gltf',
      (gltf) => {
        loadedObject = gltf.scene;
        loadedObject.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        const box = new THREE.Box3().setFromObject(loadedObject);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.6 / maxDim;
        loadedObject.scale.set(scale, scale, scale);
        loadedObject.position.y -= 0.2;

        modelGroup.add(loadedObject);

        // Play embedded animation from GLTF if available
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(loadedObject);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }
      },
      undefined,
      () => {
        const armorMat = new THREE.MeshStandardMaterial({ color: 0x3a3f3c, roughness: 0.5 });
        const fallbackMesh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 0.6), armorMat);
        modelGroup.add(fallbackMesh);
      }
    );

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (mixer) {
        mixer.update(delta);
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!currentContainer || !renderer) return;
      const w = currentContainer.clientWidth;
      const h = currentContainer.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (loadedObject) {
        loadedObject.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.geometry.dispose();
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat) => mat.dispose());
            } else if (mesh.material) {
              mesh.material.dispose();
            }
          }
        });
      }

      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
