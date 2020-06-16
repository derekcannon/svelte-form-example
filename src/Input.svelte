<script>
  export let label;
  export let field;
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
        value={$field.value}
        on:change={event => field.change(event.target.value)}
        on:focus={field.focus}
        on:blur={field.blur} />

      {#if $field.errors}
        <div class="text-red-500 italic text-sm">
          {#each $field.errors as error}{error}{/each}
        </div>
      {/if}
    </div>
  </label>
</div>
