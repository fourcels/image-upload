import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { setDefaultAction } from '../lib/ImageUpload.tsx'
// import './index.css'

const { VITE_API_BASE_URL } = import.meta.env
setDefaultAction(`${VITE_API_BASE_URL}/upload`)

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
)
