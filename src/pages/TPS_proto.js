import { useState } from 'react';
import level2 from '../images/TPS_proto/level2-Small.png'
import TPS1 from '../images/TPS_proto/OverShoulder1-Small.png'
import TPS2 from '../images/TPS_proto/OverShoulder2-Small.png'
import TPS3 from '../images/TPS_proto/OverShoulder3-Small.png'
import TPS4 from '../images/TPS_proto/OverShoulder4-Small.png'
import TPS5 from '../images/TPS_proto/OverShoulder5-Small.png'
import TPS6 from '../images/TPS_proto/OverShoulder6-Small.png'
import ProtoVid from '../images/TPS_proto/Prototype.webm'

import dropDown from './Components';

function TPSPrototype({isPhone, width, ImageFade})
{
	const fadeProps = {
		images: [ level2, TPS1, TPS2, TPS3 ],
		style: { 
			width     : !isPhone ? '45%'  : '75%',
			float     : !isPhone ? 'right': 'none',
			marginTop : !isPhone ? '6em'  : '0em',
			marginLeft: !isPhone ? '1.5em'  : '0em',

		},
	}

	const [isClicked, setIsClicked] = useState(false);
	
	const expand = () => {
		setIsClicked( isClicked ? false : true);
		console.log( 'TPS clicked', isClicked );
	};
	
	var divStyle = {
		backgroundColor: '#9a82c2',
		// padding : '1vw',
		// width: '100px',
		maxHeight: isClicked ? '1180px' : '27vw',
		transition: isClicked ? '0.25s' : '0.5s',
	};
	var h1Style = {
		fontSize  : isClicked ? '2vw' : '2.2vw',
		padding   : isClicked ? '0em 0 1em 0' : '8vw 0 15vw 0',
		transition: isClicked ? '0.25s' : '0.5s',
		letterSpacing : '0.2em',
	};	 
	var p1Style = {
		paddingLeft: '44vw'
	};	 

	var p2Style = {
		padding: '13vw 0 0 0',
		textAlign: 'left',
	};

	var vidStyle = { 
		width      : !isPhone ? '50%': '100%',
		float      : 'left',
		paddinRight: '3em',
		marginRight : '0em',
	};
	if( isPhone )
	{
		divStyle = {
			backgroundColor: '#9a82c2',
			maxHeight      : isClicked ? '1180px': '340px',
			transition     : isClicked ? '0.25s' : '0.5s',
		};
		h1Style = {
			fontSize  : isClicked ? '1.8em' : '2em',
			padding   : isClicked ? '12em 0 1em 0' : '11em 0 4em 0',
			transition: isClicked ? '0.25s' : '0.5s',
         letterSpacing : '0.1em',
      };
		p1Style = {
			paddingLeft: '0'
		};
		p2Style = {
			padding: '0',
		};
	}
	return (
		<div style={divStyle} onClick= {expand}>
			<dropDown />			
			<video style={ vidStyle } controls autoPlay muted loop>
				<source src={ProtoVid} type='video/mp4' />
			</video>
			<h1 style={h1Style}>Third-Person Shooter<br/>Prototype</h1>
			<p style={ p1Style }>
				A simple Third-Person Shooter prototype I made some years ago in Unity.<br />
			</p>
			<p style={ p1Style }>
				I'm a huge fan of The Last of Us universe, it is what inspired me to get into game development 
				and my goal with this rough prototype was to study its level design.<br />
			</p>
			<ImageFade {...fadeProps} />
			<p style={ p2Style }>
				I also used unity's IK rigging tool to properly position upper body of the character rig while aimming and rotate the head in the direction on the view.
			</p>
		</div>
	);
}

export default TPSPrototype;