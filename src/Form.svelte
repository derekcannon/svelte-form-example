<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import * as yup from "yup";
  import Input from "./Input.svelte";
  import { createForm, addField } from "./formStore";
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
    )
    // contactPhone: yup.string().when("contactName", {
    // is: value => value,
    // then: yup
    // .string()
    // .required("Phone required when contact entered")
    // .min(8)
    // })
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
    // validate($values).then(errorMessages => ($errors = errorMessages));
  }

  const blur = () => {
    validateForm();
  };

  onMount(() => {
    // validateForm();
  });
</script>

<div class="text-orange-500 text-2xl pb-4">My Form</div>

<div class="text-orange-500 text-lg pb-4">Company details</div>

<Input
  label="Company name"
  value={$values.companyName}
  visited={$visited.companyName} />

<div class="text-orange-500 text-lg pb-4">Contacts</div>

{#each $values.contacts as contact, index}
  <div class="rounded shadow-lg p-4">
    <Input
      label="Name"
      value={contact.name}
      visited={$visited.contacts[index].name} />
    <Input
      label="Phone"
      value={contact.phone}
      visited={$visited.contacts[index].phone} />
  </div>
{/each}

<div class="pt-4 flex flex-row-reverse">
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Add contact
  </button>
</div>

<div class="mt-4">
  <div class="text-orange-500 text-lg pb-4">Errors</div>
  <pre class="bg-gray-700 text-white p-4">
    {JSON.stringify($errors, null, 2)}
  </pre>
</div>

<div class="mt-4">
  <div class="text-orange-500 text-lg pb-4">Form State</div>
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
