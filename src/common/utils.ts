import Joi from "@hapi/joi";
import fs from "fs";
import _ from "lodash";

import errors from "./errors";
// import column from "./constants/sorting_column";

const TYPE_OF_OBJECT = "object";
const TYPE_OF_STRING = "string";

const validate = (schema, req, next) => {
  const params = {
    ...req?.query,
    ...req?.body,
    ...req?.params,
  };

  const { value, error } = Joi.object(schema).validate(params);
  if (error) {
    const { details } = error;
    const message =
      details.length > 0 ? details[0].message : "요청 값 오류 입니다.";
    next(
      new Error(
        errors.encode({
          hint: "요청 파라메터 오류",
          message: message,
          status: 400,
        })
      )
    );
    // throw new Error(
    //   errors.encode({
    //     hint: "요청 파라메터 오류",
    //     message: message,
    //     status: 400,
    //   })
    // );
  }

  return value;
};

// schema: Runner's Joi.Schema
// parameters: Runner's parameter
const validateSchema = (schema, parameters) => {
  const { value, error } = Joi.object(schema).validate(parameters);
  if (error) {
    const { details } = error;
    const message =
      details.length > 0 ? details[0].message : "요청 값 오류 입니다.";
    // throw new Error(
    //   errors.encode({
    //     hint: "요청 파라메터 오류",
    //     message: message,
    //     status: 400,
    //   })
    // );
  }

  return value;
};

const toRows = (result) => {
  if (!result) {
    throw new Error(errors.internal("invalid parameter error: toRows()"));
  }

  const camelCaseRows = result.map((snakeCaseRow) => toCamelCase(snakeCaseRow));

  return camelCaseRows;
};

const toCamelCase = (params) => {
  if (_.isUndefined(params) || _.isNull(params)) {
    // throw new Error(errors.internal("invalid parameter error: toCamelCase()"));
  }

  if (typeof params === TYPE_OF_OBJECT) {
    return _.mapKeys(params, (value, key) => {
      return _.camelCase(key);
    });
  }

  if (typeof params === TYPE_OF_STRING) {
    return _.camelCase(params);
  }

  return params;
};

/**
 *
 * @param params
 * @returns {string|Dictionary<unknown>|*}
 */
const toSnakeCase = (params) => {
  if (_.isUndefined(params) || _.isNull(params)) {
    // throw new Error(errors.internal("invalid parameter error: toSnakeCase()"));
  }

  if (typeof params === TYPE_OF_OBJECT) {
    return _.mapKeys(params, (value, key) => {
      return _.snakeCase(key);
    });
  }

  if (typeof params === TYPE_OF_STRING) {
    return _.snakeCase(params);
  }

  return params;
};

/**
 * Get Object which has snake case key
 * @param result
 * @returns {*}
 */
const toSnakeCaseRows = (result) => {
  //   if (!result) {
  //     throw new Error(errors.internal("invalid parameter error: toRows()"));
  //   }
  //   return result[0];
  // };
  //   const result = key.replace(/([A-Z])/g, " $1");
  //   return result.split(" ").join("_").toLowerCase();
};

/**
 * ex) cat.1.32.jpg => {fileName: 'cat.1.32', extension: 'jpg'}
 * @param originFileName
 * @returns {{fileName: string, extension: string}}
 */
function getFileName(originFileName) {
  if (!originFileName) {
    // throw new Error(errors.internal("invalid parameter error: getFileName()"));
  }

  const splitFileNames = originFileName.split(".");

  return {
    fileName: _.slice(splitFileNames, 0, splitFileNames.length - 1)
      .join(".")
      .replace(/[()]/g, "_"),
    extension: _.last(splitFileNames),
  };
}

export default {
  toRows,
  getFileName,
  toCamelCase,
  toSnakeCase,
  toSnakeCaseRows,
  validate,
  validateSchema,
};
