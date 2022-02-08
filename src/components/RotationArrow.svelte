<script lang="ts">
	import {
        Mesh,
        BoxBufferGeometry,
        CylinderGeometry,
        SphereGeometry,
        MeshBasicMaterial,
  
        MeshStandardMaterialParameters,
        DoubleSide,
        TorusGeometry,
        PlaneBufferGeometry,
MeshStandardMaterial
   
	} from "svelthree";
import AmbientLight from "svelthree/src/components/AmbientLight.svelte";
    import WireBox from "./WireBox.svelte";
    
    export let scene;
    export let parent = undefined;
    export let rot:number[] = [0,0,0];
    export let pos:number[] = [0,0,0];
    export let length:number = 1;
    export let arrowWidth:number = length*0.15;
    export let thickness:number = arrowWidth*0.25;
    export let el:number = 0.00000000000001;
    let ball= new SphereGeometry(thickness/4.5,3,3);
    let stick = new BoxBufferGeometry(thickness/2, length, thickness,1,1,1);
    let arrow = new CylinderGeometry(0,arrowWidth,2*arrowWidth,24,1,false, 0, Math.PI);
    let arrowBottom = new CylinderGeometry(0,arrowWidth,2*arrowWidth,24,1,false, Math.PI, Math.PI);
    let zArch = new TorusGeometry( length/12, thickness/4, 2, 32, rot[0]+el );
    let yArch = new TorusGeometry( length/12, thickness/4, 2, 32, rot[1]+el );
    let xArch = new TorusGeometry( length/12, thickness/4, 2, 32, rot[2]+el );

    let zBox:BoxBufferGeometry = new BoxBufferGeometry(length,thickness/2,thickness/2,1,1,1);
    let yBox:BoxBufferGeometry = new BoxBufferGeometry(thickness/2,length,thickness/2,1,1,1);
    let xBox:BoxBufferGeometry = new BoxBufferGeometry(thickness/2,thickness/2,length,1,1,1);

    // const materialZ = new MeshBasicMaterial( { color: 0xffff00 } );
    // const materialY = new MeshBasicMaterial( { color: 0x00ffff } );
    // const materialX = new MeshBasicMaterial( { color: 0xff00ff } );
    const materialZ = new MeshBasicMaterial( { color: 0x0000ff } );
    const materialY = new MeshBasicMaterial( { color: 0xff0000 } );
    const materialX = new MeshBasicMaterial( { color: 0x00ff00 } );
    $: {
     zArch = new TorusGeometry( length/12, thickness/4, 2, 32, rot[0]+el );
     yArch = new TorusGeometry( length/12, thickness/4, 2, 32, rot[1]+el );
     xArch = new TorusGeometry( length/12, thickness/4, 2, 32, rot[2]+el );
    }
    let boxMaterial = new MeshBasicMaterial({ color: 0xFFFFFF});
    let basicMaterial = new MeshBasicMaterial({ color: 0xAAffAA});
    let arrowMaterial = new MeshBasicMaterial({ color: 0xffff00, side:DoubleSide});
    let arrowBottomMaterial = new MeshBasicMaterial({ color: 0x444444, side:DoubleSide});
    
     // ball at the origin
     let boxTangent = new PlaneBufferGeometry(length, length, 1, 1 ); //XY
     //let boxTangentZY = new PlaneBufferGeometry(length, length, 1, 1 );
     //let boxTangentZZ = new PlaneBufferGeometry(length, length, 1, 1 );
     let boxTangentMaterial = new MeshBasicMaterial( { color: 0xFFFFAA, transparent: true, side:DoubleSide, opacity:0.15} );
     let boxTangentMaterialXZ = new MeshBasicMaterial( { color: 0xFFAAFF, transparent: true, side:DoubleSide, opacity:0.15} );
     let boxTangentMaterialYZ = new MeshBasicMaterial( { color: 0xAAFFFF, transparent: true, side:DoubleSide, opacity:0.15} );
     let tangentMaterialProps:MeshStandardMaterialParameters = { roughness: 1, metalness: 0, color: 0xFFFFAA };
    let tangentMaterialPropsYZ:MeshStandardMaterialParameters = { roughness: 1, metalness: 0, color: 0xFFAAFF };
    let tangentMaterialPropsXZ:MeshStandardMaterialParameters = { roughness: 1, metalness: 0, color: 0xAAFFFF };
    
    let defaultMaterialProps:MeshStandardMaterialParameters = { roughness: 1, metalness: 0, color: 0xAAFFAA };
