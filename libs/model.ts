import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function loadGLTFModel(
  scene: THREE.Scene,
  glbPath: string,
  options = { receiveShadow: true, castShadow: true },
  offset: number
) {
  const { receiveShadow, castShadow } = options;
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      glbPath,
      (gltf) => {
        const obj = gltf.scene;
        obj.name = glbPath.replace('/objs/', '').replace('.glb', '');
        obj.position.x = 0;
        obj.position.y = 0;
        obj.position.z = offset;
        obj.rotation.y = ((-offset / 675) * Math.PI) / 2;
        obj.receiveShadow = receiveShadow;
        obj.castShadow = castShadow;
        scene.add(obj);

        obj.traverse(function (child) {
          if ((child as THREE.Mesh).isMesh) {
            // (child as THREE.Mesh).material = new THREE.MeshPhongMaterial();
            child.receiveShadow = receiveShadow;
            child.castShadow = castShadow;
          }
        });
        resolve(obj);
      },
      undefined,
      function (error) {
        reject(error);
      }
    );
  });
}

export function loadGLTFModels(
  scene: THREE.Scene,
  glbPaths: Array<string>,
  options = { receiveShadow: true, castShadow: true },
  offsets: Array<number>
) {
  return Promise.all([
    glbPaths.map((glbPath, index) =>
      loadGLTFModel(scene, glbPath, options, offsets[index])
    )
  ]);
}
