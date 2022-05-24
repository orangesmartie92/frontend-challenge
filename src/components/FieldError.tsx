import {FormErrorIcon, FormErrorMessage, HStack} from '@chakra-ui/react';
import {FiAlertCircle} from 'react-icons/fi';

export interface FieldErrorProps {
  error: React.ReactNode | string;
}

export const FieldError: React.FC<FieldErrorProps> = ({error}) => {
  return (
    <HStack color="red.500" pt={2}>
      <FormErrorIcon as={FiAlertCircle} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </HStack>
  );
};