</script> 

<Mesh {scene} {parent}  let:parent
    geometry={ball}
    material={basicMaterial}
    mat={defaultMaterialProps}

    castShadow
    receiveShadow>



    <!--<Mesh {scene} {parent} 
        pos={[pos[0]+length/2,pos[1],pos[2]]}
        geometry={zArch}
        rot= {[0,Math.PI/2,0]}
        material={materialZ}
        castShadow
        receiveShadow/>  
    <Mesh {scene} {parent} 
        pos={[pos[0],pos[1]+length/2,pos[2]]}
        geometry={yArch}
        rot= {[rot[0]-Math.PI/2,0,Math.PI/2]}
    
        material={materialY}
        castShadow
        receiveShadow/>
     <Mesh {scene} {parent} 
        pos={[pos[0],pos[1],pos[2]+length/2]}
        geometry={xArch}
        rot= {[rot[0],rot[1],-Math.PI]}
   
        material={materialX}
        castShadow
        receiveShadow/>  -->

    <Mesh {scene} {parent} {rot} {pos} let:parent
    geometry={ball}
    material={basicMaterial}
    mat={defaultMaterialProps}
    castShadow
    receiveShadow>
    <!-- Axis-->
    <Mesh {scene} {parent} 
        pos={[0,0,0]}
        geometry={zBox}
        material={materialZ}
        castShadow
        receiveShadow/>
    <Mesh {scene} {parent} 
        pos={[0,0,0]}
        geometry={yBox}
        material={materialY}
        castShadow
        receiveShadow/>

    <!-- ARCHES-->
    <Mesh {scene} {parent} 
        pos={[length/2,0,0]}
        geometry={zArch}
        rot= {[-rot[0],Math.PI/2,0]}
        material={materialZ}
        castShadow
        receiveShadow/>
    <Mesh {scene} {parent} 
        pos={[-length/2,0,0]}
        geometry={zArch}
        rot= {[-rot[0],Math.PI/2,0]}
        material={materialZ}
        castShadow
        receiveShadow/>
        
    <Mesh {scene} {parent} 
        pos={[0,length/2,0]}
        geometry={yArch}
        rot= {[-Math.PI/2,0,-rot[1]+Math.PI/2]}
        material={materialY}
        castShadow
        receiveShadow/>
    <Mesh {scene} {parent} 
        pos={[0,-length/2,0]}
        geometry={yArch}
        rot= {[-Math.PI/2,0,-rot[1]+Math.PI/2]}   
        material={materialY}
        castShadow
        receiveShadow/>

    <Mesh {scene} {parent} 
        pos={[0,0,length/2]}
        geometry={xArch}
        rot= {[0,0,-Math.PI/2-rot[2]]}
        material={materialX}
        castShadow
        receiveShadow/>
    <Mesh {scene} {parent} 
        pos={[0,0,-length/2]}
        geometry={xArch}
        rot= {[0,0,-Math.PI/2-rot[2]]}
        material={materialX}
        castShadow
        receiveShadow/>



    <!-- XY-->
    <Mesh
        {scene} {parent}
        geometry={boxTangent}
        material={boxTangentMaterial}
        mat={tangentMaterialProps} 
        pos={[thickness/4, 0, 0]}
        rot={[0, Math.PI/2, 0]}/>
    <!-- XZ-->
    <Mesh 
        {scene} {parent}
        geometry={boxTangent}
        material={boxTangentMaterialXZ}
        mat={tangentMaterialPropsXZ} 
        pos={[thickness/4, 0, 0]}
        rot={[Math.PI/2, 0, Math.PI/2]}/>
     <!-- YZ-->
     <Mesh 
        {scene} {parent}
        geometry={boxTangent}
        material={boxTangentMaterialYZ}
        mat={tangentMaterialPropsYZ} 
        pos={[thickness/4, 0, 0]}
        rot={[0, 0, Math.PI/2]}/>
        <WireBox {scene} {parent} material={boxMaterial} pos={[0,0,0]} rot={[0,0,0]} width={length} height={length} depth={length} thickness={thickness/8} />

        <!--<WireBox {scene} {parent} material={boxMaterial} pos={[length/4,length/4,length/4]} rot={[0,0,0]} width={length/2} height={length/2} depth={length/2} thickness={thickness/4} />
        <WireBox {scene} {parent} material={boxMaterial} pos={[-length/4,length/4,length/4]} rot={[0,0,0]} width={length/2} height={length/2} depth={length/2} thickness={thickness/4} />
        <WireBox {scene} {parent} material={boxMaterial} pos={[-length/4,length/4,-length/4]} rot={[0,0,0]} width={length/2} height={length/2} depth={length/2} thickness={thickness/4} />
        <WireBox {scene} {parent} material={boxMaterial} pos={[length/4,length/4,-length/4]} rot={[0,0,0]} width={length/2} height={length/2} depth={length/2} thickness={thickness/4} />
        <WireBox {scene} {parent} material={boxMaterial} pos={[length/4,-length/4,length/4]} rot={[0,0,0]} width={length/2} height={length/2} depth={length/2} thickness={thickness/4} />
        <WireBox {scene} {parent} material={boxMaterial} pos={[-length/4,-length/4,length/4]} rot={[0,0,0]} width={length/2} height={length/2} depth={length/2} thickness={thickness/4} />
        <WireBox {scene} {parent} material={boxMaterial} pos={[-length/4,-length/4,-length/4]} rot={[0,0,0]} width={length/2} height={length/2} depth={length/2} thickness={thickness/4} />
        <WireBox {scene} {parent} material={boxMaterial} pos={[length/4,-length/4,-length/4]} rot={[0,0,0]} width={length/2} height={length/2} depth={length/2} thickness={thickness/4} /> -->         
        <Mesh {scene} {parent}
            geometry={stick}
            rot= {[-Math.PI/2,0,0]}
            pos = {[-thickness/4,0,0]}
            material={arrowBottomMaterial}
            castShadow
            receiveShadow/> 
        <Mesh {scene} {parent} let:parent
            geometry={stick}
            rot= {[-Math.PI/2,0,0]}
            pos = {[thickness/4,0,0]}
            material={basicMaterial}
            castShadow
            receiveShadow>

            <Mesh {scene} {parent}
                geometry ={arrow}
                material={arrowMaterial}
                pos = {[-thickness/4,length/2,0]}
                scale = {[.5,1,1]}
                castShadow
                receiveShadow/>
            <Mesh {scene} {parent}
                geometry ={arrow}
                material={basicMaterial}
                pos = {[-thickness/4,-length/2,0]}
                scale = {[.25,.5,.5]}
                castShadow
                receiveShadow/>
            <Mesh {scene} {parent}
                geometry ={arrowBottom}
                material={arrowBottomMaterial}
                pos = {[-thickness/4,length/2,0]}
                scale = {[.5,1,1]}
                castShadow
                receiveShadow/>
            <Mesh {scene} {parent}
                geometry ={arrowBottom}
                material={arrowBottomMaterial}
                pos = {[-thickness/4,-length/2,0]}
                scale = {[.25,.5,.5]}
                castShadow
                receiveShadow/>
        </Mesh>
    </Mesh>


   
</Mesh>