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
  const {signUpProgress} = useSession();
  const navigate = useNavigate();
  const maybeRedirect = useCallback(() => {
    switch (progress) {
      case signUpPath:
        break;
      case moreInfoPath:
      case confirmationPath:
      case successPath:
      case errorPath:
        if (signUpProgress !== progress) {
          navigate(`/${signUpProgress}`);
        }
        break;
      default:
        break;
    }
  }, [navigate, progress, signUpProgress]);
  useEffect(() => {
    maybeRedirect();
  }, [maybeRedirect]);
};
