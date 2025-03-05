import { useState } from 'react';

export const useForm = <T extends object>(initialState: T) => {

  const [values, setValues] = useState<T>(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {

    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return [values, handleInputChange, reset] as const;
};



