import {useCallback, useState} from 'react';
import {FiEye, FiEyeOff} from 'react-icons/fi';

type UsePasswordTextInputProps = (label: string) => {
  type: string;
  endIcon: {
    icon: React.ReactElement;
    onClick: () => void;
    'aria-label': string;
  };
};

export const usePasswordTextInputProps: UsePasswordTextInputProps = (label) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);

  return {
    type: showPassword ? 'text' : 'password',
    endIcon: {
      'aria-label': label,
      icon: showPassword ? <FiEye /> : <FiEyeOff />,
      onClick: togglePassword,
    },
  };
};
