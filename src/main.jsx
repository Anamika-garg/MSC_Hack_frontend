import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login.jsx'
import SignUpPage from './Pages/SignUp.jsx'
import CompleteProfile from './Pages/CompleteProfile.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import Layout from './Pages/Layout.jsx'
import MoodJournal from './Components/MoodJounal.jsx'
import Jobs from './Components/Jobs.jsx'
import FindJobs from './Components/findJobs.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path={'/'} element={<App />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/signup'} element={<SignUpPage />} />
            <Route path={'/complete'} element={<CompleteProfile />} />
            <Route path={'/FindJobs'} element={<FindJobs />} />
            <Route path={'/journal'} element={<MoodJournal />} />
            <Route path={'/jobs'} element={<Jobs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
