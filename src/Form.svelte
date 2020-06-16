<script>
  import { writable } from "svelte/store";
  import Input from "./Input.svelte";
  import { createField } from "./field";
  import { required } from "./validations";

  const firstName = createField("Derek", [required]);
  const lastName = createField("Cannon", [required]);

  $: formState = {
    firstName: $firstName,
    lastName: $lastName
  };
</script>

<div class="text-orange-500 text-2xl pb-4">My Form</div>

<Input label="First name" field={firstName} />
<Input label="Last name" field={lastName} />

<div class="mt-4">
  <div class="text-orange-500 text-lg pb-4">Form State</div>
  <pre class="bg-gray-700 text-white p-4">
    {JSON.stringify(formState, null, 2)}
  </pre>
</div>
