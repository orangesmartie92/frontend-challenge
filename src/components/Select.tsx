import {Select as ChakraSelect, SelectProps as ChakraSelectProps} from '@chakra-ui/select';
import {FormControl} from '@chakra-ui/form-control';

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

const Select: React.FC<SelectProps> = ({id, label, error, options, ...props}) => {
  return (
    <FormControl id={id}>
      <ChakraSelect {...props}>
        {options.map(({label, value}) => (
          <option key={`${label}`} value={`${value}`}>
            {label}
          </option>
        ))}
      </ChakraSelect>
    </FormControl>
  );
};

export default Select;
