<script>
  export let label;
  export let field;
  export let errorMessage;

  const { value, visited } = field;
</script>

<div class="pb-4">
  <label class="flex">
    {#if label}
      <span class="whitespace-no-wrap pr-2">{label}:</span>
    {/if}

    <div class="w-full">
      <div>{$value}</div>
      <div>{$visited}</div>
      <input
        class="w-full box-border border border-gray-400 focus:border-blue-500
        pl-1 pr-1"
        bind:value={$value}
        on:blur={field.blur} />

      <button on:click={() => ($value = 'wow...')}>change value</button>
      {#if $visited && errorMessage}
        <div class="text-red-500 italic text-sm">
          {Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage}
        </div>
      {/if}
    </div>
  </label>
</div>
