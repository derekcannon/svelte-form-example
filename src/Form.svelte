<script>
    import { writable } from "svelte/store";
    import { ValidationError } from "yup";
    import * as yup from "yup";
    import Input from "./Input.svelte";

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
    })

    const firstName = writable("Derek")
    const lastName = writable("Cannon")
    let errors = {};

    $: formState = {
        firstName: $firstName,
        lastName: $lastName,
    }

    async function validate() {
        try {
            await schema.validate(formState, { abortEarly: false }).then(() => {
                errors = {};
            })
        } catch(yupErrors) {
            if (yupErrors instanceof ValidationError) {
                errors = yupErrors.inner.reduce((acc, validationError) => {
                    acc[validationError.path] = validationError.message;
                    return acc;
                }, {});
            }
        }
    }
</script>

<div class="text-orange-500 text-2xl pb-4">My Form</div>

<Input label="First name" bind:value={$firstName} on:blur={validate} error={errors.firstName} />
<Input label="Last name" bind:value={$lastName} on:blur={validate} error={errors.lastName} />

<div class="mt-4">
    <div class="text-orange-500 text-lg pb-4">Form State</div>
    <pre class="bg-gray-700 text-white p-4">{JSON.stringify(formState, null, 2)}</pre>
</div>