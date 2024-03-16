import * as yup from "yup";

export const buildResponse = (success: boolean, data: any, message: any) => {
  let res = {
    success: success ? 1 : 0,
    data: data,
    message: message,
  };

  const keys = Object.keys(res) as (keyof typeof res)[];
  keys.forEach((key) => {
    if (res[key] == undefined) {
      res[key] = null;
    }
  });

  return res;
};
export const successResponse = (data?: any, message?: any) => {
  return buildResponse(true, data, message);
};

export const failResponse = (message?: any, data?: any) => {
  return buildResponse(false, data, message);
};

export const buildValidationErrorResponse = (
  err: any
): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (err instanceof yup.ValidationError) {
    if (err.inner.length > 0) {
      err.inner.forEach((e) => {
        if (e.path != undefined) {
          errors[e.path] = e.message;
        }
      });
    } else {
      if (err.path != undefined) {
        errors[err.path] = err.errors[0];
      }
    }
  }
  return errors;
};
