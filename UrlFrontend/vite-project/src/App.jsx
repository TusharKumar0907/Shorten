import './App.css'
import AddUrl from './components/AddUrl';
import HomePage from './components/Home';
import ListUrls from './components/ListUrls';
import LoginPage from './components/Login'
import RegisterPage from './components/Register'
import { BrowserRouter, Routes, Route } from "react-router";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/graph' element={<HomePage />} />
      <Route path='/home' element={<ListUrls />} />
      <Route path='/addurl' element={<AddUrl />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
