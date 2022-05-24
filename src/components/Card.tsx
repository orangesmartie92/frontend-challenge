import {Box} from '@chakra-ui/react';
import React from 'react';

export interface CardProps {
  /**
   * children
   */
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({children}) => {
  return (
    <Box
      rounded={4}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      _focusWithin={{
        boxShadow: 'lg',
        borderColor: 'transparent',
      }}
    >
      {children}
    </Box>
  );
};
