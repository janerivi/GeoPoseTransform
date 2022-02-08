<script lang="ts"> 
  import * as GeoPose from '../modules/GeoPoseMath'
  export let lat:number = 0;
  export let lng:number = 0;
  export let alt:number = 0.2;
  export let latGC:number = 0;
  export let zRot:number = 0;
  export let yRot:number = 0;
  export let xRot:number = 0;
  let internalPR:number = 0.5;
  let internalER:number = 1;

  $:zRad = zRot*GeoPose.DEG_TO_RAD;
  $:yRad = yRot*GeoPose.DEG_TO_RAD;
  $:xRad = xRot*GeoPose.DEG_TO_RAD;



  export let pRadius:number = internalPR;
  export let eRadius:number = internalER;


  $:latRad = -lat*GeoPose.DEG_TO_RAD;
  $:lngRad = -lng*GeoPose.DEG_TO_RAD;
  $:ratio = pRadius/eRadius;


  
  let latGCRad:number; // = (Math.PI/2)+Math.atan(ratio*Math.tan(latRad)); // does behave correctly but is not "correct"? 
  //$:latGCRad = (Math.PI/2)+Math.atan((1-(1-ratio*ratio)*(1-ratio*ratio))*Math.tan(latRad)) // "correct but not tangential" 

 $: {
    //ψ = tan-1( ((b/a)^2)*tan φ ).
    latGCRad = (Math.PI/2)+Math.atan(ratio*Math.tan(latRad)); // does behave correctly but is not "correct"? 
    //latGCRad = (Math.PI/2)+Math.atan((1-(1-ratio*ratio)*(1-ratio*ratio))*Math.tan(latRad)) // "correct but not tangential" 

    latGC = -latGCRad*GeoPose.RAD_TO_DEG +90; // for UX display
 }

  onchange
  import {
    Canvas,
    Scene,
    PerspectiveCamera,
  
    DirectionalLight,
    //BasicShadowMap,
    //PCFShadowMap,
    PCFSoftShadowMap,
    //VSMShadowMap,
    AmbientLight,
    BoxBufferGeometry,
    PlaneBufferGeometry,
    Mesh,
    MeshStandardMaterial,
    WebGLRenderer,
    OrbitControls,
    DoubleSide,
    MathUtils,
    SphereBufferGeometry,
    SphereGeometry,
    MeshBasicMaterial,
    MeshBasicMaterialParameters,
    MeshStandardMaterialParameters,
    TextureLoader,
    GridHelper,
    PlaneGeometry,
    CylinderBufferGeometry,
    EdgesGeometry,
    LineSegments,
    LineBasicMaterial,
    CylinderGeometry,
    Line
  } from "svelthree";
import {boxGeometry} from '../modules/VizUtil'
import RotationArrow from './RotationArrow.svelte';
import WireBox from './WireBox.svelte';

  export let scene;
  export let parent = undefined;

  let boxWidth:number = 0.1;
  let sides = 2;
  let boxElevation = 0.00001
  let box = new BoxBufferGeometry(boxWidth/40, boxWidth/40, boxWidth/40,sides,sides,sides);
  //let lineBoxGeom = boxGeometry(boxWidth, boxWidth,boxWidth);
  //let lineMat = new LineBasicMaterial({color: 0xffffff, linewidth: 2});
  //let lineBox = new Line( lineBoxGeom, lineMat);
  //let box = new EdgesGeometry(boxBuffer,75);
  //let boxLine = new LineSegments(box)
  //let boxEdgeMaterial = new LineBasicMaterial({color:0xFFFFFF})
  let boxMaterial = new MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent:true })
  
  let boxOrigin = new BoxBufferGeometry(boxWidth/40, boxWidth/40, boxWidth/40,1,1,1);
  var boxOriginMaterial = new MeshBasicMaterial( { color: 0xffffff} );

  let boxTangent = new PlaneBufferGeometry(boxWidth, boxWidth, 1, 1 );
  var boxTangentMaterial = new MeshBasicMaterial( { transparent: true, side:DoubleSide, opacity:0.3} );

  let boxAxis = new CylinderBufferGeometry( boxWidth/100, boxWidth/100, boxWidth/2, 4,1 );
  let boxNortAxisMaterial = new MeshBasicMaterial( {color: 0xff0000})
  let boxEastAxisMaterial = new MeshBasicMaterial( {color: 0x00FF00})
  let boxUpAxisMaterial = new MeshBasicMaterial( {color: 0x0000FF})

  let arrow = new CylinderGeometry(0,boxWidth/40,2*boxWidth/40,24,1,false);


  let defaultMaterialProps:MeshStandardMaterialParameters = {
      roughness: 1, metalness: 0, color: 0xCCCCCC 
    };

    let altbox:BoxBufferGeometry = new BoxBufferGeometry(alt/GeoPose.E_EQUATOR_RADIUS,boxWidth/80,boxWidth/80,1,1,1);

    $: {
        altbox  = new BoxBufferGeometry(alt/GeoPose.E_EQUATOR_RADIUS,boxWidth/160,boxWidth/160,1,1,1);
    }

