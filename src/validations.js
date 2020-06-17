export function required(value, customMessage) {
  return value ? null : customMessage || "Required";
}

export const requiredWhen = (value, [depFieldName, depFieldValue]) => {
  return depFieldValue
    ? required(value, `Required when ${depFieldName} is set`)
    : null;
};
