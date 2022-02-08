  <script lang="ts"> 
  import {
    Canvas,
    Scene,
    PerspectiveCamera,
    DirectionalLight,
    PCFSoftShadowMap,
    AmbientLight,
    WebGLRenderer,
    OrbitControls
  } from "svelthree";

  import GeoPoseWidget from './GeoPoseWidget.svelte';
  import Globe from './Globe.svelte'
  let internalPR:number = 0.5;
  let internalER:number = 1;

  export let pRadius:number = internalPR;
  export let eRadius:number = internalER;
  
  export let lat:number = 0;
  export let lng:number = 0;
  export let alt:number = 0;
  export let xRot:number = 0.00000001;
  export let yRot:number = 0.00000001;
  export let zRot:number = 0.00000001;

  

  export let latGeoCentric = 0;
  export let lat2:number = 59.8;
  export let lng2:number = 10.7;
  export let alt2:number = 0;
  export let xRot2:number = 90;
  export let yRot2:number = 20;
  export let zRot2:number = 45;
  export let latGeoCentric2 = 0;

</script>

<Canvas let:sti w={2000} h={1200}>

  <Scene {sti} let:scene id="scene1" props={{ background: 0x000000}}>

    <PerspectiveCamera {scene} id="cam1"  pos={[0, 0, 3]} lookAt={[0, 0, 0]} />
    <AmbientLight {scene} intensity={0.8} />
    <DirectionalLight
      {scene}
      pos={[1, 2, 1]}
      intensity={1}
      shadowMapSize={1024 * 8}
      castShadow />
      

    <GeoPoseWidget {scene} let:parent 
     lat={lat} lng={lng} alt={alt}
     xRot={xRot}  yRot={yRot} zRot={zRot}
    {pRadius} {eRadius} bind:latGC={latGeoCentric}/>
    <GeoPoseWidget {scene} let:parent 
    lat={lat2} lng={lng2} alt={alt2}
    xRot={xRot2}  yRot={yRot2} zRot={zRot2} 
    {pRadius} {eRadius} bind:latGC={latGeoCentric2}/>
    <Globe {scene} let:parent {pRadius} {eRadius} />

  
    <OrbitControls {scene}  enableDamping />

  </Scene>

  <WebGLRenderer
    {sti}
    sceneId="scene1"
    camId="cam1"
    config={{ antialias: true, alpha: true }}
    enableShadowMap
    shadowMapType={PCFSoftShadowMap} />

</Canvas>
