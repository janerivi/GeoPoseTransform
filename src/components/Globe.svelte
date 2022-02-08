<script lang="ts">
	import {
        Canvas,

        PerspectiveCamera,
        DirectionalLight,
        //BasicShadowMap,
        //PCFShadowMap,
        PCFSoftShadowMap,
        //VSMShadowMap,
        AmbientLight,

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
        BoxBufferGeometry
	} from "svelthree";
    export let scene;
    export let parent;
    export let eRadius:number;
    export let pRadius:number;

    $:ratio = pRadius/eRadius;
    
    
    let globe:SphereGeometry;
    globe= new SphereGeometry(eRadius,96,96);
    $:scale = [eRadius,eRadius*ratio,eRadius];


    let earthMaterial = new MeshStandardMaterial({transparent:true, opacity:0.6});
  
    let loader = new TextureLoader();
    earthMaterial.map = loader.load('img/earthmap10k.jpg')
  


    const wireframeMaterial = new MeshBasicMaterial({ color: 0x88CCFF, wireframe: true, transparent: true })
    let defaultMaterialProps:MeshStandardMaterialParameters = {
      roughness: 1, metalness: 0, color: 0xCCCCCC 
    };

</script> 

<Mesh {scene} {parent} 
    geometry={globe}
    material={earthMaterial}
  
    mat={defaultMaterialProps}
    pos={[0, 0, 0]}
    rot={[0, 0, 0]}
    {scale}
    castShadow
    receiveShadow>
      
    <Mesh {scene} {scale}
        geometry={globe}
        material={wireframeMaterial}/>
</Mesh>