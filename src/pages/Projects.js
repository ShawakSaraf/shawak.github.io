import level2 from '../images/TPS_proto/level2-Small.png'
import TPS1 from '../images/TPS_proto/OverShoulder1-Small.png'
import TPS2 from '../images/TPS_proto/OverShoulder2-Small.png'
import TPS3 from '../images/TPS_proto/OverShoulder3-Small.png'
import TPS4 from '../images/TPS_proto/OverShoulder4-Small.png'
import TPS5 from '../images/TPS_proto/OverShoulder5-Small.png'
import TPS6 from '../images/TPS_proto/OverShoulder6-Small.png'
import ProtoVid from '../images/TPS_proto/Prototype.webm'

import Ganvar5 from '../images/GANVAE/5x5_GeneratedDigits.png'
import Ganvar15 from '../images/GANVAE/15x15_GeneratedDigits.png'
import Ganvar30 from '../images/GANVAE/30x30_GeneratedDigits-Small.png'
import Ganvar50 from '../images/GANVAE/50x50_GeneratedDigits-Small.png'
import Ganvar50Inv from '../images/GANVAE/50x50_GeneratedDigits_InvertedCol-Small.png'
import DigitGen from '../images/GANVAE/Handwritten_Digit_Generation.webm'


import DigitClass_Vid from '../images/NN/Handwritten_digit_classification.mp4'
import NN1 from '../images/NN/NN1.png'
import NN2 from '../images/NN/NN2.png'
import NN3 from '../images/NN/NN3.png'
import NN4 from '../images/NN/NN4.png'


import Proc_anim_behind from '../images/Proc_Anim/Proc_Anim_behind.webm'
import Proc_anim_side from '../images/Proc_Anim/Proc_Anim_side.webm'

import { useState, useEffect } from 'react';

