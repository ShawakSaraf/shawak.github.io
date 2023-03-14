import Projects from './projects.js'
import { NavBar, Home, About } from './Components.js'
import { useRef } from 'react';
import './css/App.css';
import './css/style.css';
import './css/bootstrap.css';

function App() 
{
  const homeRef    = useRef(null);
  const projetsRef = useRef(null);
  const aboutRef   = useRef(null);
  const refs = { homeRef, projetsRef, aboutRef };
  return (
    <div className="App">
      <NavBar {...refs}/>
      <div className='container'>
        <Home homeRef={homeRef}/>
        <Projects projetsRef={projetsRef}/>
        <About aboutRef={aboutRef}/>
      </div>
    </div>
  );
}

export default App;
