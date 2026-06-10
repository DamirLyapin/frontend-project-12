import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from '.pages/NotFoundPage.jsx'
import { AuthorizationForm } from './pages/authorizationPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<AuthorizationForm />} />
        <Route path="." element={} />
        <Route path="*" element={NotFoundPage} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
