import { useState } from 'react';

import DigitClass_Vid from '../images/NN/Handwritten_digit_classification.webm'
import NN1 from '../images/NN/NN1.png'
import NN2 from '../images/NN/NN2.png'
import NN3 from '../images/NN/NN3.png'
import NN4 from '../images/NN/NN4.png'

function NeuralNetwork({isPhone, width})
{
	const [isClicked, setIsClicked] = useState(false);

	const expand = () => {
		setIsClicked( isClicked ? false : true);
		console.log( 'TPS clicked', isClicked );
	};
	var divStyle = {
		backgroundColor: '#dfb921',
		color: 'black',
		maxHeight: isClicked ? '1180px' : '21vw',
		transition: isClicked ? '0.25s' : '0.5s',
	};
	var h1Style = {
		fontSize     : isClicked ? '5em' : '2vw',
		letterSpacing: '0.3em',
		padding      : isClicked ? '0em 0 1em 0': '5.3vw 0 10vw 0',
		transition   : isClicked ? '0.25s': '0.5s',
	};	 
	var p1Style = {
		paddingLeft: '38vw'
	};	 

	var p2Style = {
		padding: '10vw 0 0vw 0vw',
		textAlign: 'left',
	}
	var p3Style = {
		padding: '1vw 0 1vw 0vw',
		textAlign: 'left',
	}

	var vidStyle = {
		width: '45%',
		float: 'left',
		borderRadius: '5px',
	}
	var imgStyle = {
		width: '35%',
		float: 'right',
		marginTop: '2vw',
	}
	const aStyle = { color: '#413400', }

   if( width <= 2000 )
   {
		h1Style = {
			fontSize     : isClicked ? '1.7vw' : '2vw',
			letterSpacing: '0.3em',
			padding      : isClicked ? '0em 0 1em 0': '5.3vw 0 10vw 0',
			transition   : isClicked ? '0.25s': '0.5s',
		};	 
      p2Style = {
         padding: '1vw 0 2vw 0vw',
         textAlign: 'left',
      }
   }

	if( isPhone )
	{
		divStyle = {
			backgroundColor: '#dfb921',
			color: 'black',
			// width: '100px',
			maxHeight: isClicked ? '1180px' : '320px',
			transition: isClicked ? '0.25s' : '0.5s',
		};
		vidStyle = {
			width: '100%',
			borderRadius: '5px',
		}
		h1Style = {
			fontSize  : isClicked ? '1.7em' : '1.8em',
			padding   : isClicked ? '1em 0 1em 0' : '1.5em 0 4em 0',
			transition: isClicked ? '0.25s' : '0.5s',
		};
		p1Style = {
			paddingLeft: '0',
         textAlign: 'center',
		};	 
		p2Style = {
			padding: '0',
		};
		imgStyle = {
			width: '60%',
			marginTop: '2vw',
		}
	}
	return (
		<div style={divStyle} onClick={expand}>
			<video style={vidStyle} controls autoPlay muted loop>
				<source src={DigitClass_Vid} type='video/mp4' />
			</video>
			<h1 style={h1Style}>Neural Network from Scratch</h1>
			<p style={p1Style}>
				A Neural Network build with only Numpy library for numerical computing in Python without using any modern ML frameworks like Tensorflow and PyTorch.
			</p>
			<img src={NN4} style={imgStyle} />
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