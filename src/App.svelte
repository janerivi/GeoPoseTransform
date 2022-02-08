<script lang="ts">
	import NumberInput from "./components/NumberInput.svelte";
	import ItemList from "./components/ItemList.svelte";
	import SvelteTreeView from "./components/SvelteTreeView.svelte";
	import * as GeoPose from './modules/GeoPoseMath'; 
	export let name: string;
	let a:number = 1 ; // relative equator radius
	let b:number = GeoPose.E_POLE_RADIUS /GeoPose.E_EQUATOR_RADIUS; // relative pole radius
	console.log("Polar / Equator: "+ b);
	let latitude:number = 0;
	let longitude:number = 0;
	let altitude:number = 200000;
	let xRot:number = 0.00001;
	let yRot:number = 0.00001;
	let zRot:number = 0.00001;
	let latitude2:number = 59.9;
	let longitude2:number = 10.7;
	let altitude2:number = 500000;
	let xRot2:number = 45;
	let yRot2:number = 20;
	let zRot2:number = 45;
	$:latGeoCentric2 = 0;
	let step:number = 0.0001;
	$:latGeoCentric = 0;
</script>

<main>
	<div>
	<ItemList vertical={true} >
		<NumberInput label="Polar radius (relative)" bind:val={b} step={step}></NumberInput>
		<NumberInput label="Equatorial radius (relative)" bind:val={a} step={step}></NumberInput>
	
	</ItemList>
	</div>

	<ItemList vertical={true} >
		<NumberInput label="Latitude (geodetic/gps)" bind:val={latitude} min={-90} max={90} step={step}></NumberInput>
		<div>Geocentric Latitude {latGeoCentric}</div>
		<NumberInput label="Longitude" bind:val={longitude} min={-180} max={180} step={step}></NumberInput>
		<NumberInput label="Altitude (metres)" bind:val={altitude} min={-GeoPose.E_EQUATOR_RADIUS} max={GeoPose.E_EQUATOR_RADIUS} step={10000}></NumberInput>
		<NumberInput label="z rotation (yaw)" bind:val={zRot} min={0} max={360} step={step}></NumberInput>
		<NumberInput label="y rotation (pitch)" bind:val={yRot} min={0} max={360} step={step}></NumberInput>
		<NumberInput label="x rotation (roll)" bind:val={xRot} min={0} max={360} step={step}></NumberInput>
		
	</ItemList>

	
	<ItemList vertical={true} >
		<NumberInput label="Latitude (geodetic/gps)" bind:val={latitude2} min={-90} max={90} step={step}></NumberInput>
		<div>Geocentric Latitude {latGeoCentric2}</div>
		<NumberInput label="Longitude" bind:val={longitude2} min={-180} max={180} step={step}></NumberInput>
		<NumberInput label="Altitude (metres)" bind:val={altitude2} min={-GeoPose.E_EQUATOR_RADIUS} max={GeoPose.E_EQUATOR_RADIUS} step={10000}></NumberInput>
		<NumberInput label="z rotation (yaw)" bind:val={zRot2} min={0} max={360} step={step}></NumberInput>
		<NumberInput label="y rotation (pitch)" bind:val={yRot2} min={0} max={360} step={step}></NumberInput>
		<NumberInput label="x rotation (roll)" bind:val={xRot2} min={0} max={360} step={step}></NumberInput>

	</ItemList>

	<div>
		<SvelteTreeView 
			pRadius={b} 
			eRadius={a}  
			lat={latitude} 
			lng={longitude}
			alt={altitude}
			xRot={xRot}
			yRot={yRot}
			zRot={zRot}
			lat2={latitude2} 
			lng2={longitude2}
			alt2={altitude2} 
			xRot2={xRot2}
			yRot2={yRot2}
			zRot2={zRot2}
			bind:latGeoCentric={latGeoCentric}
			bind:latGeoCentric2={latGeoCentric2}></SvelteTreeView>
	</div>


</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		background-color: lightgray;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>