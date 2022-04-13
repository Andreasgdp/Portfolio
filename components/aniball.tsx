import React, { useState, useEffect, useRef, useCallback } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { loadGLTFModels } from '../libs/model';
import { AniballContainer, AniballSpinner } from './aniball-loader';

function easeOutCirc(x: number) {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}

const Aniball = () => {
  const refContainer = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [renderer, setRenderer] = useState<THREE.Renderer>();
  const [_camera, setCamera] = useState<THREE.Camera>();
  const [_controls, setControls] = useState<OrbitControls>();

  const handleWindowResize = useCallback(() => {
    const { current: container } = refContainer;
    if (container && renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;
      console.log(scW, scH);

      renderer.setSize(scW, scH);
    }
  }, [renderer]);

  const initialize = useCallback(() => {
    const { current: container } = refContainer;
    const scene = new THREE.Scene();
    const target = new THREE.Vector3(-0.5, 1.2, 0);
    const initialCameraPosition = new THREE.Vector3(
      400 * Math.sin(0.2 * Math.PI),
      50,
      400 * Math.cos(0.2 * Math.PI)
    );
    if (container && !renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(scW, scH);
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      const scale = scH * 0.5 + 4.8;
      const camera = new THREE.OrthographicCamera(
        -scale,
        scale,
        scale,
        -scale,
        0.1,
        50000
      );
      camera.position.copy(initialCameraPosition);
      camera.lookAt(target);
      setCamera(camera);

      const directionalLight = new THREE.DirectionalLight(0xcccccc, 0.5);
      directionalLight.position.set(100, 100, 0);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 512;
      directionalLight.shadow.mapSize.height = 512;
      directionalLight.shadow.camera.left = -scale;
      directionalLight.shadow.camera.right = scale;
      directionalLight.shadow.camera.top = scale;
      directionalLight.shadow.camera.bottom = -scale;
      directionalLight.shadow.camera.left = -scale;
      directionalLight.shadow.camera.near = 0.1;
      directionalLight.shadow.camera.far = 50000;
      scene.add(directionalLight);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.autoRotateSpeed = 5.0;
      controls.target = target;
      setControls(controls);

      loadGLTFModels(
        scene,
        [
          '/objs/cat.glb',
          '/objs/dog.glb',
          '/objs/fox.glb',
          '/objs/raccoon.glb'
        ],
        {
          receiveShadow: false,
          castShadow: true
        },
        [-225, -75, 75, 225]
      ).then(() => {
        animate();
        setLoading(false);
      });

      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000, 1000, 1000),
        new THREE.MeshPhongMaterial({
          color: 0xf7d89f
        })
      );
      plane.rotation.x = -Math.PI * 0.5;
      plane.receiveShadow = true;
      scene.add(plane);

      let req: number = 0;
      let frame = 0;
      const animate = () => {
        req = requestAnimationFrame(animate);

        frame = frame <= 100 ? frame + 1 : frame;

        if (frame <= 100) {
          const p = initialCameraPosition;
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;

          camera.position.y = p.y;
          camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
          camera.position.z =
            p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
          camera.lookAt(target);
        } else {
          controls.update();
        }

        renderer.render(scene, camera);
      };

      return () => {
        console.log('unmount');
        cancelAnimationFrame(req);
        renderer.dispose();
      };
    }
  }, [renderer]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false);
    return () => {
      window.removeEventListener('resize', handleWindowResize, false);
    };
  }, [handleWindowResize]);

  const refProps = {
    ref: refContainer
  };

  return (
    <AniballContainer {...refProps}>
      {loading && <AniballSpinner />}
    </AniballContainer>
  );
};

export default Aniball;
