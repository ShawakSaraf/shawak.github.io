import { useState, useEffect, useRef } from 'react';

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
		}, 5000);
		
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
					<li><a onClick={handleProjectClick} href >Projects</a></li>
					<li><a onClick={handleAboutClick} href >About</a></li>
				</ul>
			</div>
		</nav>
	);
}

function Home({ homeRef })
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

function Project({projetsRef})
{
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const isPhone = width < 768;

	const props = { isPhone, width, ImageFade };
	return (
		<div id='Project' ref={projetsRef}>
			<header style={{ marginBottom: '0em' }}>Projects</header>
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
				{/* In the real world I'm a self-taught programmer and game developer.<br />
				I'm also really facsinated by machine learning. */}
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

function InfiniteScrollPage() {
	const pageRef = useRef(null);
 
	const handleScroll = () => {
	  const pageHeight = pageRef.current.offsetHeight;
	  const windowHeight = window.innerHeight;
	  const scrollPosition = window.scrollY;
 
	  if (scrollPosition >= pageHeight - windowHeight) {
		 pageRef.current.insertBefore(
			<div className='container' ref={pageRef}>
        <Home homeRef={homeRef}/>
        <Project projetsRef={projetsRef}/>
        <About aboutRef={aboutRef}/>
        {/* <Socials /> */}
      </div>,
			pageRef.current.firstChild
		 );
	  }
	};
 
	useEffect(() => {
	  window.addEventListener('scroll', handleScroll);
 
	  return () => {
		 window.removeEventListener('scroll', handleScroll);
	  };
	}, []);
	const homeRef    = useRef(null);
	const projetsRef = useRef(null);
	const aboutRef   = useRef(null);
	return (
      <div className='container' ref={pageRef}>
        <Home homeRef={homeRef}/>
        <Project projetsRef={projetsRef}/>
        <About aboutRef={aboutRef}/>
        {/* <Socials /> */}
      </div>
	);
 }

export {NavBar, Home, Project, About, Socials, InfiniteScrollPage};