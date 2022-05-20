import * as React from 'react';
import {z} from 'zod';
import {Box, Container, Text, VStack} from '@chakra-ui/layout';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {TextInput} from '../components/TextInput';
import {usePasswordTextInputProps} from '../hooks/use-password-verification';
import {Button} from '@chakra-ui/button';
import {useNavigate} from 'react-router-dom';
// import {zodResolver} from '../utils/zod-resolver';

const schema = z.object({
  name: z.string().min(1, {message: 'Name Required'}),
  email: z.string().email({message: 'Email Required'}),
  password: z.string().min(1, {message: 'Password Required'}),
});

interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const navigate = useNavigate();
  const {handleSubmit, register, formState} = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const {errors} = formState;
  const passwordTextInputProps = usePasswordTextInputProps('password');
  const onSignUp = async () => {
    navigate('/more-info');
  };
  return (
    <Container>
      <VStack align="stretch" pt={10} px={4} mx="auto" maxW="lg">
        <Text as="h1" align="center" size="page-header">
          Sign Up
        </Text>
        <Box
          rounded={4}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          _focusWithin={{
            borderColor: 'blue.500',
          }}
        >
          <VStack as="form" align="stretch" onSubmit={handleSubmit(onSignUp)}>
            <TextInput label="Name" {...register('name')} error={errors?.name?.message} />
            <TextInput label="Email" {...register('email')} error={errors?.email?.message} />
            <TextInput label="Password" {...register('password')} {...passwordTextInputProps} error={errors?.password?.message} />
            <VStack align="stretch" pt="8">
              <Button colorScheme="blue" type="submit">
                Next
              </Button>
            </VStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default SignUpPage;
