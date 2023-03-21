import { useState, useRef, useEffect } from 'react';

import Proc_anim_behind from '../media/Proc_Anim/Proc_Anim_behind.webm'
import Proc_anim_side from '../media/Proc_Anim/Proc_Anim_side.webm'

function ProceduralAnimation({isPhone, width})
{
	const [isClicked, setIsClicked]     = useState(false);
	const [isMouseOver, setIsMouseOver] = useState(false);

	const vidRef1 = useRef(null);
	const vidRef2 = useRef(null);

	useEffect( ()=> {
		if ( isMouseOver )
		{
			vidRef1.current.play();
			vidRef2.current.play();
		}
		else
		{
			vidRef1.current.pause();
			vidRef2.current.pause();
		}
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
		backgroundColor: '#b7bcff',
		color: 'black',
		maxHeight: isClicked ? '1180px' : !isPhone ? '24.5vw' : '83vw',
		transition: isClicked ? '0.25s' : '0.5s',
	};
	var h1Style = {
		fontSize     : isClicked ? '1.7vw'      : '2vw',
		letterSpacing: '0.3em',
		padding      : isClicked ? '0em 0 1em 0': '7.3vw 0 10vw 0',
		transition   : isClicked ? '0.25s'      : '0.5s',
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
			fontSize     : isClicked ? '4.5vw'      : '4.9vw',
			padding      : isClicked ? '2vw 0 5vw 0': '6vw 0 25vw 0',
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
		<div style={divStyle} onClick={expand}  onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
			<video style={ vid1Style } ref={vidRef1} autoPlay muted loop>
				<source src={Proc_anim_behind} type='video/mp4' />
			</video>
			<h1 style={h1Style}>Quadruped Procedural<br /> Animation</h1>
			<p style={ p1Style }>
				Quadruped Procedural Animation made in unity with its IK rigging tool.<br />
			</p>
			<video style={ vid2Style } ref={vidRef2} muted loop>
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