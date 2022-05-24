import {Button, Circle, Icon, Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {FiCheckCircle} from 'react-icons/fi';
import {StandardLayout} from '../components/StandardLayout';
import {useSession} from '../contexts/session/SessionContext';
import {useSignUpProgress} from '../hooks/use-sign-up-progress';

interface SuccessPageProps {}

const SuccessPage: React.FC<SuccessPageProps> = () => {
  useSignUpProgress('success');
  const {t} = useTranslation(['common', 'sign-up']);
  const {reset} = useSession();

  const restart = () => {
    reset();
  };
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
        <Button
          colorScheme="green"
          onClick={() => {
            restart();
          }}
        >
          {t('common:restart')}
        </Button>
      </VStack>
    </StandardLayout>
  );
};

export default SuccessPage;
