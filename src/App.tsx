import {Routes, Route, Navigate} from 'react-router-dom';
import AdditionalInformationPage from './pages/AdditionalInformationPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ErrorPage from './pages/ErrorPage';
import SignUpPage from './pages/SignUpPage';
import SuccessPage from './pages/SuccessPage';
import {
  confirmationPath,
  errorPath,
  moreInfoPath,
  signUpPath,
  successPath,
} from './utils/constants/urls';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${signUpPath}`} />} />
      <Route path={`/${signUpPath}`} element={<SignUpPage />} />
      <Route path={`/${moreInfoPath}`} element={<AdditionalInformationPage />} />
      <Route path={`/${confirmationPath}`} element={<ConfirmationPage />} />
      <Route path={`/${successPath}`} element={<SuccessPage />} />
      <Route path={`/${errorPath}`} element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
