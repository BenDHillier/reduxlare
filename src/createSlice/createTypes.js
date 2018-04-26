export default function createTypes(scope) {
  return {
    SET: `${scope}/SET`,
    UPDATE_MULTIPLE_FIELDS: `${scope}/UPDATE_MULTIPLE_FIELDS`,
    TOGGLE_FIELD: `${scope}/TOGGLE_FIELD`
  };
}
