import React, {useState} from 'react';
import backToTop from '../../images/backtotop-white.svg';
import svgShadow from '../../images/svg-shadow.png';


const ScrollArrow = () =>{

  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  window.addEventListener('scroll', checkScrollTop)

  return (
    <div>
      <img src={backToTop} className="backToTop" style={{ display: showScroll ? 'flex' : 'none'}} onClick={scrollTop} alt="infohub-logo"></img> 
      <img src={svgShadow} className="svg_shadow" style={{ display: showScroll ? 'flex' : 'none'}} alt="infohub_logo"></img>
    </div>
     );
}

export default ScrollArrow;