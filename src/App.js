import { Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './app/home/Home';
import Privacy from './web_pages/Privacy/Privacy';
function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/privacy' element={<Privacy />} />
    {/* <div className="App">
      <Home />
    </div> */}
    </Routes>
  );
}

export default App;
