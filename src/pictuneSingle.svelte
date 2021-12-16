<script>
  import { RANGE_PARAM_PARAMS } from './constants'
  import { processStyle, getId } from './util'
  import PictuneRange from './pictuneRange.svelte'
  import { onDestroy } from 'svelte'
  export let applyToSelector;
  export let paramName = 'brightness';
  
  const paramObj = RANGE_PARAM_PARAMS.find(p => p.name === paramName)
  function handleValueChanged(event) {
    const el = document.querySelector(applyToSelector)
    const styleString = processStyle(paramName, event.detail.value)
    if (!!el) el.style.filter = styleString
  }
</script>

<PictuneRange
  label={paramName}
  rangeProps={paramObj.params}
  on:valueChanged={handleValueChanged}>
</PictuneRange>
