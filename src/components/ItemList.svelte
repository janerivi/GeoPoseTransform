<script lang="ts">
    export let vertical: boolean;
</script>

<div>
    <div class="flex" class:verticalClass={vertical}>
    <slot></slot>
    </div> 
</div>

<style>
    
    div{
        display:inline-block;
    }

    div.flex {
        display:flex;
    }

    div.flex.verticalClass {

        flex-direction: column;
    }

   
</style>