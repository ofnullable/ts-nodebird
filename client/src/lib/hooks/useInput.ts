import { useCallback, useState } from 'react';

export default (initialValue = ''): [string, ({ target }: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setter] = useState(initialValue);
  const changeHandler = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setter(target.value);
  }, []);
  return [value, changeHandler];
};
