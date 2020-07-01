import { writable } from "svelte/store";
import { makeField } from "./formHelpers";

export default writable({
  contacts: [
    {
      name: makeField("Joe Blows"),
      contactMethods: [
        {
          type: makeField("phone"),
          value: makeField(""),
        },
        {
          type: makeField("email"),
          value: makeField("example@test.com"),
        },
      ],
    },
  ],
});
