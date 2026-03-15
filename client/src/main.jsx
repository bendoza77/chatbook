import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { PostProvider } from './context/PostContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './i18n'
import "./index.css"

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ThemeProvider>
            <AuthProvider>
                <PostProvider>
                    <UserProvider>
                        <App />
                    </UserProvider>
                </PostProvider>
            </AuthProvider>
        </ThemeProvider>
    </BrowserRouter>
)
