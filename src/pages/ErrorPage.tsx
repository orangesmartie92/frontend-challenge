import {Button, Circle, Icon, Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {BsQuestionLg} from 'react-icons/bs';
import {StandardLayout} from '../components/StandardLayout';
import {useSession} from '../contexts/session/SessionContext';
import {useSignUpProgress} from '../hooks/use-sign-up-progress';

interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = () => {
  useSignUpProgress('error');
  const {t} = useTranslation(['common', 'sign-up']);
  const {reset} = useSession();

  return (
    <StandardLayout>
      <VStack align="center" pt="48">
        <Circle bg="red.500" size="8rem" mb={8}>
          <Icon color="white" boxSize="4rem" as={BsQuestionLg} />
        </Circle>
        <Text as="h1" align="center" fontSize="1.60rem">
          {t('sign-up:error-message-pt-1')}
        </Text>
        <Text as="h2" align="center" fontSize="1.3rem">
          {t('sign-up:error-message-pt-2')}
        </Text>
        <Button
          colorScheme="green"
          onClick={() => {
            reset();
          }}
        >
          {t('common:restart')}
        </Button>
      </VStack>
    </StandardLayout>
  );
};

export default ErrorPage;
