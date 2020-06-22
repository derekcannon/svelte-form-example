import { writable } from "svelte/store";

export function addField(defaultValue) {
  const value = writable(defaultValue);
  const visited = writable(false);

  // const field = writable({
  // value: writable(defaultValue),
  // visited: false,
  // });

  function blur() {
    visited.update(() => true);
  }

  // function set(field) {
  // value.update(() => field);
  // }

  return {
    // subscribe: field.subscribe,
    blur,
    // set,
    value,
    visited: visited,
  };
}

function buildFields(schema) {
  return schema.reduce((acc, { name, value, fields: nestedFields }) => {
    const x = {
      ...acc,
      ...{
        [name]: nestedFields ? [buildFields(nestedFields)] : addField(value),
      },
    };

    console.log(x);
    return x;
  }, {});
}

export function createForm(schema) {
  const fields = writable({});
  const errors = writable({});

  fields.set(buildFields(schema));

  return { fields, errors };
}
