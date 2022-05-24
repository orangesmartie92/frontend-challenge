import React, {useState} from 'react';
import {useOnChange} from '../../hooks/use-on-change';
import {
  upgradeColors,
  upgradeSignUpProgress,
  upgradeUserSession,
} from '../../utils/constants/storage-keys';
import {signUpPath} from '../../utils/constants/urls';
import {SessionContext, SessionValuesContextProps} from './SessionContext';

export interface SessionProviderProps {
  children: React.ReactNode;
}

const initialSignUpData = {
  email: '',
  color: '',
  name: '',
  password: '',
  terms: false,
};

/**
 *
 * Session Provider should actually be linked to a service (and that is also handled backend)
 * I understand we should not store passowrds on the local storage. sensitive data should be only be kept in memory.
 *
 * That being said, since we were not supposed to touch the backend, I was trying to 'persist' the data so that we
 * can move forward, like a real app.
 *
 * Otherwise, a session id would be utilized from the first sign up page, and a 'sign up user' would be created
 * from the first sign up page (and not carried along to the last page)
 *
 * @param
 * @returns
 */
export const SessionProvider: React.FC<SessionProviderProps> = ({children}) => {
  const {
    email = '',
    color = '',
    name = '',
    password = '',
    terms = false,
  }: SessionValuesContextProps['signUpData'] = JSON.parse(
    localStorage.getItem(upgradeUserSession) ?? '{}',
  );
  const colors = JSON.parse(localStorage.getItem(upgradeColors) ?? '[]');
  const signUpProgress =
    JSON.parse(localStorage.getItem(upgradeSignUpProgress) ?? '""') || signUpPath;
  const [values, setValues] = useState<SessionValuesContextProps>({
    signUpProgress,
    colors,
    signUpData: {name, email, color, password, terms},
  });

  const reset = () => {
    setValues(({signUpData, ...state}) => ({
      ...state,
      signUpData: initialSignUpData,
      signUpProgress: signUpPath,
    }));
  };

  useOnChange(() => {
    localStorage.setItem(upgradeSignUpProgress, JSON.stringify(values.signUpProgress));
  }, [values.colors]);
  useOnChange(() => {
    localStorage.setItem(upgradeColors, JSON.stringify(values.colors));
  }, [values.colors]);
  useOnChange(() => {
    localStorage.setItem(upgradeUserSession, JSON.stringify(values.signUpData));
  }, [values.signUpData]);
  return (
    <SessionContext.Provider value={{...values, setValues, reset}}>
      {children}
    </SessionContext.Provider>
  );
};
