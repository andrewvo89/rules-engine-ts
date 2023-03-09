import isPlainObject from 'lodash.isplainobject';

export function isObject(value: any): value is object {
  return isPlainObject(value);
}
