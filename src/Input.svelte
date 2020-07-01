<script>
  export let value;
  export let label = null;

  function focus() {
    value.focused = true;
  }

  function blur() {
    value.focused = false;
    value.visited = true;
  }
</script>

<style>
  .visited {
    @apply border-purple-600;
  }
  .focused {
    @apply border-solid border-green-700 bg-green-100;
  }
</style>

<div class="pb-4">
  <label>
    {#if label}
      <div class="whitespace-no-wrap pb-1">{label}:</div>
    {/if}

    <div class="w-full">
      <input
        class="w-full box-border border border-gray-400 pl-1 pr-1"
        class:focused={value.focused}
        class:visited={value.visited}
        bind:value={value.value}
        bind:this={value.ref}
        on:focus={focus}
        on:blur={blur} />

      {#if value.visited && value.errors.length}
        <div class="text-red-500 italic text-sm">{value.errors.join(', ')}</div>
      {/if}
    </div>
  </label>
</div>
