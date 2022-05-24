import {createContext, useContext} from 'react';
import {SignUpProgress} from '../../hooks/use-sign-up-progress';

export interface SessionValuesContextProps {
  signUpProgress: SignUpProgress;
  signUpData: {
    name: string;
    email: string;
    password: string;
    color: string;
    terms: boolean;
  };
  colors: string[];
}

export interface SessionContextProps extends SessionValuesContextProps {
  setValues: React.Dispatch<React.SetStateAction<SessionValuesContextProps>>;
}

export const SessionContext = createContext<SessionContextProps>(
  undefined as unknown as SessionContextProps,
);

export const useSession = () => useContext(SessionContext);
