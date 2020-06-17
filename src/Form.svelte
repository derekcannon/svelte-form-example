<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import * as yup from "yup";
  import Input from "./Input.svelte";
  import { createField } from "./field";
  import { required, requiredWhen } from "./validations";
  import yupResolver from "./yupResolver";

  const schema = yup.object().shape({
    contactName: yup.string().required(),
    contactPhone: yup.string().when("contactName", {
      is: value => value,
      then: yup
        .string()
        .required("Phone required when contact entered")
        .min(8)
    })
  });

  const validate = yupResolver({ schema });

  const values = writable({
    contactName: "Derek Cannon",
    contactPhone: ""
  });

  const visited = writable({
    contactName: false,
    contactPhone: false
  });

  const errors = writable({
    contactName: null,
    contactPhone: null
  });

  function validateForm() {
    validate($values).then(errorMessages => ($errors = errorMessages));
  }

  const blur = fieldName => () => {
    validateForm(); // TODO: eventually change this to field-only validation
    $visited[fieldName] = true;
  };

  onMount(() => {
    validateForm();
  });
</script>

<div class="text-orange-500 text-2xl pb-4">My Form</div>

<Input
  label="Contact name"
  bind:value={$values.contactName}
  visited={$visited.contactName}
  on:blur={blur('contactName')}
  errorMessage={$errors.contactName} />

<Input
  label="Contact phone"
  bind:value={$values.contactPhone}
  visited={$visited.contactPhone}
  on:blur={blur('contactPhone')}
  errorMessage={$errors.contactPhone} />

<div class="mt-4">
  <div class="text-orange-500 text-lg pb-4">Errors</div>
  <pre class="bg-gray-700 text-white p-4">
    {JSON.stringify($errors, null, 2)}
  </pre>
</div>

<div class="mt-4">
  <div class="text-orange-500 text-lg pb-4">Values</div>
  <pre class="bg-gray-700 text-white p-4">
    <pre>{JSON.stringify($values, null, 2)}</pre>
  </pre>
</div>

<div class="mt-4">
  <div class="text-orange-500 text-lg pb-4">Visited</div>
  <pre class="bg-gray-700 text-white p-4">
    <pre>{JSON.stringify($visited, null, 2)}</pre>
  </pre>
</div>
