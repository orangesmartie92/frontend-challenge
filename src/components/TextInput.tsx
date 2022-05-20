import React, {FocusEventHandler, useCallback} from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  FormErrorIcon,
  InputProps,
  IconButtonProps,
  forwardRef,
} from '@chakra-ui/react';
import {FiAlertCircle} from 'react-icons/fi';
import InputMask from 'react-input-mask';

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
  /**
   * Where appropriate, specify how the input should be masked.
   *
   * It is important to note that if `mask` value involves numbers, we should not set `type='number'` as this results in an error.
   */
  mask?: string;
  /**
   * Set to `true` to select all text when focused.
   */
  selectTextOnFocus?: boolean;
  /**
   * Variant `primary` is white background and variant `secondary` is beige background.
   * Variant `tertiary` is a unique text input for the footer with various different
   * default styles.
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
}

/**
 * Input field that users can type into.
 */
export const TextInput = forwardRef<TextInputProps, 'div'>(
  (
    {
      id,
      label,
      onFocus: onFocusRaw,
      isDisabled,
      error,
      endIcon,
      mask,
      selectTextOnFocus,
      variant = 'primary',
      placeholder,
      ...props
    },
    ref,
  ) => {
    const onFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
      (event) => {
        if (selectTextOnFocus) {
          event.target.setSelectionRange(0, event.target.value.length);
        }

        onFocusRaw?.(event);
      },
      [onFocusRaw, selectTextOnFocus],
    );
    const style = {};
    return (
      <FormControl w="100%" id={id} isInvalid={!!error} isDisabled={isDisabled} variant={variant}>
        <FormLabel w="100%">{label}</FormLabel>
        <InputGroup w="100%">
          {mask ? (
            <InputMask
              mask={mask}
              value={props.value}
              onChange={props.onChange}
              onKeyUp={props.onKeyUp}
              onBlur={props.onBlur}
              onFocus={onFocus}
              disabled={isDisabled}
            >
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ((inputProps: any) => (
                  <Input {...inputProps} placeholder={placeholder || ' '} />
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                )) as any
              }
            </InputMask>
          ) : (
            <Input w="100%" ref={ref} {...props} {...style} onFocus={onFocus} placeholder={placeholder || ' '} />
          )}
          {endIcon && (
            <InputRightElement bottom={0} top="auto" p={2}>
              <IconButton {...endIcon} fontSize="xl" variant="icon" isDisabled={isDisabled} />
            </InputRightElement>
          )}
        </InputGroup>
        {error && (
          <HStack color="accent.warning.500" pt={2}>
            <FormErrorIcon as={FiAlertCircle} />
            <FormErrorMessage>{error}</FormErrorMessage>
          </HStack>
        )}
      </FormControl>
    );
  },
);
