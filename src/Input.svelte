<script>
  export let label;
  export let value;
  export let errorMessage;
  export let visited;
</script>

<div class="pb-4">
  <label class="flex">
    {#if label}
      <span class="whitespace-no-wrap pr-2">{label}:</span>
    {/if}

    <div class="w-full">
      <input
        class="w-full box-border border border-gray-400 focus:border-blue-500
        pl-1 pr-1"
        bind:value
        on:blur />

      {#if visited && errorMessage}
        <div class="text-red-500 italic text-sm">
          {Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage}
        </div>
      {/if}
    </div>
  </label>
</div>