function ImageFade({images, ...props})
{
	const [index, setIndex]     = useState(0);
	const [opacity, setOpacity] = useState(1);

	useEffect(() => {
		const interval = setInterval(() => 
		{
			setOpacity(0);
			setTimeout(() => 
			{
				setIndex((index + 1) % images.length);
			}, 500);
			setTimeout(() => {
				setOpacity(1);
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
			style: { width: '75%' },
		}
		
		return (
			<div ref={projetsRef}>
			<h1>Third-Person Shooter<br/>Prototype</h1>
			<video style={ { width: '90%' } } controls autoPlay muted loop>
				<source src={ProtoVid} type='video/mp4' />
			</video>
			<p  style={ { textAlign: 'center' } }>
				A simple Third-Person Shooter prototype I made some years ago in Unity.<br />
			</p>
			<p>
				I'm a huge fan of The Last of Us universe, it is what inspired me to get into game development 
				and my goal with this rough prototype was to study its level design.<br />
			</p>
			<ImageFade {...fadeProps} />
			<p>
				I also used unity's IK rigging tool to properly position upper body of the character rig while aimming and rotate the head in the direction on the view.
			</p>
			</div>
		);
	}
	function GANVAE()
	{
		const fadeProps = 
		{
			images: [ Ganvar5, Ganvar15, Ganvar30, Ganvar50, Ganvar50Inv ],
			style: { width:  !isPhone ? '40%' : '60%', float: !isPhone ? 'left': 'center', 'marginRight': !isPhone ? '20px' : '0px' },
		}
		return (
			<div>
				<h1>Generative Adversarial<br />Network<br />+<br />Variational Autoencoder</h1>
				<ImageFade {...fadeProps}/>
				<p style={ { paddingTop: !isPhone ? '100px' : "10px" } }>
					A very basic Tensorflow and Keras implementation of GAN+VAE generative model.
				</p>
				<p >
					In a nutshell, there are 2 models,<br /> The <i>Generator</i> and the <i>Discriminator</i>.<br />
					The generator generates an image, the discriminator then takes that image with an image from the dataset, and learns to discriminate between them.
				</p>
				<video style={ { width: !isPhone ? '40%' : '90%', float: !isPhone ? 'right': 'center', marginLeft: !isPhone ? '20px' : '0px', marginTop: !isPhone ? '10px' : '0px' } } controls autoPlay muted loop>
					<source src={DigitGen} type='video/mp4' />
				</video>
				<p style={ { paddingTop: !isPhone ? '8vw' : "10px", textAlign: 'left' } }>
					The job of the generator is to fool the discriminator into thinking that the generated image is from the dataset, and the discriminator's job is to successfully distinguish between them.
					The intricately choreographed dance between these two models is what helps them learn and become better at their job.
					<br />Isn't it beautiful?<br />
					I think it is.
				</p>
			</div>
		);
	}
	
	function NeuralNetwork()
	{
		const fadeProps = 
		{
			images: [ NN1, NN2, NN3, NN4 ],
			style: { width:  !isPhone ? '50%' : '90%', float: !isPhone ? 'left': 'center', 'marginRight': !isPhone ? '20px' : '0px', 'marginTop': !isPhone ? '15px' : '0px' },
		}
		return (
			<div>
				<h1>Neural Network from Scratch</h1>
				<video style={ { width: !isPhone ? '70%' : '90%', borderRadius: '8px' } } controls autoPlay muted loop>
					<source src={DigitClass_Vid} type='video/mp4' />
				</video>
				<p style={ { textAlign: !isPhone ? 'center': 'left' } }>
					You know the rite of passage everyone has to go through when they first set foot into the world of programming.
					The iconic, print("Hello World!").<br />
					This is that but for the world of Neural Networks.
				</p>
				<p >
					This small project came into existence when I first started doing research about neural networks and what makes them tick.
					By implementing a neural network using only the Numpy library, I was able to understand the core principles and mathematics of how a neural network works 
					without the complexities of modern machine learning frameworks like Tensorflow and PyTorch.<br />
					Numpy is a powerful library for numerical computing in Python, but it does not provide high-level abstractions for building and training neural networks.
					As a result, I had a lot of fun implementing the core components of neural networks from scratch.
				</p>
				<ImageFade {...fadeProps}/>
				<p style={ { textAlign: 'left', 'marginTop': !isPhone ? '3em' : '0px', paddingTop: !isPhone ? 'auto': '20px' } }>
					In a blog, <a href='https://lookingisnotenough.com/UnderstandingNeuralNetworks' target={'_blank'} rel="noreferrer">"Understanding Neural Networks"</a>, I try to build an intuitive understanding of the inner workings of neural networks without getting bogged down into technical details.
				</p>
				<p style={ { textAlign: 'left', 'marginTop': !isPhone ? '100px' : '0px' } }>
					I've also made this model in a <a href='https://colab.research.google.com/drive/1B9Uu9A-O6efN8_oqYGYmU8iiD-JK80dt' target={'_blank'} rel="noreferrer">Jupyter notebook</a> with annotations for the code in google colab.
					It runs on the google servers so there's no need to install anything.<br /> If you want to play with the network or look at the code, check it out.
				</p>
			</div>
		);
	}

	function ProceduralAnimation()
	{
		return (
			<div>
			<h1>Quadruped Procedural Animation</h1>
				<video style={ { width: '48%', marginRight: '5px' } } controls autoPlay muted loop>
					<source src={Proc_anim_behind} type='video/mp4' />
				</video>
				<video style={ { width: '48%', marginLeft: '5px' } } controls autoPlay muted loop>
					<source src={Proc_anim_side} type='video/mp4' />
				</video>
				<p style={ { textAlign: 'center'} }>
					Quadruped Procedural Animation made in unity with its IK rigging tool.<br />
					Simply put, I make an ellipse centered around the last position of the body and project it on the terrain. When the body goes outside that ellipse,
					I assign a new position to each leg in the direction the body moves.
				</p>
			</div>
		);
	}

	return (
		<div id='Projects'>
			<header>Projects</header>
			<TPSPrototype />
			<GANVAE />
			<NeuralNetwork />
			<ProceduralAnimation />
		</div>
	);
}
export default Project;