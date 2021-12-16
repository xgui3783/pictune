<script>
  import { AVAILABLE_FILTER_NAMES } from './constants'
  import { processStyle, getId } from './util'
  import PictuneRange from './pictuneRange.svelte'
  import { onDestroy, onMount } from 'svelte'
  export let enabledProps;
  export let applyToSelector;
  const rangeParams = [{
    name: 'contrast',
    params: {
      min: 0,
      max: 255,
      value: 100,
    }
  }, {
    name: 'brightness',
    params: {
      min: 0,
      max: 255,
      value: 100,
    }
  }]

  let addedRangeParams = []
  let selectedParam

  onDestroy(() => {
    console.log('unmounting')
  })

  function addFilter(){
    if (selectedParam === 'null' || !selectedParam) return
    
    const newRangeParam = rangeParams.find(param => param.name === selectedParam)
    addedRangeParams = [...addedRangeParams, {
      ...newRangeParam,
      id: getId()
    }]
  }
  function recalculateStyle() {

    const outputStyle = []
    for (const param of addedRangeParams) {
      if (param.currentValue){
        outputStyle.push(`${processStyle(param.name, param.currentValue)}`)
      }
    }
    const el = document.querySelector(applyToSelector)

    if (!!el) el.style.filter = outputStyle.join(' ')

  }

  function handleValueChanged(labelName, index, event) {
    const param = addedRangeParams[index]
    param.currentValue = event.detail.value
    recalculateStyle()
  }

  function removeFilter(index) {
    addedRangeParams = addedRangeParams.filter((_, idx) => idx !== index)
    recalculateStyle()
  }
</script>

<style>
.main-container
{
  display: grid;
  grid-template-columns: auto 1fr auto auto;
}
.span-3
{
  grid-column: span 3;
}
</style>

<div class="main-container">

  <select
    class="span-3"
    bind:value={selectedParam}
    name="filter-select"
    id="filter-select">
    <option value="null" disabled>
      -- Please select --
    </option>
  {#each rangeParams as param}
    <option value={param.name}>
      {param.name}
    </option>
  {/each}
  </select>

  <button on:click={addFilter}
    type="button">
    Add Filter
  </button>

  {#each addedRangeParams as label, idx (label.id)}
  <PictuneRange
    label={label.name}
    rangeProps={label.params}
    on:valueChanged={ev => handleValueChanged(label.name, idx, ev)}></PictuneRange>

  <button on:click={() => removeFilter(idx)} type="button">Remove</button>
  {/each}

</div>