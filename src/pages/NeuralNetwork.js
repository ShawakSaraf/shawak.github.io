import { useState, useEffect, useRef } from 'react';

import DigitClass_Vid from '../media/NN/Handwritten_digit_classification.webm'
import NN1 from '../media/NN/NN1.png'
import NN2 from '../media/NN/NN2.png'
import NN3 from '../media/NN/NN3.png'
import NN4 from '../media/NN/NN4.png'

function NeuralNetwork({isPhone, width})
{
	const [isClicked, setIsClicked]     = useState(false);
	const [isMouseOver, setIsMouseOver] = useState(false);

	const vidRef = useRef(null);

	useEffect( ()=> {
		if ( isMouseOver )
			vidRef.current.play();
		else
			vidRef.current.pause();
	},[isMouseOver, isClicked] );

	const expand = () => {
		setIsClicked( isClicked ? false : true);
	};
	
	const mouseEnter = ()=> {
		setIsMouseOver(true);

	}
	const mouseLeave = ()=> {
		setIsMouseOver(false);
	}

	var divStyle = {
		backgroundColor: '#dfb921',
		color: 'black',
		maxHeight: isClicked ? '1180px' : !isPhone ? '21vw' : '78vw',
		transition: isClicked ? '0.25s' : '0.5s',
	};
	var h1Style = {
		fontSize     : isClicked ? '1.7vw' : '2vw',
		letterSpacing: '0.3em',
		padding      : isClicked ? '0em 0 1em 0': '5.3vw 0 10vw 0',
		transition   : isClicked ? '0.25s': '0.5s',
	};	 
	var p1Style = {
		paddingLeft: '40vw'
	};	 

	var p2Style = {
		paddingTop: '10vw',
		textAlign: 'left',
	}
	var p3Style = {
		padding: '1vw 0 1vw 0vw',
		textAlign: 'left',
	}

	var vidStyle = {
		width       : '45%',
		float       : 'left',
		borderRadius: '5px',
	}
	var imgStyle = {
		width: !isPhone ? '35%': '60%',
		float: !isPhone ? 'right': 'center',
		margin: '2vw 0 0 1.5vw',
	}
	const aStyle = { color: '#413400', }

	if( isPhone )
	{
		vidStyle = {
			width: '100%',
			borderRadius: '5px',
		}
		h1Style = {
			fontSize     : isClicked ? '4.5vw'      : '5vw',
			padding      : isClicked ? '2vw 0 5vw 0': '4vw 0 25vw 0',
			transition   : isClicked ? '0.25s'      : '0.5s',
			letterSpacing: '0.2em',
		};
		p1Style = {
			paddingLeft: '0',
         textAlign: 'center',
		};	 
		p2Style = {
			padding: '0',
		};
	}
	return (
		<div style={divStyle} onClick={expand}  onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
			<video style={vidStyle} ref={vidRef} autoPlay muted loop>
				<source src={DigitClass_Vid} type='video/mp4' />
			</video>
			<h1 style={h1Style}>Neural Network from<br />Scratch</h1>
			<p style={p1Style}>
				A Neural Network build with only Numpy library for numerical computing in Python without using any modern ML frameworks like Tensorflow and PyTorch.
			</p>
			<img src={NN4} style={imgStyle} alt='A figure showing how to calculate the activation of a neuron in a neural network.'/>
			<p style={p2Style}>
				By implementing a neural network without ML libraries, I was able to understand the core principles and mathematics of how a neural network works 
				without the complexities of modern machine learning frameworks.<br />
			</p>
			<p style={p3Style}>
				I've also written a blog, <a style={aStyle} href='https://lookingisnotenough.com/UnderstandingNeuralNetworks' target={'_blank'} rel="noreferrer">"Understanding Neural Networks"</a>.<br />
				And made this model in a <a style={aStyle} href='https://colab.research.google.com/drive/1B9Uu9A-O6efN8_oqYGYmU8iiD-JK80dt' target={'_blank'} rel="noreferrer">Jupyter notebook</a> with annotations for the code in google colab.
				It runs on the google servers so there's no need to install anything.<br />
			</p>
			<p>
				Here's the <a style={aStyle} href='https://github.com/ShawakSaraf/Neural-Network-from-Scratch' target={'_blank'} rel="noreferrer">Github Repository.</a>
			</p>
		</div>
	);
}


export default NeuralNetwork;