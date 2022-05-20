import {ComponentStyleConfig} from '@chakra-ui/react';

export const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
  color: 'gray.500',
  top: 6,
  bottom: 'auto',
  fontWeight: '600 !important',
};

export const Form: ComponentStyleConfig = {
  baseStyle: {
    container: {
      _focusWithin: {
        label: {
          ...activeLabelStyles,
        },
      },
      'input:not(:placeholder-shown) + label, textarea:not(:placeholder-shown) + .label-wrapper > label': {
        ...activeLabelStyles,
      },
      'input + label, textarea + label': {
        color: 'neutral.500',
      },
      '.label-wrapper': {
        position: 'absolute',
        width: 'calc(100% - 1rem)',
        height: '2em',
      },
      label: {
        width: '100%',
        zIndex: 1,
        top: 6,
        position: 'absolute',
        pointerEvents: 'none',
        px: 2,
        pt: 2,
        fontWeight: '300',
        transformOrigin: 'left top',
      },
      'input, textarea': {
        // color: 'gray.500',
        borderRadius: '4px 4px 0px 0px',
        borderBottomWidth: '1px',
        borderBottomColor: 'neutral.300',
        boxShadow: 'none',
        pt: 8,
        pb: 2,
        px: 2,
        _disabled: {
          bg: 'neutral.200',
          pointerEvents: 'none',
        },
        _invalid: {
          boxShadow: 'none',
        },
        _focus: {
          boxShadow: 'none',
        },
      },
      button: {
        _disabled: {
          pointerEvents: 'none',
        },
      },
    },
  },
  variants: {
    tertiary: {
      container: {
        label: {
          position: 'absolute',
          left: '-10000px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          fontSize: '0.75rem', //12px
          fontWeight: '400',
          lineHeight: '100%',
          color: 'gray.600',
          pl: 4,
        },
        input: {
          px: 6,
          pt: '.5625rem',
          pb: '.625rem',
          borderRadius: '2.75rem',
          bg: 'neutral.50',
          border: 'none',
          _focus: {
            border: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    primary: {
      container: {
        'input, textarea, .chakra-react-select, .chakra-select__option, .label-wrapper': {
          bg: 'neutral.50',
        },
      },
    },
    secondary: {
      container: {
        'input, textarea, label, .chakra-react-select, .chakra-select__option, .label-wrapper': {
          bg: 'beige.500',
        },
      },
    },
  },
  defaultProps: {
    variant: 'primary',
  },
};
