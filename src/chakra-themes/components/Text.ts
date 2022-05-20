import {ComponentStyleConfig} from '@chakra-ui/react';

export const captionStyles = {
  fontSize: '0.75rem', // 12px
  lineHeight: '140%',
};

export const Text: ComponentStyleConfig = {
  baseStyle: {
    lineHeight: '150%',
    letterSpacing: '0.02em',
  },
  sizes: {
    body: {
      fontSize: {base: '0.9375rem', sm: '1rem'}, // 15px, 16px
      fontWeight: 300,
    },
    'page-header': {
      fontSize: {base: '1.5rem', sm: '2.15rem'},
    },
  },
  variants: {
    light: {
      color: 'neutral.50',
    },
    dark: {
      color: 'neutral.900',
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'body',
  },
};
