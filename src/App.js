import './css/App.css';
import './css/style.css';
import './css/bootstrap.css';
import Slider from 'react-slick';
import level2 from './images/TPS_proto/level2.png'
import TPS1 from './images/TPS_proto/OverShoulder1.png'
import TPS2 from './images/TPS_proto/OverShoulder2.png'
import TPS3 from './images/TPS_proto/OverShoulder3.png'
import TPS4 from './images/TPS_proto/OverShoulder4.png'
import TPS5 from './images/TPS_proto/OverShoulder5.png'
import TPS6 from './images/TPS_proto/OverShoulder6.png'
import ProtoVid from './images/TPS_proto/Prototype.mp4'


import Ganvar5 from './images/GANVAE/5x5_GeneratedDigits.png'
import Ganvar15 from './images/GANVAE/15x15_GeneratedDigits.png'
import Ganvar30 from './images/GANVAE/30x30_GeneratedDigits.png'
import Ganvar50 from './images/GANVAE/50x50_GeneratedDigits.png'
import Ganvar50Inv from './images/GANVAE/50x50_GeneratedDigits_InvertedCol.png'
import DigitGen from './images/GANVAE/Handwritten_Digit_Generation.mp4'


import { useState, useEffect } from 'react';

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <div>
      <Header title="Develop. Preview. Ship. 🚀" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button onClick={handleClick}>Like ({likes})</button>
    </div>
  );
}

function NavBar()
{
  function handleHomeClick(e)
  {
    console.log( 'Home clicked' );
  }
  function handleProjectsClick(e)
  {
    console.log( 'Projects clicked' );
  }
  function handleAboutClick(e)
  {
    console.log( 'About clicked' );
  }

  return (
    <nav className="nav" role={"navigation"}>
      <div className='top-menu'>
        <div className='row'>
          <ul>
            <li><a onClick={handleHomeClick}>Home</a></li>
            <li><a onClick={handleProjectsClick}>Projects</a></li>
            <li><a onClick={handleAboutClick}>About</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Home()
{
  return (
    <div className='Project'>
      <header className="main-logo">
        <p>Shawak</p>
        <ul className="sub-logo">
          <p>GameDev MachineLearning Creativity</p>
        </ul>
      </header>
    </div>
  );
}



function ImageFade({images, ...props}) 
{
  const [index, setIndex]     = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => 
    {
      setOpacity(0);
      setTimeout(() => {
        setIndex( ( index + 1 ) % images.length );
        setOpacity( 1 );
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <img
      src={images[index]}
      alt=""
      style={{ opacity, transition: 'opacity 0.5s ease-in-out', ...props.style}}
    />
  );
}
function Project()
{
  function TPS_Prototype()
  {
    const fadeProps = {
      images: [ level2, TPS1, TPS2, TPS3 ],
      style: { width: '60%' },
    }
    
    return (
      <div>
        <h1>Third-Person Shooter<br/>Prototype</h1>
        <ImageFade {...fadeProps} />
        <video style={ { width: '90%' } } controls autoPlay muted>
          <source src={ProtoVid} type='video/mp4' />
        </video>
        <p>
          A simple Third person shooter prototype I made some years ago. My goal was to explore the level design of the last of us.
        </p>
      </div>
    );
  }
  function GANVAE()
  {
    const fadeProps = {
      images: [ Ganvar5, Ganvar15, Ganvar30, Ganvar50, Ganvar50Inv ],
      style: { width: '40%', float: 'center', 'margin-right': '20px' },
    }
    return (
      <div>
        <h1>Generative Adversarial<br />Network<br />+<br />Variational Autoencoder</h1>
        <ImageFade {...fadeProps}/>
        <video style={ { width: '40%' } } controls autoPlay muted >
          <source src={DigitGen} type='video/mp4' />
        </video>
        <p>
          I present to you a very basic Tensorflow and Keras implementation of GAN+VAE generative model inspired by 
          Hardmaru's incredible blog, "Generating Large Images from Latent Vectors" .
        </p>
      </div>
    );
  }

  // function NeuralNetwork()
  // {
  //   const fadeProps = {
  //     images: [ Ganvar5, Ganvar15, Ganvar30, Ganvar50, Ganvar50Inv ],
  //     style: { width: '50%', float: 'center', 'margin-right': '20px' },
  //   }
  //   return (
      
  //   );
  // }

  return (
    <div id='Projects'>
      <header>Projects</header>
        <TPS_Prototype />
        <GANVAE />
    </div>
  );
}

function App() 
{
  return (
    <div className="App">
      <NavBar />
      <div className='container'>
        <Home />
        <Project />
      </div>
    </div>
  );
}

export default App;