</script>



<Mesh {scene} {parent} let:parent
    geometry={box}
    material={boxMaterial}
    pos={[(boxElevation+eRadius)*Math.sin(latGCRad)*Math.cos(lngRad), (boxElevation+pRadius)*Math.cos(latGCRad) , (boxElevation+eRadius)*Math.sin(latGCRad)*Math.sin(lngRad)]}
    rot={[0, -lngRad, -latRad]}
    castShadow
    receiveShadow>
    <WireBox {scene} {parent} 
        material={boxMaterial} pos={[0,0,0]} rot={[0,0,0]} width={boxWidth/320} height={boxWidth} depth={boxWidth} thickness={boxWidth/400} />
    <Mesh
        {scene} {parent}
        geometry={boxTangent}
        material={boxTangentMaterial}
        mat={defaultMaterialProps} 
        pos={[0, 0, 0]}
        rot={[0, Math.PI/2, 0]}/>
    <Mesh
        {scene} {parent}
        geometry={boxOrigin}
        material={boxOriginMaterial}
        pos={[0, 0, 0]}
        rot={[0, Math.PI/2, 0]}/>

    <Mesh
        {scene} {parent}
        geometry={boxAxis}
        material={boxEastAxisMaterial} 
        pos={[0, 0, -boxWidth/4]}
        rot={[-Math.PI/2,0,0]} castShadow receiveShadow/>
        <Mesh
            {scene} {parent}
            geometry={arrow}
            material={boxEastAxisMaterial} 
            pos={[0, 0, -(boxWidth/2 + boxWidth/40)]}
            rot={[-Math.PI/2,0,0]} castShadow receiveShadow/>
    <Mesh
        {scene} {parent}
        geometry={boxAxis}
        material={boxNortAxisMaterial} 
        pos={[0, boxWidth/4, 0]}
        rot={[0,0,0]} castShadow receiveShadow/>
        <Mesh
            {scene} {parent}
            geometry={arrow}
            material={boxNortAxisMaterial} 
            pos={[0, (boxWidth/2 + boxWidth/40), 0]}
            rot={[0,0,0]} castShadow receiveShadow/>
    <Mesh
        {scene} {parent}
        geometry={boxAxis}
        material={boxUpAxisMaterial} 
        pos={[boxWidth/4, 0, 0]}
        rot={[0,0,Math.PI/2]} castShadow receiveShadow/>
        <Mesh
            {scene} {parent}
            geometry={arrow}
            material={boxUpAxisMaterial} 
            pos={[(boxWidth/2 + boxWidth/40), 0, 0]}
            rot={[0,0,-Math.PI/2]} castShadow receiveShadow/>

    <Mesh
            {scene} {parent}
            geometry={altbox}
            material={boxMaterial} 
            pos={[alt/GeoPose.E_EQUATOR_RADIUS/2, 0, 0]}
            rot={[0,0,0]} castShadow receiveShadow/>        
    <RotationArrow {scene} {parent}
        pos={[alt/GeoPose.E_EQUATOR_RADIUS,0,0]}
        length={boxWidth/2}
        
        rot={[zRad,-yRad,xRad]}
    />
    
</Mesh>