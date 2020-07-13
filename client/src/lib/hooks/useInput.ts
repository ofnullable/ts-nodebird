import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export default (
  initialValue = ''
): [
  string,
  ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  Dispatch<SetStateAction<string>>
] => {
  const [value, setter] = useState(initialValue);
  const changeHandler = useCallback(({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(target.value);
  }, []);
  return [value, changeHandler, setter];
};
