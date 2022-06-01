import React from 'react';
function pickSingleValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const person = {
  name: '奥特曼',
  age: 12,
};
const name = pickSingleValue(person, 'name');
const age = pickSingleValue(person, 'age');
export default ({ title }: { title: string }) => <h1>{title}</h1>;
