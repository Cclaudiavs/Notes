import { AuthProvider } from './context/AuthContext';
import './App.css';
import '@mui/material/styles';
import FormsFirebase from '../src/components/FormsFirebase';

function App() {
  return (
    <AuthProvider>
      <div className='contenedorTotal'>
        <div className='encabezado'>
          <h1>Organiza-"Te"</h1>
        </div>
        <FormsFirebase />
      </div>
    </AuthProvider>
  )
}

export default App;
