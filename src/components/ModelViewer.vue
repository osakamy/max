<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const container = ref(null);

onMounted(() => {
  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  container.value.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 1, 4);

  const light = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(light);

  const loader = new GLTFLoader();

  loader.load(
    "/3dModel/scene.gltf",
    (gltf) => {
      gltf.scene.scale.set(2, 2, 2);
      scene.add(gltf.scene);

      function animate() {
        requestAnimationFrame(animate);
        gltf.scene.rotation.y += 0.005;
        renderer.render(scene, camera);
      }
      animate();
    },
    undefined,
    (err) => {
      console.error("Ошибка GLTF:", err);
    }
  );
});
</script>

<template>
  <div ref="container" style="width: 100%; height: 100%;"></div>
</template>
