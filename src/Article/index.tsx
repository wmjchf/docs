import React from 'react';

export default ({ title }: { title: string }) => <h1>{title}</h1>;

type Extract<T, U extends T> = T extends U ? T : never;

interface Person {
  name: string;
  age: number;
}

type Phone = 'xiaomi' | 'apple' | 'huawei' | 'vivo';

type IPhone = Extract<Phone, 'apple' | 'huawei'>;
