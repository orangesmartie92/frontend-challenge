import {Button, Flex, Icon, Stack, Text} from '@chakra-ui/react';
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import {FiCheckCircle} from 'react-icons/fi';
import {useNavigate} from 'react-router-dom';
import {Card} from '../components/Card';
import {StandardLayout} from '../components/StandardLayout';
import {useSession} from '../contexts/session/SessionContext';
import {usePromiseFnTask} from '../hooks/use-promise-fn-task';
import {useSignUpProgress} from '../hooks/use-sign-up-progress';
import {errorPath, moreInfoPath, successPath} from '../utils/constants/urls';

interface ConfirmationPageProps {}

const ConfirmationPage: React.FC<ConfirmationPageProps> = () => {
  const {setProgress} = useSignUpProgress('confirmation');
  const navigate = useNavigate();
  const {signUpData, setValues} = useSession();
  const {name, email, password, color, terms} = signUpData;
  const {t} = useTranslation(['common', 'confirmation']);

  const {call: signUp, type: signUpState} = usePromiseFnTask(async () => {
    try {
      const response = await axios.post('/api/submit', {
        name,
        email,
        password,
        color,
        terms,
      });
      if (response.status === 200) {
        setValues((state) => ({...state, signUpProgress: 'success'}));
        navigate(`/${successPath}`);
      }
    } catch (err) {
      navigate(`/${errorPath}`);
    }
  }, []);
  return (
    <StandardLayout title={t('confirmation:page-title')}>
      <Card>
        <Flex justify="space-between">
          <Text size="bold">{t('confirmation:name')}</Text>
          <Text>{name}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text size="bold">{t('confirmation:email')}</Text>
          <Text>{email}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text size="bold">{t('confirmation:password')}</Text>
          <Text>{password}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text size="bold">{t('confirmation:favorite-color')}</Text>
          <Text>{color}</Text>
        </Flex>
        <Flex justify="center" align="center" pt={6}>
          <Icon as={FiCheckCircle} color="green.500" boxSize="6" />
          <Text size="bold">{t('confirmation:terms')}</Text>
        </Flex>
        <Stack
          direction={{base: 'column', sm: 'row'}}
          align="stretch"
          pt="8"
          justify="space-between"
        >
          <Button
            isDisabled={signUpState === 'loading'}
            onClick={() => {
              setProgress(moreInfoPath);
            }}
          >
            {t('common:back')}
          </Button>
          <Button
            isLoading={signUpState === 'loading'}
            colorScheme="green"
            onClick={() => {
              void signUp();
            }}
          >
            {t('common:next')}
          </Button>
        </Stack>
      </Card>
    </StandardLayout>
  );
};

export default ConfirmationPage;
