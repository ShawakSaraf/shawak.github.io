import { useState } from 'react';

import Proc_anim_behind from '../images/Proc_Anim/Proc_Anim_behind.webm'
import Proc_anim_side from '../images/Proc_Anim/Proc_Anim_side.webm'

function ProceduralAnimation({isPhone, width})
{
	const [isClicked, setIsClicked] = useState(false);

	const expand = () => {
		setIsClicked( isClicked ? false : true);
		console.log( 'TPS clicked', isClicked );
	};
	var divStyle = {
		backgroundColor: '#b7bcff',
		color: 'black',
		// width: '100px',
		maxHeight: isClicked ? '1180px' : !isPhone ? '24.5vw' : '83vw',
		transition: isClicked ? '0.25s' : '0.5s',
	};
	var h1Style = {
		fontSize     : isClicked ? '1.7vw' : '2vw',
		letterSpacing: '0.3em',
		padding      : isClicked ? '0em 0 1em 0': '7.3vw 0 10vw 0',
		transition   : isClicked ? '0.25s': '0.5s',
	};	 
	var p1Style = {
		paddingLeft: '40vw'
	};	 

	var p2Style = {
		padding: '15vw 0 2vw 0vw',
		textAlign: 'left',
	}

	var vid1Style = {
		width: '45%',
		float: 'left',
	}
	var vid2Style = {
		width: '45%',
		float: 'right',
      marginTop: '70px',
      marginLeft: '1.5em',
	}

	if( isPhone )
	{
      vid1Style = {
         width: '90%',
      }
      vid2Style = {
         width: '90%',
      }
		h1Style = {
			fontSize     : isClicked ? '4.5vw'      : '5.2vw',
			padding      : isClicked ? '2vw 0 5vw 0': '4vw 0 25vw 0',
         letterSpacing: '0.2em',
			transition: isClicked ? '0.25s' : '0.5s',
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
		<div style={divStyle} onClick={expand}>
			<video style={ vid1Style } controls autoPlay muted loop>
				<source src={Proc_anim_behind} type='video/mp4' />
			</video>
			<h1 style={h1Style}>Quadruped Procedural<br /> Animation</h1>
			<p style={ p1Style }>
				Quadruped Procedural Animation made in unity with its IK rigging tool.<br />
			</p>
			<video style={ vid2Style } controls autoPlay muted loop>
				<source src={Proc_anim_side} type='video/mp4' />
			</video>
			<p style={p2Style}>
				Simply put, I make an ellipse centered around the last position of the body and project it on the terrain. When the body goes outside that ellipse,
				I assign a new position to each leg in the direction the body moves. To positon the leg vertically I do a raycast from the top of the leg straight down, which gives the data about the geometary it intersects with.
			</p>
		</div>
	);
}

export default ProceduralAnimation;