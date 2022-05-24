import {useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSession} from '../contexts/session/SessionContext';
import {
  confirmationPath,
  errorPath,
  moreInfoPath,
  signUpPath,
  successPath,
} from '../utils/constants/urls';

export type SignUpProgress =
  | typeof signUpPath
  | typeof moreInfoPath
  | typeof confirmationPath
  | typeof successPath
  | typeof errorPath;

export const useSignUpProgress = (progress: SignUpProgress) => {
  const {signUpProgress, setValues} = useSession();
  const navigate = useNavigate();
  const maybeRedirect = useCallback(() => {
    if (signUpProgress !== progress) {
      navigate(`/${signUpProgress}`);
    }
  }, [navigate, progress, signUpProgress]);

  const setProgress = (signUpProgress: SignUpProgress) => {
    setValues((state) => ({...state, signUpProgress}));
  };
  useEffect(() => {
    maybeRedirect();
  }, [maybeRedirect]);

  return {setProgress};
};
