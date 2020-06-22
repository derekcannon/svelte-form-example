import { writable } from "svelte/store";

function buildValues(fields, value) {
  return fields.reduce(
    (acc, { name, value: fieldValue, fields: nestedFields }) => {
      const val = value !== undefined ? value : fieldValue;

      return {
        ...acc,
        ...{
          [name]: nestedFields ? [buildValues(nestedFields, value)] : val,
        },
      };
    },
    {}
  );
}

export function createForm(fields) {
  const values = writable({});
  const visited = writable({});
  const errors = writable({});

  values.set(buildValues(fields));
  visited.set(buildValues(fields, false));

  return {
    values,
    visited,
    errors,
  };
}
