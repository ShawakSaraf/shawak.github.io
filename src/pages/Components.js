import { useState, useEffect, useRef } from 'react';
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
			setTimeout(() => 
			{
				setIndex((index + 1) % images.length);
			}, 500);
			setTimeout(() => {
				setOpacity(1);
			}, 1000);
		}, 4000);
		
		return () => clearInterval(interval);
	}, [index, isMouseOver]);
	
	return (
		<img
		src={images[index]}
		alt=""
		style={{ opacity, transition: 'opacity 0.5s ease-in-out', ...props.style}}
		/>
	);
}

// function Sphere()
// {
// 	const mesh = useRef();
// 	let time = 0;

// 	const sphereGeometry = new THREE.SphereGeometry( 3, 1, 1 );
// 	const update = () => 
// 	{
// 	const PI = 3.141592;
// 	time += performance.now() * 0.001;
// 	// console.log( 'delta: ', time );

// 	mesh.current.rotation.x = window.innerHeight*PI;
// 	mesh.current.rotation.y = window.innerWidth*PI;

// 	mesh.current.geometry.normalsNeedUpdate  = true;
// 	mesh.current.geometry.verticesNeedUpdate = true;
// 	mesh.current.geometry.computeVertexNormals();
// 	};

// 	useEffect( () => { 
// 	update();
// 	console.log( 'updating' );
// 	})

// 	return (
// 	<mesh ref={mesh}>
// 		<primitive object={sphereGeometry} attach={'geometry'} />
// 		<meshNormalMaterial />
// 	</mesh>
// 	);
// }
export function DropDown()
{
	return (
		<span className="material-symbols-rounded expantion-arrow">
			arrow_downward
		</span>
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
	const svgCode = width>768 ? `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
		<style>
			:root {
				--col1  : #a6afff;
				--col2  : #f1345d;
				--anim_t: 20s;
			}
			.circle-1, .circle-2  {
				transform-origin: 400px 225px;
				filter: blur(40px);
			}
			.circle-1  {
				animation: anim-1 var(--anim_t) ease-in-out infinite;
				transform: translateZ(0.0001px);
			}
			.circle-2 {
				animation: anim-2 var(--anim_t) ease-in-out infinite;
				transform: translateZ(0.0002px);
			}
			@keyframes anim-1 {
				25% {
					transform-origin: 280px 155px;
					transform: rotate(180deg);
				}
				50% {
					transform: rotate(0deg);
				}
				75% {
					transform-origin: 550px 155px;
					transform: rotate(180deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}
			@keyframes anim-2 {
				25% {
					transform-origin: 500px 295px;
					transform: rotate(-180deg);
				}
				500% {
					transform: rotate(0deg);
				}
				75% {
					transform-origin: 200px 295px;
					transform: rotate(180deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}
		</style>
		<g >
			<ellipse class="circle-1" cx="402.348" cy="230" fill="var(--col1)" rx="${radius}" ry="${radius}"/>
			<ellipse  class="circle-2" cx="300.849" cy="225" fill="var(--col2)" rx="${radius}" ry="${radius}"/>
		</g>
	</svg>
	` : `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
		<style>
			:root {
				--col1  : #a6afff;
				--col2  : #f1345d;
				--anim_t: 10s;
			}
			.circle-1, .circle-2 {
				transform-origin: 400px 225px;
				filter: blur(40px);
			}
			.circle-1 {
				transform : rotate(70deg) translateX( 100px );
			}
			.circle-2 {
				transform : rotate(0deg) translate3d(-10px, -80px,0 );
			}
		</style>
		<g >
			<ellipse class="circle-1" cx="402.348" cy="230" fill="var(--col1)" rx="${radius}" ry="${radius}"/>
			<ellipse  class="circle-2" cx="300.849" cy="225" fill="var(--col2)" rx="${radius}" ry="${radius}"/>
		</g>
	</svg>`;
	
  	const divStyle = {
		backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svgCode)}")`,
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

	const props = { isPhone, width, ImageFade };
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

function About({ aboutRef })
{
   return(
      <div id="About" ref={aboutRef}>
         <header>About</header>
			<p style={ { textAlign: 'center' } }>
				Hey! I'm a human trying to figure out life.<br />
				In the real world I'm a self-taught programmer and game developer.<br />
				I'm also really facsinated by machine learning.
			</p>
      </div>
   );
}

function Socials()
{
	return (
		<ul class="socials">
			<li><a href="https://twitter.com/ShawakSaraf" target="_blank" rel="noreferrer"><i class="icon-twitter"></i></a></li>
			<li><a href="https://www.instagram.com/shawaksaraf/" target="_blank" rel="noreferrer"><i class="icon-instagram"></i></a></li>
			<li><a href="https://www.github.com/shawaksaraf/" target="_blank" rel="noreferrer"><i class="icon-github"></i></a></li>
		</ul>
	);
}

function Content() 
{
	const homeRef    = useRef(null);
	const projetsRef = useRef(null);
	const aboutRef   = useRef(null);
	// const homeEndRef = useRef(null);
	
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return(
		<div className='container'>
			<Home homeRef={homeRef} width={width}/>
			<Project projetsRef={projetsRef}  width={width}/>
			<About aboutRef={aboutRef}/>
			{/* <Home homeRef={homeEndRef}/> */}
			{/* <Project />
			<About /> */}
		</div>
	);
}

export {NavBar, Home, Project, About, Socials, Content};