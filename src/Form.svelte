<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import * as yup from "yup";
  import Input from "./Input.svelte";
  import Inputx from "./Inputx.svelte";
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

  const { fields, errors } = createForm([
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

<Inputx label="Company name" field={$fields.companyName} />

<div class="mt-4">
  <div class="text-orange-500 text-lg pb-4">Errors</div>
  <pre class="bg-gray-700 text-white p-4">
    {JSON.stringify($errors, null, 2)}
  </pre>
</div>

<div class="mt-4">
  <div class="text-orange-500 text-lg pb-4">Form State</div>
  <pre class="bg-gray-700 text-white p-4">
    <pre>{JSON.stringify($fields.companyName, null, 2)}</pre>
  </pre>
</div>

<div class="mt-4">
  <div class="text-orange-500 text-lg pb-4">Visited</div>
  <pre class="bg-gray-700 text-white p-4">
    <pre>{JSON.stringify($fields.visited, null, 2)}</pre>
  </pre>
</div>
