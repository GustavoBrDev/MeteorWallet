import SimpleSchema from "simpl-schema";

SimpleSchema.defineValidationErrorTransform((error) => {
  const ddpError = new Meteor.Error(error.message);
  ddpError.error = "validation-error";
  // @ts-ignore
  ddpError.details = error.details;
  return ddpError;
});