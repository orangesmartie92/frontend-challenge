import {z} from 'zod';
import {VStack, Stack} from '@chakra-ui/layout';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@chakra-ui/button';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Select} from '../components/Select';
import {useTranslation} from 'react-i18next';
import {StandardLayout} from '../components/StandardLayout';
import {Card} from '../components/Card';
import {Checkbox} from '../components/Checkbox';
import {useSession} from '../contexts/session/SessionContext';
import {confirmationPath} from '../utils/constants/urls';
import {usePromiseFnTask} from '../hooks/use-promise-fn-task';
import {Skeleton} from '@chakra-ui/react';

const schema = z.object({
  color: z.string().min(1, {message: 'Favorite Color Required'}),
  terms: z.boolean().refine((val) => val, {message: 'required'}),
});

interface AdditionalInformationPageProps {}

const AdditionalInformationPage: React.FC<AdditionalInformationPageProps> = () => {
  const navigate = useNavigate();
  const {t} = useTranslation(['common', 'more-info']);
  const {signUpData, colors, setValues} = useSession();
  const {handleSubmit, register, formState, getValues} = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      color: signUpData.color,
      terms: signUpData.terms,
    },
  });
  const [colorOptions, setColorOptions] = useState<string[]>(colors);
  const {errors, isSubmitting} = formState;

  const {call: getColors, type: getColorsState} = usePromiseFnTask(async () => {
    const response = await axios.get<string[]>('/api/colors');
    if (response.status === 200) {
      setColorOptions(response.data);
      setValues((state) => ({...state, colors: response.data}));
    }
  }, []);
  const next = async () => {
    const {color, terms} = getValues();
    setValues(({signUpData, ...state}) => ({
      ...state,
      signUpProgress: confirmationPath,
      signUpData: {...signUpData, color, terms},
    }));
    navigate('/confirmation');
  };
  useEffect(() => {
    if (colors.length === 0) {
      getColors();
    }
  }, []);
  return (
    <StandardLayout title={t('more-info:page-title')}>
      <Card>
        <VStack as="form" align="stretch" onSubmit={handleSubmit(next)}>
          {getColorsState === 'loading' ? (
            <>
              <Skeleton h="1rem" w="4rem" rounded="full" />
              <Skeleton h="1.5rem" rounded="full" />
            </>
          ) : (
            <Select
              label={t('more-info:favorite-color-label')}
              options={colorOptions.map((option) => ({label: `${option}`, value: `${option}`}))}
              {...register('color')}
              error={errors.color?.message}
            />
          )}
          <Checkbox {...register('terms')} error={errors.terms?.message}>
            {t('more-info:accept-terms-label')}
          </Checkbox>
          <Stack
            direction={{base: 'column', sm: 'row'}}
            align="stretch"
            pt="8"
            justify="space-between"
          >
            <Button
              variant="outline"
              isLoading={isSubmitting}
              onClick={() => {
                navigate('/');
              }}
            >
              {t('common:back')}
            </Button>
            <Button type="submit" colorScheme="green" isLoading={isSubmitting}>
              {t('common:next')}
            </Button>
          </Stack>
        </VStack>
      </Card>
    </StandardLayout>
  );
};

export default AdditionalInformationPage;
