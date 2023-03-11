import './css/App.css';
import './css/style.css';
import './css/bootstrap.css';
import Slider from 'react-slick';
import level2 from './images/level2.png'
import TPS1 from './images/OverShoulder1.png'
import TPS2 from './images/OverShoulder2.png'
import TPS3 from './images/OverShoulder3.png'
import TPS4 from './images/OverShoulder4.png'
import TPS5 from './images/OverShoulder5.png'
import TPS6 from './images/OverShoulder6.png'


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

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
  };

  return (
    <div className="slider-container">
      <img src={images[currentImageIndex]} alt="slider-image" />
      <img src={images[(currentImageIndex + 1) % images.length]} alt="slider-image" />
    </div>
  );
};
const images = [ level2, TPS1, TPS2, TPS3 ];

function ImageFade() {
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
      style={{ opacity, transition: 'opacity 0.5s ease-in-out' }}
    />
  );
}
function Project()
{
  function TPS_Prototype()
  {
    return (
      <div>
        <h1>Third-Person Shooter<br/>Prototype</h1>
        <ImageFade />
        <p>
          A simple Third person shooter prototype I made some years ago. My goal was to explore the level design of the last of us.
        </p>
      </div>
    );
  }
  function NeuralNetwork()
  {
    return (
      <div>
        <h1>Generative Adversarial<br />+<br />Variational Autoencoder</h1>
        <ImageFade />
        <p>
        I present to you a very basic Tensorflow and Keras implementation of GAN+VAE generative model inspired by Hardmaru's incredible blog, "Generating Large Images from Latent Vectors" .
        </p>
      </div>
    );
  }

  return (
    <div id='Projects'>
      <header>Projects</header>
        <TPS_Prototype />
        <NeuralNetwork />
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
