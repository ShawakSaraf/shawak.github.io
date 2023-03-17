import { NavBar, Home, Project, About, Socials } from './Components.js'
import { useRef } from 'react';
import '../css/App.css';
import '../css/style.css';
import '../css/bootstrap.css';
// import '../css/icomoon.css';

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
        <Project projetsRef={projetsRef}/>
        <About aboutRef={aboutRef}/>
        {/* <Socials /> */}
      </div>
    </div>
  );
}

export default App;
