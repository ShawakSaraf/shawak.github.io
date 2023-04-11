import { NavBar, Content } from './Components.js'
import { useRef } from 'react';
import '../css/App.css';
import '../css/style.css';
import '../css/bootstrap.css';

function App() 
{
  const homeRef    = useRef(null);
  const projetsRef = useRef(null);
  const aboutRef   = useRef(null);
  const home2Ref   = useRef(null);
  const refs       = { homeRef, projetsRef, aboutRef, home2Ref };
  return (
    <div className="App">
      <NavBar {...refs}/>
      <Content />
    </div>
  );
}

export default App;
