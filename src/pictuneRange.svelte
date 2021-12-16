<script>
  import { createEventDispatcher, onMount, beforeUpdate, afterUpdate } from 'svelte';
	const dispatch = createEventDispatcher();
  export let rangeProps;
  export let label;

  const { value: propValue, ...passedOnProp } = rangeProps || {}
  
  let value = propValue || 0;

  function handleChangeEv(event){
    dispatch('valueChanged', {
      value
    })
  }
</script>

<style>
  label, span{
    display: inline-block;
  }
</style>

<span>
  {label}
</span>

<label for="input-range">
  <input {...passedOnProp}
    bind:value={value}
    on:change={handleChangeEv}
    name="input-range"
    id="input-range"
    type="range">
</label>

<span>
  {value}
</span>