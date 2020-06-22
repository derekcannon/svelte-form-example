<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import * as yup from "yup";
  import Input from "./Input.svelte";
  import { createForm } from "./formStore";
  import yupResolver from "./yupResolver";

  const schema = yup.object().shape({
    companyName: yup.string().required(),
    contacts: yup.array().of(
      yup.object().shape({
        name: yup.string().required(),
        phone: yup
          .string()
          .required()
          .min(8)
      })
    ),
    contactPhone: yup.string().when("contactName", {
      is: value => value,
      then: yup
        .string()
        .required("Phone required when contact entered")
        .min(8)
    })
  });

  const validate = yupResolver({ schema });

  const { values, visited, errors } = createForm([
    {
      name: "companyName",
      value: "Derek Cannon Inc"
    },
    {
      name: "contacts",
      fields: [
        { name: "name", value: "Derek" },
        { name: "phone", value: "555-555-5555" }
      ]
    }
  ]);

  function validateForm() {
    validate($values).then(errorMessages => ($errors = errorMessages));
  }

  const blur = fieldName => () => {
    validateForm(); // TODO: eventually change this to field-only validation

    const isNestedField = fieldName.match(/\./);

    if (!isNestedField) {
      $visited[fieldName] = true;
    } else {
      // TODO: Fix nested fields
    }
  };

  function addContact() {
    $values.contacts = [...$values.contacts, { name: "", phone: "" }];
    $visited.contacts = [...$visited.contacts, { name: false, phone: false }];
  }

  onMount(() => {
    // validateForm();
  });
</script>

<div class="text-orange-500 text-2xl pb-4">My Form</div>

<Input
  label="Company name"
  bind:value={$values.companyName}
  visited={$visited.companyName}
  on:blur={blur('companyName')}
  errorMessage={$errors.companyName} />

{#each $values.contacts as contact, index}
  <Input
    label="Contact name"
    bind:value={contact.name}
    visited={true}
    on:blur={blur(`contacts[${index}].name`)}
    errorMessage={$errors[`contacts[${index}].name`]} />

  <Input
    label="Contact phone"
    bind:value={contact.phone}
    visited={true}
    on:blur={blur(`contacts[${index}].phone`)}
    errorMessage={$errors[`contacts[${index}].phone`]} />
{/each}

<button class="border border-blue-500 px-4 py-2" on:click={addContact}>
  Add contact
</button>

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
