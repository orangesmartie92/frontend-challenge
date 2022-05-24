import React from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  FormControl,
  FormLabel,
  InputProps,
  IconButtonProps,
  forwardRef,
} from '@chakra-ui/react';
import {FieldError} from './FieldError';

export interface TextInputProps extends InputProps {
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
   * Specify the icon to show, what happens when icon is clicked, and aria-label for the icon.
   */
  endIcon?: IconButtonProps;
}

/**
 * Input field that users can type into.
 */
export const TextInput = forwardRef<TextInputProps, 'input'>(
  ({id, label, isDisabled, error, endIcon, placeholder, variant, ...props}, ref) => {
    const style = {};
    return (
      <FormControl w="100%" id={id} isInvalid={!!error} variant={variant} isDisabled={isDisabled}>
        <FormLabel w="100%">{label}</FormLabel>
        <InputGroup w="100%">
          <Input w="100%" ref={ref} {...props} {...style} placeholder={placeholder || ' '} />
          {endIcon && (
            <InputRightElement bottom={0} top="auto" p={2}>
              <IconButton {...endIcon} fontSize="xl" isDisabled={isDisabled} />
            </InputRightElement>
          )}
        </InputGroup>
        {error && <FieldError error={error} />}
      </FormControl>
    );
  },
);
