import { AuthProvider } from './context/AuthContext';
import './App.css';
import FormsFirebase from '../src/components/FormsFirebase';

function App() {
  return (
    <AuthProvider>
      <div className='contenedorTotal'>
        <h1>Organizate</h1>
        <FormsFirebase />
      </div>
    </AuthProvider>
  )
}

export default App;
