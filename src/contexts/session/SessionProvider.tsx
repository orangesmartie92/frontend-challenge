import React, {useState} from 'react';
import {useOnChange} from '../../hooks/use-on-change';
import {upgradeColors, upgradeUserSession} from '../../utils/constants/storage-keys';
import {signUpPath} from '../../utils/constants/urls';
import {SessionContext, SessionValuesContextProps} from './SessionContext';

export interface SessionProviderProps {
  children: React.ReactNode;
}

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
  const [values, setValues] = useState<SessionValuesContextProps>({
    signUpProgress: signUpPath,
    colors,
    signUpData: {name, email, color, password, terms},
  });

  useOnChange(() => {
    // set the new storage values after submitting
    localStorage.setItem(upgradeColors, JSON.stringify(values.colors));
  }, [values.colors]);
  useOnChange(() => {
    // set the new storage values after submitting
    localStorage.setItem(upgradeUserSession, JSON.stringify(values.signUpData));
  }, [values.signUpData]);
  return (
    <SessionContext.Provider value={{...values, setValues}}>{children}</SessionContext.Provider>
  );
};
