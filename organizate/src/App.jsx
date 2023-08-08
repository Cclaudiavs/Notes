import { AuthProvider } from './context/AuthContext';
import './App.css';
import FormsFirebase from '../src/components/FormsFirebase';

function App() {
  return (
    <AuthProvider>
      <div>
        <h1>hola</h1>
        <FormsFirebase />
      </div>
    </AuthProvider>
  )
}

export default App;
