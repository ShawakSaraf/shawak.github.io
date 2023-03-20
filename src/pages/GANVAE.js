import { useState } from 'react';

import Ganvar5 from '../images/GANVAE/5x5_GeneratedDigits.png'
import Ganvar15 from '../images/GANVAE/15x15_GeneratedDigits.png'
import Ganvar30 from '../images/GANVAE/30x30_GeneratedDigits-Small.png'
import Ganvar50 from '../images/GANVAE/50x50_GeneratedDigits-Small.png'
import Ganvar50Inv from '../images/GANVAE/50x50_GeneratedDigits_InvertedCol-Small.png'
import DigitGen from '../images/GANVAE/Handwritten_Digit_Generation.webm'


function GANVAE({isPhone, width, ImageFade})
{
	const fadeProps = 
	{
		images: [ Ganvar5, Ganvar15, Ganvar30, Ganvar50, Ganvar50Inv ],
		style: { width:  !isPhone ? '25%' : '60%', float: !isPhone ? 'right': 'center', marginLeft: !isPhone ? '20px' : '0px', marginTop: !isPhone ? '20px' : '0px' },
	}
	const [isClicked, setIsClicked] = useState(false);

	const expand = () => {
		setIsClicked( isClicked ? false : true);
		console.log( 'TPS clicked', isClicked );
	};

	var divStyle = {
		backgroundColor: 'grey',
		// width: '100px',
		maxHeight: isClicked ? '1180px' : '30.5vw',
		transition: isClicked ? '0.25s' : '0.5s',
	};
	var h1Style = {
		fontSize     : isClicked ? '1.7vw' : '2vw',
		letterSpacing: '0.3em',
		padding      : isClicked ? '0em 0 1.5em 0': '7vw 0 12vw 0',
		transition   : isClicked ? '0.25s': '0.5s',
	};	 
	var p1Style = {
		paddingLeft: '30vw'
	};	 

	var p2Style = {
		padding: '2vw  0 2vw 30vw',
		textAlign: 'left',
	}

	if( isPhone )
	{
		divStyle = {
			backgroundColor: 'grey',
			// width: '100px',
			maxHeight: isClicked ? '1180px' : '480px',
			transition: isClicked ? '0.25s' : '0.5s',
		};
		h1Style = {
			fontSize  : isClicked ? '1.7em' : '1.8em',
         letterSpacing: '0.17em',
         padding   : isClicked ? '1em 0 1em 0' : '1.5em 0 4em 0',
			transition: isClicked ? '0.25s' : '0.5s',
		};
		p1Style = {
			paddingLeft: '0'
		};	 
		p2Style = {
			padding: '0',
		};
	}

	return (
		<div style={divStyle}  onClick= {expand}>
			<video style={ { width: !isPhone ? '33%' : '80%', float: !isPhone ? 'left': 'center' } } controls autoPlay muted loop>
				<source src={DigitGen} type='video/mp4' />
			</video>
			<h1 style={h1Style}>Generative Adversarial<br />Network<br />+<br />Variational Autoencoder</h1>
			<p style={ p1Style }>
				A very basic Tensorflow and Keras implementation of GAN+VAE generative model.
			</p>
			<p style={ p1Style }>
				In a nutshell, VAE, thats Variational Autoencoder takes images from the dataset and learns to encode them into a latent vector.<br />
				Then comes the GAN, generative Adversarial network, which contains two models.<br />
				The generator and the discriminator.
			</p>
			<ImageFade {...fadeProps}/>
			<p style={ p2Style }>
				The latent vector outputed by VAE is the input to the generator. The generator then outputs an image, the discriminator then takes that image
				with an image from the dataset and outputs how close the generated image was to the image from the dataset.
			</p>
			<p style={ p2Style }>
				See the code at my <a style={ {color: 'black'} } href='https://github.com/ShawakSaraf/GAN-VAE-Model-with-Tensorflow-and-Keras' target={'_blank'} rel="noreferrer">Github Repository.</a>
			</p>
		</div>
	);
}

export default GANVAE;

