import {
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps,
} from '@chakra-ui/checkbox';
import {FormControl, FormLabel} from '@chakra-ui/form-control';
import {forwardRef} from '@chakra-ui/react';
import {FieldError} from './FieldError';

interface CheckboxProps extends ChakraCheckboxProps {
  /**
   * Error text to display.
   */
  error?: React.ReactNode | string;
  /**
   * options have a label and value
   */
  children: React.ReactNode;
}

export const Checkbox = forwardRef<CheckboxProps, 'input'>(
  ({id, error, variant, children, isDisabled, ...props}, ref) => {
    return (
      <FormControl w="100%" id={id} isInvalid={!!error} variant={variant} isDisabled={isDisabled}>
        <ChakraCheckbox ref={ref} {...props}>
          {children}
        </ChakraCheckbox>
        {error && <FieldError error={error} />}
      </FormControl>
    );
  },
);
