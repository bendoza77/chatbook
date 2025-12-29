import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { PostProvider } from './context/PostContext.jsx'
import "./App.css"
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <PostProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </PostProvider>
        </AuthProvider>
    </BrowserRouter>
)
