import { isObject } from './is-object';

test('is an object', () => {
  expect(isObject({})).toBeTruthy();
});

test('is not an object', () => {
  expect(isObject('')).toBeFalsy();
});
