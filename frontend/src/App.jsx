import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { NotFoundPage } from './pages/notFoundPage';
import { AuthorizationPage } from './pages/authorizationPage';
import { MainPage } from './pages/MainPage';
import { PrivateRoute } from './Components/PrivateRoute';
import { SignupPage } from './pages/SignupPage';
import { Header } from './Components/Header';
import { ErrorBoundary } from '@rollbar/react'
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<AuthorizationPage />} />
          <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/signup" element={<SignupPage />}/>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
export default App
