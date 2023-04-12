import { useState, useEffect, useRef } from 'react';
import { BgImg, Portrait} from './svgs';
import noise from 'noisejs';
// import { Canvas, useFrame, extend, useThree, shadowMap, colorManagement } from '@react-three/fiber';
// import * as THREE from 'three';
// import { ShaderPark } from 'shader-park-core';

import ProceduralAnimation from './Proc_Anim';
import TPSPrototype from './TPS_proto';
import GANVAE from './GANVAE';
import NeuralNetwork from './NeuralNetwork';

function ImageFade({images, isMouseOver, ...props})
{
	const [index, setIndex]     = useState(0);
	const [opacity, setOpacity] = useState(1);

	useEffect(() => {
		const interval = setInterval(() => 
		{
			if ( !isMouseOver )
				return;

			setOpacity(0);
			setTimeout(() => {
					setIndex((index + 1) % images.length);
				}, 500 
			);
			setTimeout(() => {
					setOpacity(1);
				}, 1000 
			);
		}, 4000);
		
		return () => clearInterval(interval);
	}, [index, isMouseOver, images.length]);
	
	return (
		<img
			src={images[index]} alt=""
			style={{ opacity, transition: 'opacity 0.5s ease-in-out', ...props.style}}
		/>
	);
}

export function DropDownArrow({dropDownStyle, isClicked})
{
	return (
		<div className={`expansion-arrow }`} style={dropDownStyle}>
				<span className={`material-symbols-rounded ${isClicked ? 'active' : ''}`}>
					arrow_downward
				</span>
		</div>
	);
}

export function MainVid({video, isClicked, isPlaying, vidStyle, poster })
{
	const vidRef = useRef(null);
	useEffect( ()=> {
		if ( isPlaying || isClicked )
			vidRef.current.play();
		else
			vidRef.current.pause();
	},[isPlaying, isClicked] );

	return (
		<video style={ vidStyle } poster={poster} ref={vidRef} muted loop>
			<source src={video} type='video/mp4' />
		</video>
	);
}

function NavBar( { projetsRef, homeRef, aboutRef, ...props } )
{
	function handleHomeClick(e)
	{
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}
	function handleProjectClick(e)
	{
		window.scrollTo({
			top: projetsRef.current.offsetTop - window.innerHeight*0.1,
			behavior: 'smooth',
		});
	}
	function handleAboutClick(e)
	{
		window.scrollTo({
			top: aboutRef.current.offsetTop - window.innerHeight*0.1,
			behavior: 'smooth',
		});
	}

	const [ lastScrollY, setLastScrolY ] = useState(window.scrollY)

	var style = { transform: 'translate3d( 50vw, -100px, 0 )' };
	useEffect(() => {
		const handleScroll = () => {
			setLastScrolY( window.scrollY );
		};
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	if ( projetsRef.current != null && lastScrollY >= projetsRef.current.offsetTop-300)
		style = { transform: 'translate3d( 50vw, 0vw, 0 )' };

	return (
		<nav className="nav" role={"navigation"}>
			<div className='top-menu' style={style}>
				<ul>
					<li><a onClick={handleHomeClick} href >Home</a></li>
					<li><a onClick={handleProjectClick} href >Projects</a></li>
					<li><a onClick={handleAboutClick} href >About</a></li>
				</ul>
			</div>
		</nav>
	);
}

function Home({ homeRef, width })
{
	const radius = width>768 ? 160 : 140;
	const bgSvg  = BgImg( width>768, radius );
	
  	const divStyle = {
		backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(bgSvg)}")`,
	};

  	return (
	<div ref={homeRef}>
		<header id="Home" style={divStyle}>
			<div className="main-logo">
				<p>Shawak</p>
				<p className="sub-logo">GameDev • MachineLearning</p>
			</div>
		</header>
	</div>
  );
}

function Project({projetsRef, width})
{
	const isPhone = width < 768;

	const props = { isPhone, width, ImageFade, DropDownArrow };
	return (
		<div id='Project' ref={projetsRef}>
			{/* <header style={{ marginBottom: '0em' }}>Projects</header> */}
			<TPSPrototype {...props}/>
			<GANVAE {...props}/>
			<ProceduralAnimation {...props}/>
			<NeuralNetwork {...props}/>
		</div>
	);
}

function About({ aboutRef, width })
{
	const radius = width>768 ? 160 : 140;
	const bgSvg  = BgImg( width>0, radius );
	const portrait  = Portrait();

	const divStyle = {
		// backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(bgSvg)}")`,
	};

	function Header()
	{
		return (
		<h1 style={{
			display           : 'flex',
			alignItems        : 'center',
			justifyContent    : 'center',
			textAlign         : 'center',
			width             : '150vw',
			height            : width>768 ? '25vw' : '50vw',
			margin            : '0',
			backgroundImage   : `url("data:image/svg+xml;utf8,${encodeURIComponent(portrait)}")`,
			backgroundRepeat  : 'no-repeat',
			backgroundSize    : 'contain',
			backgroundPosition: 'center',
			fontFamily        : 'Poppins',
			fontSize          :  width>768 ? '1.8vw' : '4vw',
			letterSpacing: '0.3em'
		}}>
			Hey! I'm Shawak
		</h1>);
	}
	function Description()
	{
		return (
			<p>
				A self-taught <b>programmer</b> and <b>game developer</b>. I'm also fascinated by <b>machine learning</b>.<br />
				In high school I was into sports so I didn't payed much attention to my studies.
				After I finished school I was stuck, didn't know what to pursue so I decided to choose the exceptionally unconventional path of self-study.
			</p>
		);
	}
   return (
      <div id="About" ref={aboutRef}>
         {/* <header>About</header> */}
			<div id='aboutContent'>
				<Header />
				<Description />
			</div>
			<Socials />
      </div>
   );
}

function Socials()
{
	return (
		<div className='socials'>
			<a href="https://twitter.com/shawaksaraf" target="_blank" rel="noreferrer"><i className="icon-twitter"></i></a>
			<a href="https://www.github.com/shawaksaraf" target="_blank" rel="noreferrer"><i className="icon-github"></i></a>
			<a href="https://www.instagram.com/shawaksaraf" target="_blank" rel="noreferrer"><i className="icon-instagram"></i></a>
			<a href="https://www.lookingisnotenough.com/" target="_blank" rel="noreferrer"><i className="icon-blog"></i></a>
			<a href="mailto:shawaksaraf456@gmail.com?subject=Portfolio" target="_blank" rel="noreferrer"><i className="icon-gmail"></i></a>
		</div>
	);
}

function Content() 
{
	const containerRef = useRef(null);
	const homeRef      = useRef(null);
	const projetsRef   = useRef(null);
	const aboutRef     = useRef(null);
	// const homeEndRef = useRef(null);
	
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth)
			console.log(width);
		};

		const handleWheel = (e) => {
			if (!containerRef.current)
				return;

			e.preventDefault();
			containerRef.current.scrollLeft += e.deltaY;
			console.log( 'scrolling', window.scrollX );
		};
		window.addEventListener('resize', handleResize);
		// window.addEventListener('wheel', handleWheel, { passive: false });

		return () => {
			window.removeEventListener('resize', handleResize);
			// window.removeEventListener('wheel', handleWheel);
		}
	}, [width]);

	return(
		<div className='container' ref={containerRef}>
			<Home homeRef={homeRef} width={width}/>
			<Project projetsRef={projetsRef}  width={width}/>
			<About aboutRef={aboutRef} width={width}/>
		</div>
	);
}

export { NavBar, Home, Project, About, Socials, Content };