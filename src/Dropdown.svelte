<script>
  export let options;
  export let value;
</script>

<style>
  select {
    max-height: 26px;
  }
</style>

<select bind:value={value.value} bind:this={value.ref}>
  {#each options as option}
    <option value={option.value}>{option.label}</option>
  {/each}
</select>
