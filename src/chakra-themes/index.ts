/**
 * For reference: https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme/src
 *
 * The above reference provides info on how the Chakra team suggests one should structure a theme
 */

// theme/index.js
import {ChakraTheme, extendTheme} from '@chakra-ui/react';

// Component style overrides
import {Text} from './components';

const overrides: Partial<ChakraTheme> = {
  components: {
    Text,
  },
};

export const theme = extendTheme(overrides);
