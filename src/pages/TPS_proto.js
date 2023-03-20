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

	const [isClicked, setIsClicked]     = useState(false);
	const [dropOpacity, setDropOpacity] = useState('0');
	
	function expand() {
		setIsClicked( isClicked ? false : true);
	};
	
	const mouseEnter = ()=>
	{
		setDropOpacity('1');
	}
	const mouseLeave = ()=>
	{
		setDropOpacity('0');
	}

	var divStyle = {
		backgroundColor: '#9a82c2',
		// padding : '1vw',
		// width: '100px',
		maxHeight : isClicked ? '1180px': !isPhone ? '27vw': '87vw',
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
		float      : !isPhone ? 'left' : 'center',
		paddinRight: '3em',
		marginRight : '0em',
	};

	var dropDownStyle = { opacity: dropOpacity, color: '#3d344d' };
	if( isPhone )
	{
		h1Style = {
			fontSize  : isClicked ? '4.5vw' : '5vw',
			padding   : isClicked ? '2vw 0 5vw 0' : '5vw 0 25vw 0',
			transition: isClicked ? '0.25s' : '0.5s',
         letterSpacing : '0.2em',
      };
		p1Style = {
			paddingLeft: '0'
		};
		p2Style = {
			padding: '0',
		};
	}
	return (
		<div style={divStyle} onClick={expand} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
			{/* <span className={`material-symbols-rounded expansion-arrow ${isClicked ? 'active' : ''}`} style={ !isPhone ? dropDownStyle : null}>
				arrow_downward
			</span> */}
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