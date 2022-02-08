<script lang="ts">

	export let val: number;
    export let label: string;
    export let min:number = 0.1;
    export let max:number = 10;
    export let step:number = 0.1;

</script>


    <div>        
        <label>{label?label:''}
            <input type=number bind:value={val} min={min} max={max} step={step}>
            <input type=range bind:value={val} min={min} max={max} step={step}>
        </label>
    </div>


<style>
	input, label {

        font-size: 20px;
        margin: 10px;
        font-family: Arial, Helvetica, sans-serif;
	}
    label{
        font-weight: bold;
    }
    div{
        display:inline-block;
        box-sizing: border-box;
        
        padding:5px;
        background-color:gainsboro;
    }

</style>