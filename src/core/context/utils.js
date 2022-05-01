const getContextName = (context) => {
  if (Array.isArray(context) && context.length > 0) {
    return context[0];
  }
  return undefined;
};

export default { getContextName };
