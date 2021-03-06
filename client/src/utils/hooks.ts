import { useState } from 'react';

export const useForm = (callback: () => void, initState: any = {}) => {
    
    const [inputs, setInputs] = useState(initState);

    const onSubmit = (e) => {
        e.preventDefault();
        callback();
      };
    
      const onChange = (e) => {
        setInputs({
          ...inputs,
          [e.target.name]: e.target.value,
        });
      };

      return {
        onChange,
        onSubmit,
        inputs,
      };
}