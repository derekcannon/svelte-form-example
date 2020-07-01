export function makeField(value = "") {
  return {
    value,
    focused: false,
    visited: false,
    errors: [],
    ref: null,
  };
}

export function getValues(form) {
  return getDeepProperties(form, "value");
}

function getDeepProperties(obj, prop) {
  if (typeof obj === "object") {
    const keyValuePairs = Object.entries(obj);
    if (keyValuePairs.length === 0) return {};

    return keyValuePairs.reduce((acc, [key, value]) => {
      return {
        ...acc,
        ...{
          [key]: Array.isArray(value)
            ? value.map((nestedObj) => getDeepProperties(nestedObj, prop))
            : value[prop],
        },
      };
    }, {});
  }
}

export function checkValidity(form) {
  return isDeepPropertyEmpty(form, "errors");
}

function isDeepPropertyEmpty(obj, prop) {
  if (Array.isArray(obj)) {
    if (obj.length === 0) return true;
    return obj.every((nestedObj) => isDeepPropertyEmpty(nestedObj, prop));
  }

  if (typeof obj === "object") {
    if (obj["errors"]) return isDeepPropertyEmpty(obj[prop], prop);

    return Object.entries(obj).reduce((acc, [_, value]) => {
      return acc && isDeepPropertyEmpty(value, prop);
    }, true);
  }
}

export function setAllVisited(form) {
  return setDeepValue(form, "visited", true);
}

function setDeepValue(obj, prop, newValue) {
  if (Array.isArray(obj)) {
    return obj.forEach((nestedObj) => setDeepValue(nestedObj, prop, newValue));
  }

  if (typeof obj === "object") {
    if (obj.hasOwnProperty(prop)) {
      return (obj[prop] = newValue);
    }

    return Object.entries(obj).forEach(([_, value]) =>
      setDeepValue(value, prop, newValue)
    );
  }
}
