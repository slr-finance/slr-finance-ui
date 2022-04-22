<template>
  <div class="overflow-hidden">
    <div ref="root" class="ui-blob relative overflow-hidden w-full h-full">
      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRef, watch } from 'vue'
import { WebGLRenderer, Scene, IcosahedronGeometry, Object3D, ShaderMaterial, Mesh, PerspectiveCamera, Vector2, Clock }  from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { templateRef, useResizeObserver, useTransition, TransitionPresets } from '@vueuse/core';
// @ts-ignore
import vertexShader from './vertexShader.glsl'
// @ts-ignore
import fragmentShader from './fragmentShader.glsl'

export default defineComponent({
  props: {
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    strength: {
      type: Number,
      default: 0.1,
    },
    density: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 1,
    }
  },
  setup(props) {
    const rootEl = templateRef('root')


    onMounted(() => {
      const strength = useTransition(toRef(props, 'strength'), { delay: 200, transition: TransitionPresets.easeInOutCubic })
      const density = useTransition(toRef(props, 'density'), { delay: 200, transition: TransitionPresets.easeInOutCubic })
      const Gl = new Gld((rootEl.value as HTMLElement).offsetWidth, (rootEl.value as HTMLElement).offsetHeight)


      useResizeObserver(rootEl, ([entry]) => {
        const { width, height } = entry.contentRect
        Gl.resize(width, height)
      })
      Gl.addCanvas(rootEl.value as HTMLElement)
      Gl.animate()

      // size, speed, color, color1, freq, density, strength, offset
      const blob = new Blob(props.size, 0.15, [0.42745098, 0.0509803922, 0.988235294], [0.611764706, 0.662745098, 0.909803922], density.value, strength.value, Math.PI * 2);   
      blob.position.set(props.x, props.y, 0);
      blob.rotation.set(0, 0, 0);

      // watch(() => props.x, (x) => { app.x = x }, { immediate: true })
      // watch(() => props.y, (y) => { app.y = y }, { immediate: true })

      watch(strength, (val) => blob.material.uniforms.uNoiseStrength.value = val)
      watch(density, (val) => blob.material.uniforms.uNoiseDensity.value = val)

      Gl.scene.add(blob);
    })
  },
})




class Blob extends Object3D {
  geometry: IcosahedronGeometry
  material: ShaderMaterial
  mesh: Mesh
  constructor(size:number, speed:number, color:number[], color1:number[], density:number, strength:number, offset:number) {
    super();

    this.geometry = new IcosahedronGeometry(size, 64);
    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uNoiseDensity: { value: density },
        uNoiseStrength: { value: strength },
        uFreq: { value: 3 },
        uAmp: { value: 6 },
        uColor: { value: color },
        uColor1: { value: color1 },
        uOffset: { value: offset },
        uAlpha: { value: 1.0 },
      },
      defines: {
        PI: Math.PI
      },
      // wireframe: true,
      // side: THREE.DoubleSide
      transparent: true,
    });

    this.mesh = new Mesh(this.geometry, this.material);

    this.add(this.mesh);
  }
}

class Gld {
  camera: PerspectiveCamera
  renderer = new WebGLRenderer({ antialias: true, alpha: true });
  scene = new Scene();
  clock = new Clock();
  mouse = new Vector2();
  mouseTarget = new Vector2();
    composer: EffectComposer

  constructor(width:number, height:number) {
    this.camera = new PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000
    );
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor( 0xffffff, 0 );

    
    this.camera.position.set(0, 0, 18);

    const bloomPass = new UnrealBloomPass( new Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = 0.5;
    bloomPass.strength = 1;
    bloomPass.radius = 1;

		const renderScene = new RenderPass( this.scene, this.camera );

    this.composer = new EffectComposer( this.renderer );
    this.composer.addPass( renderScene );
    this.composer.addPass( bloomPass );


    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }


  addCanvas(parent:HTMLElement) {
    const canvas = this.renderer.domElement;
    canvas.classList.add('webgl');
    parent.appendChild(canvas);
  }

  addEvents() {
    window.addEventListener('mousemove', this.mouseMove.bind(this));
  }

  resize(width:number, height:number) {
    this.camera.aspect = width / height;
    this.renderer.setSize(width, height);

    this.camera.updateProjectionMatrix();
  }

  mouseMove(e:MouseEvent) {
	  // Calculate mouse position in normalized device coordinates
	  // (-1 to +1) for both components
	  this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    // this.controls.update();

    // Remove loading class when scene has objects
    if (this.scene.children.length > 0) {
      document.body.classList.remove('loading');
    }

    // Update uniforms
    this.scene.children.forEach((mesh) => {
      (mesh as Blob).material.uniforms.uTime.value = this.clock.getElapsedTime();
    });

    // Lerp movement
    // this.mouseTarget.x = gsap.utils.interpolate(this.mouseTarget.x, this.mouse.x, 0.03);
    // this.mouseTarget.y = gsap.utils.interpolate(this.mouseTarget.y, this.mouse.y, 0.03);
    this.mouseTarget.x = this.mouse.x;
    this.mouseTarget.y = this.mouse.y;

    this.scene.rotation.set(
      this.mouseTarget.y * 0.25,
      this.mouseTarget.x * 0.25,
      0
    );    
    this.composer.render();
    //this.renderer.render(this.scene, this.camera);
  }
}


</script>



<style lang="postcss" scoped>
.ui-blob > canvas {
  @apply left-0 top-0 w-full h-full absolute pointer-events-none select-none;
}
</style>
