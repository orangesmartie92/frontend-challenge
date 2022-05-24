import {Select as ChakraSelect, SelectProps as ChakraSelectProps} from '@chakra-ui/select';
import {FormControl, FormLabel} from '@chakra-ui/form-control';
import {forwardRef} from '@chakra-ui/react';
import {FieldError} from './FieldError';

interface SelectProps extends ChakraSelectProps {
  /**
   * Label text for the input.
   *
   * It is also used as the placeholder text when the text field is not focused.
   */
  label: string;
  /**
   * Error text to display.
   */
  error?: React.ReactNode | string;
  /**
   * options have a label and value
   */
  options: {value: string; label: string}[];
}

export const Select = forwardRef<SelectProps, 'select'>(({id, label, error, variant, options, isDisabled, ...props}, ref) => {
  return (
    <FormControl w="100%" id={id} isInvalid={!!error} variant={variant} isDisabled={isDisabled}>
      <FormLabel>{label}</FormLabel>
      <ChakraSelect ref={ref} {...props}>
        {options.map(({label, value}) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </ChakraSelect>
      {error && <FieldError error={error} />}
    </FormControl>
  );
});
