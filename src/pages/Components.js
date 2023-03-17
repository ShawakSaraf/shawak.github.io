import { useState, useEffect, useRef } from 'react';

import ProceduralAnimation from './Proc_Anim';
import TPSPrototype from './TPS_proto';
import GANVAE from './GANVAE';
import NeuralNetwork from './NeuralNetwork';

export function NavBar( { projetsRef, homeRef, aboutRef, ...props } )
{
	function handleHomeClick(e)
	{
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}
	function handleProjectsClick(e)
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

	const menuRef = useRef(null);
	const [ lastScrollY, setLastScrolY ] = useState(window.scrollY)
	const [menuStyle, setMenuStyle] = useState({
		position       : "fixed",
		top            : "0",
		transform      : "translateX(50vw)",
		padding        : "20px 0 30px 0",
		width          : "400px",
		left           : "-200px",
		backgroundColor: "var(--navbar-col)",
		boxShadow      : "0 8px 20px rgba(0, 0, 0, 0.226)",
		borderRadius   : "0 0 50px 50px",
		zIndex         : "1",
		transition     : "0.5s",
	});

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;

			if (scrollY > lastScrollY && menuStyle.top === "0") 
			{
				// slide up out of the screen
				setMenuStyle((prevStyle) => ({ ...prevStyle, top: "-100px" }));
			}
			else if (scrollY === lastScrollY && menuStyle.top === "-100px") 
			{
				// slide down into the screen
				setMenuStyle((prevStyle) => ({ ...prevStyle, top: "0" }));
			}
			setLastScrolY( window.scrollY );
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, [menuStyle]);
  
	return (
		<nav className="nav" role={"navigation"}>
			<div className='top-menu'>
				<ul>
					<li><a onClick={handleHomeClick} href >Home</a></li>
					<li><a onClick={handleProjectsClick} href >Projects</a></li>
					<li><a onClick={handleAboutClick} href >About</a></li>
				</ul>
			</div>
		</nav>
	);
}

export function Home({ homeRef })
{
  return (
    <div ref={homeRef}>
      <header id="Home" className="main-logo">
        <p>Shawak •—</p>
        <ul className="sub-logo">
          <p>GameDev • MachineLearning</p>
        </ul>
      </header>
    </div>
  );
}

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

export function Project({projetsRef})
{
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const isPhone = width < 768;

	const props = { isPhone, width, ImageFade }
	return (
		<div id='Projects' ref={projetsRef}>
			<header style={{ marginBottom: '1em' }}>Projects</header>
			<TPSPrototype {...props}/>
			<GANVAE {...props}/>
			<ProceduralAnimation {...props}/>
			<NeuralNetwork {...props}/>
		</div>
	);
}

export function About({ aboutRef })
{
   return(
      <div id="About" ref={aboutRef}>
         <header>About</header>
			<p style={ { textAlign: 'center' } }>
				Hey! I'm a human trying to figure out life.<br />
				{/* In the real world I'm a self-taught programmer and game developer.<br />
				I'm also really facsinated by machine learning. */}
			</p>
      </div>
   );
}

export function Socials()
{
	return (
		<div class="container-wrap">
			<footer id="footer" role="contentinfo">
				<div class="col-md-12 text-center">
					<ul class="social-icons">
						<li><a href="https://twitter.com/ShawakSaraf" target="_blank"><i class="icon-twitter"></i></a></li>
						<li><a href="https://www.instagram.com/shawaksaraf/" target="_blank"><i class="icon-instagram"></i></a></li>
						<li><a href="https://www.github.com/shawaksaraf/" target="_blank"><i class="icon-github"></i></a></li>
					</ul>
				</div>
			</footer>
		</div>
	);
}