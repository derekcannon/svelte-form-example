<script>
  export let label;
  export let value;
  export let errorMessage;
  export let visited;
</script>

<div class="pb-4">
  <label>
    {#if label}
      <div class="whitespace-no-wrap pb-1">{label}:</div>
    {/if}

    <div class="w-full">
      <input
        class="w-full box-border border border-gray-400 focus:border-blue-500
        pl-1 pr-1"
        bind:value={$value}
        on:blur />

      {#if visited && errorMessage}
        <div class="text-red-500 italic text-sm">
          {Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage}
        </div>
      {/if}
    </div>
  </label>
</div>
