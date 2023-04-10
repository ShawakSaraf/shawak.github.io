import { useState, useRef, useEffect } from 'react';
import level2 from '../media/TPS_proto/LevelView.png'
import TPS1 from '../media/TPS_proto/OverShoulder1.png'
import TPS2 from '../media/TPS_proto/OverShoulder2.png'
import TPS3 from '../media/TPS_proto/OverShoulder3.png'
import TPS4 from '../media/TPS_proto/OverShoulder4.png'
import TPS6 from '../media/TPS_proto/OverShoulder6.png'
import ProtoVid from '../media/TPS_proto/Prototype.webm'
import FirstProtoVid from '../media/TPS_proto/First_Prototype.webm'
import run1 from '../media/TPS_proto/Run1.png'
import run4 from '../media/TPS_proto/Run4.png'

function TPSPrototype({isPhone, width, ImageFade})
{
	const [isClicked, setIsClicked]     = useState(false);
	const [dropOpacity, setDropOpacity] = useState('0');
	const [isMouseOver, setIsMouseOver] = useState(false);

	const vidRef  = useRef(null);
	const vidRef2 = useRef(null);

	const fadeProps = {
		images: [ level2, TPS1, TPS2, run1, run4, TPS3, TPS4, TPS6 ],
		isMouseOver: isMouseOver,
		style: { 
			width      : !isPhone ? '40%'  : '75%',
			float      : !isPhone ? 'left' : 'none',
			marginTop  : !isPhone ? '6em'  : '2vw',
			marginRight: !isPhone ? '7em': '0em',
		},
	}

	useEffect( ()=> {
		if ( isMouseOver )
		{
			vidRef.current.play();
			vidRef2.current.play();
		}
		else
		{
			vidRef.current.pause();
			vidRef2.current.pause();
		}
	},[isMouseOver, isClicked] );
	
	function expand() {
		setIsClicked( isClicked ? false : true);
		
	};
	
	const mouseEnter = ()=> {
		setDropOpacity('1');
		setIsMouseOver(true);

	}
	const mouseLeave = ()=> {
		setDropOpacity('0');
		setIsMouseOver(false);
	}

	var divStyle = {
		backgroundColor: '#9a82c2',
		maxHeight : isClicked ? '1440px': !isPhone ? '27vw': '87vw',
		transition: isClicked ? '0.25s' : '0.5s',
	};
	var h1Style = !isPhone ? {
		fontSize     : isClicked ? '2vw'        : '2.2vw',
		padding      : isClicked ? '0em 0 1em 0': '8vw 0 15vw 0',
		transition   : isClicked ? '0.25s'      : '0.5s',
		letterSpacing: '0.2em',
		color        : isClicked ? '#e6d7ff' : 'white',
		margin : '0',
	} : {
		fontSize     : isClicked ? '4.5vw'      : '5vw',
		padding      : isClicked ? '2vw 0 5vw 0': '5vw 0 25vw 0',
		transition   : isClicked ? '0.25s'      : '0.5s',
		letterSpacing: '0.2em',
		color        : isClicked ? '#e6d7ff' : 'white',
	};	 
	var p1Style = {
		paddingLeft: !isPhone ? '44vw': '0'
	};	

	var p2Style = {
		paddingLeft: !isPhone ? width >= 1500 ? '7vw' : '2vw' : '0',
		paddingTop : !isPhone ? width >= 1500 ? '12.5vw': '7vw' : '0',
		textAlign  : 'left',
		width      : !isPhone ? '55%' : '100%',
	};	 

	var p3Style = {
		paddingTop: !isPhone ? '10vw' : '0',
		textAlign: 'left',
	}; 
	var vidStyle = { 
		width      : !isPhone ? '50%' : '100%',
		float      : !isPhone ? 'left': 'center',
		paddinRight: '3em',
		marginRight: '0em',
	};
	var vid2Style = { 
		width : !isPhone ? width >= 1500 ? '35%': '45%' : '100%',
		float : !isPhone ? 'right' : 'center',
		margin: !isPhone ? width >= 1500 ? '5vw 5vw 0 1vw' : '2vw 2vw 0 1vw' : '2vw 0 0 0',
	};

	var dropDownStyle = { opacity: dropOpacity, color: '#3d344d', display: !isPhone ? 'block' : 'none' };
	
	return (
		<div style={divStyle} onClick={expand} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
			{/* <span className={`material-symbols-rounded expansion-arrow ${isClicked ? 'active' : ''}`} style={ dropDownStyle}>
				arrow_downward
			</span> */}
			<video style={ vidStyle } poster={level2} ref={vidRef} muted loop>
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
				<video style={ vid2Style } ref={vidRef2} muted loop>
					<source src={FirstProtoVid} type='video/mp4' />
				</video>
				<p style={ p2Style }>
					This small project germinated when I was learning the basics of game development and made this prototype 
					with a gun hovering in front of the camera shooting a capsule with red oblate sphere as eyes.<br />
				</p>
				<ImageFade {...fadeProps} />
				<p style={ p3Style }>
					I also used unity's IK rigging tool to properly position upper body of the character rig while aimming and rotate the head in the direction on the view.
				</p>
		</div>
	);
}

export default TPSPrototype;