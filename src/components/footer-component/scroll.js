import React, {useState} from 'react';
import backToTop from '../../images/backtotop-white.svg';


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
    <img src={backToTop} className="backToTop" style={{ display: showScroll ? 'flex' : 'none'}} onClick={scrollTop} alt="infohub-logo"></img>  );
}

export default ScrollArrow;