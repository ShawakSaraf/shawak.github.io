export function NavBar( { projetsRef, homeRef, aboutRef, ...props } )
{
  function handleHomeClick(e)
  {
      window.scrollTo({
         top: homeRef.current.offsetTop,
         behavior: 'smooth',
      });
  }
  function handleProjectsClick(e)
  {
      window.scrollTo({
         top: projetsRef.current.offsetTop - window.innerHeight*0.25,
         behavior: 'smooth',
      });
  }
  function handleAboutClick(e)
  {
   window.scrollTo({
      top: aboutRef.current.offsetTop - window.innerHeight*0.15,
      behavior: 'smooth',
   });
}
  
  return (
    <nav className="nav" role={"navigation"}>
      <div className='top-menu'>
          <ul>
            <li><a onClick={handleHomeClick} >Home</a></li>
            <li><a onClick={handleProjectsClick} >Projects</a></li>
            <li><a onClick={handleAboutClick} >About</a></li>
          </ul>
      </div>
    </nav>
  );
}

export function Home({ homeRef })
{
  return (
    <div ref={homeRef}>
      <header className="main-logo">
        <p>Shawak</p>
        <ul className="sub-logo">
          <p>GameDev MachineLearning</p>
        </ul>
      </header>
    </div>
  );
}

export function About({ aboutRef })
{
   return(
      <div id="About" ref={aboutRef}>
         <header>About</header>
         <p>
            Hey! I'm a human trying to figure out life.
         </p>
      </div>
   );
}