<script lang="ts">
	import {

        Mesh,
        BoxBufferGeometry

   
	} from "svelthree";

    export let width = 1;
    export let height = 1;
    export let depth = 1;
    export let thickness = 1;
    export let material;
    export let pos = [0,0,0];
    export let rot = [0,0,0];
    export let parent = undefined;
    export let scene;

    let centerbox:BoxBufferGeometry = new BoxBufferGeometry(thickness,thickness,thickness,1,1,1);
    let centerboxWidth:BoxBufferGeometry = new BoxBufferGeometry(width,thickness,thickness,1,1,1);
    let centerboxHeight:BoxBufferGeometry = new BoxBufferGeometry(thickness,height,thickness,1,1,1);
    let centerBoxDepth:BoxBufferGeometry = new BoxBufferGeometry(thickness,thickness,depth,1,1,1);
 





</script>

<Mesh {scene} {parent} {material} let:parent
{pos} {rot}
geometry={centerbox}

castShadow
receiveShadow>
    <Mesh {scene} {parent}  {material}
        geometry={centerBoxDepth}
        pos={[width/2,height/2,0]}
        castShadow
        receiveShadow/>
    <Mesh {scene} {parent} {material}
        geometry={centerBoxDepth}
        pos={[-width/2,height/2,0]}
        castShadow
        receiveShadow/>
    <Mesh {scene} {parent} {material}
        geometry={centerBoxDepth}
        pos={[width/2,-height/2,0]}
        castShadow
        receiveShadow/>
    <Mesh {scene} {parent} {material}
        geometry={centerBoxDepth}
        pos={[-width/2,-height/2,0]}
        castShadow
        receiveShadow/>
    <Mesh {scene} {parent}  {material}
        geometry={centerboxHeight}
        pos={[width/2,0,depth/2]}
        castShadow
        receiveShadow/>
    <Mesh {scene} {parent}  {material}
        geometry={centerboxHeight}
        pos={[-width/2,0,depth/2]}
        castShadow
        receiveShadow/>
    <Mesh {scene} {parent}  {material}
        geometry={centerboxHeight}
        pos={[width/2,0,-depth/2]}
        castShadow
        receiveShadow/>
    <Mesh {scene} {parent}  {material}
        geometry={centerboxHeight}
        pos={[-width/2,0,-depth/2]}
        castShadow
        receiveShadow/>
    <Mesh {scene} {parent}  {material}
        geometry={centerboxWidth}
        pos={[0,height/2,depth/2]}
        castShadow
        receiveShadow/>
    <Mesh {scene} {parent}  {material}
        geometry={centerboxWidth}
        pos={[0,-height/2,depth/2]}
        castShadow
        receiveShadow/>
    <Mesh {scene} {parent}  {material}
        geometry={centerboxWidth}
        pos={[0,height/2,-depth/2]}
        castShadow
        receiveShadow/>
    <Mesh {scene} {parent}  {material}
        geometry={centerboxWidth}
        pos={[0,-height/2,-depth/2]}
        castShadow
        receiveShadow/>
</Mesh>


