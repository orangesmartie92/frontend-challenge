import {z} from 'zod';
import {Box, Container, Text, VStack} from '@chakra-ui/layout';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {usePasswordTextInputProps} from '../hooks/use-password-verification';
import {Button} from '@chakra-ui/button';
import {useNavigate} from 'react-router-dom';
import {Checkbox} from '@chakra-ui/checkbox';
import {Select} from '@chakra-ui/select';
import {useEffect, useState} from 'react';
import axios from 'axios';

const schema = z.object({
  color: z.string().min(1, {message: 'Name Required'}),
  terms: z.boolean().refine((val) => !val),
});

interface AdditionalInformationPageProps {}

const AdditionalInformationPage: React.FC<AdditionalInformationPageProps> = () => {
  const navigate = useNavigate();
  const {handleSubmit, register, formState} = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      color: '',
      terms: '',
    },
  });
  const [colorOptions, setColorOptions] = useState<String[]>([]);
  const {errors} = formState;

  const getColors = async () => {
    const response = await axios.get<String[]>('/api/colors');
    if (response.status === 200) {
      setColorOptions(response.data);
    }
  };
  const next = async () => {};
  useEffect(() => {
    getColors();
  }, []);
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
          <VStack as="form" align="stretch" onSubmit={handleSubmit(next)}>
            <Select {...register('terms')}>
              {colorOptions.map((value) => (
                <option key={`${value}`} value={`${value}`}>
                  {value}
                </option>
              ))}
            </Select>
            <Checkbox {...register('terms')}>I Agree to the Terms and Conditions</Checkbox>
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

export default AdditionalInformationPage;
