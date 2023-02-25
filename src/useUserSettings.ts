import { useState } from 'react';

const tryParseJson = (maybeJson: any): any => {
  try {
    const res = JSON.parse(maybeJson);
    return res;
  } catch {
    return maybeJson;
  }
};

const getKey = (key?: string, prefix?: string) =>
  key ? `${prefix}${key}` : '';

const getLocalStorageValue = (key: string) =>
  tryParseJson(localStorage.getItem(key));

const setLocalStorageValue = <T>(key: string, value: T) =>
  localStorage.setItem(key, JSON.stringify(value));

export const useUserSettings = <T>(
  defaultValue?: T | (() => T),
  key?: string,
  prefix = 'uus_p_'
) => {
  const thisKey = getKey(key, prefix);

  const [value, setValue] = useState<T>(() =>
    thisKey ? getLocalStorageValue(thisKey) ?? defaultValue : defaultValue
  );

  const handleChange = (value: T) => {
    setValue(value);
    !!thisKey && setLocalStorageValue(thisKey, value);
  };

  return [value, handleChange] as const;
};
