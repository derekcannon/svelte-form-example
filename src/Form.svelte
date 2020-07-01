<script>
  import { tick, onMount } from "svelte";
  import {
    makeField,
    getValues,
    checkValidity,
    setAllVisited
  } from "./formHelpers";
  import form from "./formStore";
  import Input from "./Input.svelte";
  import Dropdown from "./Dropdown.svelte";

  const contactMethodTypes = [
    { value: "phone", label: "Phone" },
    { value: "email", label: "E-mail" }
  ];

  function validate() {
    // Simplistic validation example
    $form.contacts.forEach(contact => {
      contact.name.errors = [];
      if (!contact.name.value) contact.name.errors = ["Required"];

      contact.contactMethods.forEach(contactMethod => {
        contactMethod.value.errors = [];
        if (!contactMethod.value.value)
          contactMethod.value.errors = ["Required"];
      });
    });

    $form = $form; // update observable

    isValid = checkValidity($form);
    values = isValid ? getValues($form) : undefined;
  }

  function submit() {
    setAllVisited($form);
    validate();
  }

  async function addContact() {
    $form.contacts = [
      ...$form.contacts,
      {
        name: makeField(),
        contactMethods: [{ type: makeField("phone"), value: makeField() }]
      }
    ];
    await tick();
    $form.contacts[$form.contacts.length - 1].name.ref.focus();
  }

  async function addContactMethods(contactIndex) {
    $form.contacts[contactIndex].contactMethods.push({
      type: makeField("phone"),
      value: makeField()
    });
    $form = $form;
    await tick();
    const methodsLength = $form.contacts[contactIndex].contactMethods.length;
    $form.contacts[contactIndex].contactMethods[
      methodsLength - 1
    ].type.ref.focus();
  }

  let showFormState = false;
  let isValid;
  let values;

  onMount(() => {
    validate($form);
    isValid = checkValidity($form);
  });
</script>

<style>
  .nested {
    margin: 0.5rem;
    border-left: 4px solid lightgray;
    padding-left: 0.5rem;
    display: flex;
    flex-direction: column;
  }

  .nested > * {
    padding: 0.25rem;
  }

  .contact-member {
    display: flex;
  }
</style>

{#each $form.contacts as contact, contactIndex}
  <div>
    <Input label="Name" bind:value={contact.name} />

    <div class="nested">
      {#each contact.contactMethods as contactMethod}
        <div class="contact-member">
          <Dropdown
            bind:value={contactMethod.type}
            options={contactMethodTypes} />
          <Input bind:value={contactMethod.value} />
        </div>
      {/each}
      <div>
        <button on:click={() => addContactMethods(contactIndex)}>
          Add contact method
        </button>
      </div>
    </div>
  </div>
{/each}

<button on:click={addContact}>Add contact</button>

<div>
  <button on:click={submit}>Submit</button>
</div>
Form valid? {isValid}
{#if values}
  <pre>{JSON.stringify(values, null, 2)}</pre>
{/if}

<label>
  <input type="checkbox" bind:checked={showFormState} />
  Show form state
</label>
{#if showFormState}
  <pre>{JSON.stringify($form, null, 2)}</pre>
{/if}
