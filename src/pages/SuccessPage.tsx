import {Circle, Icon, Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {FiCheckCircle} from 'react-icons/fi';
import {StandardLayout} from '../components/StandardLayout';

interface SuccessPageProps {}

const SuccessPage: React.FC<SuccessPageProps> = () => {
  const {t} = useTranslation(['common', 'sign-up']);
  return (
    <StandardLayout>
      <VStack align="center" pt="48">
        <Circle bg="green.500" size="8rem" mb={8}>
          <Icon color="white" boxSize="4rem" as={FiCheckCircle} />
        </Circle>
        <Text as="h1" align="center" fontSize="1.60rem">
          {t('sign-up:success-message-pt-1')}
        </Text>
        <Text as="h2" align="center" fontSize="1.3rem">
          {t('sign-up:success-message-pt-2')}
        </Text>
      </VStack>
    </StandardLayout>
  );
};

export default SuccessPage;
