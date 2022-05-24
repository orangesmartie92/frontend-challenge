import {Box, Container, Flex, Text, VStack} from '@chakra-ui/react';
import {Image} from '@chakra-ui/react';
import Logo from '../assets/images/logo.png';
import React from 'react';

export interface StandardLayoutProps {
  /**
   * page title
   */
  title?: string;
  /**
   * children
   */
  children: React.ReactNode;
}

export const StandardLayout: React.FC<StandardLayoutProps> = ({title, children}) => {
  return (
    <Container pt={{base: 10, sm: 42}} w={{base: 'full', sm: 'md', md: 'lg'}} mx="auto">
      <VStack w="100%" align="stretch">
        <VStack mb={4} spacing={10}>
          <Flex justify="center">
            <Box>
              <Image src={Logo} w="75%" mx="auto" />
            </Box>
          </Flex>
          {title && (
            <Text as="h1" align="center" size="page-header">
              {title}
            </Text>
          )}
        </VStack>
        {children}
      </VStack>
    </Container>
  );
};
