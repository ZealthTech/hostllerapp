export const DEFAULT_ERROR_STATUS = 500;
export const NETWORK_ERROR_STATUS = 599;

/**
 * API expected reponse codes
 */
export const API_RESPONSE_SUCCESS = 200;
export const API_RESPONSE_CREATE_SUCCESS = 201;
export const API_RESPONSE_AUTHENTICATION_ERROR = 401;
export const API_RESPONSE_AUTHENTICATION_BAD_REQUEST = 400;
export const API_RESPONSE_FORBIDDEN = 403;
export const API_RESPONSE_NOT_FOUND = 404;
export const API_RESPONSE_TIMEOUT = 408;

/**
 *  Error String
 */
export const DEFAULT_ERROR_STRING =
  'Something went wrong try again after sometime';
export const NETWORK_ERROR_STRING = 'No Internet Connection';
/**
 * API Headers
 */
export const API_HEADER_AUTHORIZATION_KEY = 'authorization';
export const API_HEADER_AUTHORIZATION_ACCESS_TOKEN_KEY = 'access_token';
export const API_HEADER_AUTHORIZATION_VALUE = `Basic ${API_HEADER_AUTHORIZATION_ACCESS_TOKEN_KEY}`;
export const API_HEADER_AUTHORIZATION_BEARER_VALUE = `Bearer ${API_HEADER_AUTHORIZATION_ACCESS_TOKEN_KEY}`;
export const API_HEADER_CONTENT_TYPE_KEY = 'Content-Type';
export const API_HEADER_CONTENT_TYPE_MULTIPART_FORM_DATA =
  'multipart/form-data';
export const API_HEADER_CONTENT_TYPE_JSON_VALUE = 'application/json';
