export default function createActionCreators(
  ActionTypes,
  fields,
  type,
  prefix
) {
  function updateField(value, field) {
    return {
      type,
      field,
      value
    };
  }
  const actionCreators = {};
  fields.forEach(field => {
    const action = createActionCreatorName(field);
    actionCreators[action] = value => updateField(value, field);
  });
  return actionCreators;
}

function createActionCreatorName(fieldName) {
  return `${prefix}${fieldName[0].toUpperCase()}${fieldName.slice(1)}`;
}
