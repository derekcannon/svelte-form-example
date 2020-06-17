<script>
  import { onMount } from "svelte";
  import { writable, derived } from "svelte/store";
  import Input from "./Input.svelte";
  import { createField } from "./field";
  import { required, requiredWhen } from "./validations";

  const values = writable({
    firstName: "Derek",
    lastName: ""
  });

  const visited = writable({
    firstName: false,
    lastName: false
  });

  const validations = writable({
    firstName: [[required, null, ["lastName"]]], // [validationFn, depFields[], affectedFields]
    lastName: [[requiredWhen, ["firstName"]]]
  });

  const errors = writable({
    firstName: null,
    lastName: null
  });

  function validateField(fieldName, validation) {
    const [validationFn, depFieldNames, affectedFieldNames] = validation;
    let depErrorMessages = {};
    let depValues = [];

    if (depFieldNames) {
      depValues = depFieldNames.map(depFieldName => [
        depFieldName,
        $values[depFieldName]
      ]);
    }

    if (affectedFieldNames) {
      const depFieldValidations = affectedFieldNames.map(affectedFieldName => {
        const depValidations = $validations[affectedFieldName];
        return [
          affectedFieldName,
          depValidations.filter(validation => {
            const [_, depFieldName = []] = validation;
            return depFieldName.includes(fieldName);
          })
        ];
      });

      depErrorMessages = depFieldValidations.reduce((acc, fieldValidations) => {
        const [fieldName, validations] = fieldValidations;
        acc[fieldName] = validations.map(validation =>
          validateField(fieldName, validation)
        );
        return acc;
      }, {});
    }

    return {
      [fieldName]: validationFn($values[fieldName], ...depValues),
      ...depErrorMessages
    };
  }

  function validateForm() {
    Object.keys($values).forEach(fieldName => {
      const validations = $validations[fieldName];
      if (!validations || !validations.length) return;

      const messages = validations
        .flatMap(validation => validateField(fieldName, validation))
        .filter(Boolean);

      debugger;
      $errors[fieldName] = messages.length ? messages[fieldName] : null;
    });
  }

  onMount(() => {
    validateForm();
  });

  function blur(fieldName) {
    const validations = $validations[fieldName];
    if (!validations) return;

    return validations
      .map(validation => validateField(fieldName, validation))
      .filter(Boolean);
  }
</script>

<div class="text-orange-500 text-2xl pb-4">My Form</div>

<input
  bind:value={$values.firstName}
  on:blur={() => {
    const messages = blur('firstName');
    $errors.firstName = messages.length ? messages : null;
    $visited.firstName = true;
  }}
  class="w-full box-border border border-gray-400 focus:border-blue-500 pl-1
  pr-1" />
{#if $errors.firstName}{$errors.firstName.join(', ')}{/if}

<input
  bind:value={$values.lastName}
  on:blur={() => {
    const messages = blur('lastName');
    $errors.lastName = messages.length ? messages : null;
    $visited.lastName = true;
  }}
  class="w-full box-border border border-gray-400 focus:border-blue-500 pl-1
  pr-1" />
{#if $errors.lastName}{$errors.lastName.join(', ')}{/if}

<div class="mt-4">
  <div class="text-orange-500 text-lg pb-4">Form Errors</div>
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
