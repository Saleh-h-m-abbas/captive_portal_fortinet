import { Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './app/home/Home';
import Privacy from './web_pages/Privacy/Privacy';
import Terms from './web_pages/Privacy/Terms';
function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/privacy' element={<Privacy />} />
      <Route path='/terms' element={<Terms />} />
    </Routes>
  );
}

export default App;
