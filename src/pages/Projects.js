import level2 from '../images/TPS_proto/level2.png'
import TPS1 from '../images/TPS_proto/OverShoulder1.png'
import TPS2 from '../images/TPS_proto/OverShoulder2.png'
import TPS3 from '../images/TPS_proto/OverShoulder3.png'
import TPS4 from '../images/TPS_proto/OverShoulder4.png'
import TPS5 from '../images/TPS_proto/OverShoulder5.png'
import TPS6 from '../images/TPS_proto/OverShoulder6.png'
import ProtoVid from '../images/TPS_proto/Prototype.webm'

import Ganvar5 from '../images/GANVAE/5x5_GeneratedDigits.png'
import Ganvar15 from '../images/GANVAE/15x15_GeneratedDigits.png'
import Ganvar30 from '../images/GANVAE/30x30_GeneratedDigits.png'
import Ganvar50 from '../images/GANVAE/50x50_GeneratedDigits.png'
import Ganvar50Inv from '../images/GANVAE/50x50_GeneratedDigits_InvertedCol.png'
import DigitGen from '../images/GANVAE/Handwritten_Digit_Generation.webm'
import { useState, useEffect } from 'react';

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

function Project({projetsRef})
	{
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const isPhone = width < 768;

	function TPSPrototype()
	{
		const fadeProps = {
			images: [ level2, TPS1, TPS2, TPS3 ],
			style: { width: '60%' },
		}
		
		return (
			<div ref={projetsRef}>
			<h1>Third-Person Shooter<br/>Prototype</h1>
			<video style={ { width: '90%' } } controls autoPlay muted loop>
				<source src={ProtoVid} type='video/mp4' />
			</video>
			<p  style={ { paddingTop: !isPhone ? '20px' : "10px" } }>
				A simple Third person shooter prototype I made some years ago. My goal was to explore the level design of the last of us.
			</p>
			<ImageFade {...fadeProps} />
			</div>
		);
	}
	function GANVAE()
	{
		const fadeProps = 
		{
			images: [ Ganvar5, Ganvar15, Ganvar30, Ganvar50, Ganvar50Inv ],
			style: { width:  !isPhone ? '40%' : '60%', float: !isPhone ? 'left': 'center', 'marginRight': '20px' },
		}
		return (
			<div>
			<h1>Generative Adversarial<br />Network<br />+<br />Variational Autoencoder</h1>
			<ImageFade {...fadeProps}/>
			<p style={ { paddingTop: !isPhone ? '100px' : "10px" } }>
				I present to you a very basic Tensorflow and Keras implementation of GAN+VAE generative model inspired by 
				Hardmaru's incredible blog, "Generating Large Images from Latent Vectors" .
			</p>
			<video style={ { width: !isPhone ? '40%' : '90%' } } controls autoPlay muted loop>
				<source src={DigitGen} type='video/mp4' />
			</video>
			</div>
		);
	}

	return (
		<div id='Projects'>
			<header>Projects</header>
			<TPSPrototype />
			<GANVAE />
		</div>
	);
}
export default Project;