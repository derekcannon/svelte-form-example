import { writable } from "svelte/store";

export function createField(name, defaultValue, validations = []) {
  const { subscribe, update, set } = writable({
    name,
    defaultValue,
    value: defaultValue,
    visited: false,
    focused: false,
    pristine: true,
    errors: null,
    validations,
  });

  console.log("field created");

  return {
    subscribe,
    change: (value) => update((state) => ({ ...state, value })),
    focus: () =>
      update((state) => ({
        ...state,
        focused: true,
        visited: true,
      })),
    blur: () =>
      update((state) => {
        // const errors = validations.map((fn) => fn(state.value)).filter(Boolean);
        const errors = [];

        return {
          ...state,
          focused: false,
          pristine: state.value === state.defaultValue,
          errors: errors.length ? errors : null,
        };
      }),
  };
}
