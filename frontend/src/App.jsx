import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { NotFoundPage } from './pages/notFoundPage';
import { AuthorizationPage } from './pages/authorizationPage';
import { MainPage } from './pages/mainPage';
import { PrivateRoute } from './Components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthorizationPage />} />
        <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
