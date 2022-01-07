import React from "react";
import "./styles.scss";

const Footer = () => {
  /*  const scrollPosition = () => window.scrollY
    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );


    window.addEventListener('scroll', () => {
        const el = document.querySelector('.footer')
        console.log('scrollPosition', scrollPosition())
        console.log('scrollHeight', scrollHeight)
        if (el) {
            (scrollPosition() > 10 && scrollPosition() !== scrollHeight) ? el.classList.add('hidden') : el.classList.remove('hidden')
        }
    })*/

  return <footer className="footer">© 2022 iTechArt</footer>;
};

export default Footer;
