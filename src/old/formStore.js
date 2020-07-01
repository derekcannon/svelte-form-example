import { writable, derived } from "svelte/store";

export function addField(defaultValue) {
  return writable(defaultValue);
}

function buildStructure(schema, value) {
  return schema.reduce(
    (acc, { name, value: fieldValue, fields: nestedFields }) => {
      return {
        ...acc,
        ...{
          [name]: nestedFields
            ? [buildStructure(nestedFields)]
            : addField(value != undefined ? value : fieldValue),
        },
      };
    },
    {}
  );
}

export function createForm(schema) {
  const defaultValues = writable({});
  const values = writable({});
  const visited = writable({});
  const errors = writable({});

  defaultValues.set(buildStructure(schema));
  values.set(buildStructure(schema));
  visited.set(buildStructure(schema, false));

  return {
    defaultValues,
    values,
    visited,
    errors,
  };
}
