import * as React from 'react';
import {z} from 'zod';
import {VStack} from '@chakra-ui/layout';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {TextInput} from '../components/TextInput';
import {usePasswordTextInputProps} from '../hooks/use-password-verification';
import {Button} from '@chakra-ui/button';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useSession} from '../contexts/session/SessionContext';
import {moreInfoPath} from '../utils/constants/urls';
import {StandardLayout} from '../components/StandardLayout';
import {Card} from '../components/Card';
import {useSignUpProgress} from '../hooks/use-sign-up-progress';

export const schema = z.object({
  name: z.string().min(1, {message: 'Name Required'}),
  email: z.string().email({message: 'Email Required'}),
  password: z.string().min(1, {message: 'Password Required'}),
});

interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = () => {
  useSignUpProgress('sign-up');
  const {signUpData, setValues} = useSession();
  const navigate = useNavigate();
  const {t} = useTranslation(['common', 'sign-up']);
  const {handleSubmit, register, formState, getValues} = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: signUpData.name,
      email: signUpData.email,
      password: signUpData.password,
    },
  });
  const {errors} = formState;
  const passwordTextInputProps = usePasswordTextInputProps('password');
  const onSignUp = async () => {
    const {email, name, password} = getValues();
    setValues(({signUpData, ...state}) => ({
      ...state,
      signUpProgress: moreInfoPath,
      signUpData: {...signUpData, email, name, password},
    }));
    navigate(`/${moreInfoPath}`);
  };
  return (
    <StandardLayout title={t('sign-up:page-title')}>
      <Card>
        <VStack as="form" align="stretch" onSubmit={handleSubmit(onSignUp)}>
          <TextInput
            label={t('sign-up:form-label-name')}
            {...register('name')}
            error={errors?.name?.message}
          />
          <TextInput
            label={t('sign-up:form-label-email')}
            {...register('email')}
            error={errors?.email?.message}
          />
          <TextInput
            label={t('sign-up:form-label-password')}
            {...register('password')}
            {...passwordTextInputProps}
            error={errors?.password?.message}
          />
          <VStack align="stretch" pt="8">
            <Button colorScheme="green" type="submit">
              {t('common:next')}
            </Button>
          </VStack>
        </VStack>
      </Card>
    </StandardLayout>
  );
};

export default SignUpPage;
