export default ({ schema, options }) => {
  return async (values) => {
    try {
      // TODO: add .validateAt() for isolating validation to a specific field
      await schema.validate(values, options);
      return {};
    } catch (error) {
      if (Array.isArray(error.inner) && error.inner.length) {
        const x = error.inner.reduce((acc, err) => {
          if (acc[err.path]) {
            acc[err.path].push(err.message);
            return acc;
          }

          acc[err.path] = [err.message];
          return acc;
        }, {});
      } else {
        return { [error.path]: [error.message] };
      }
    }
  };
};
