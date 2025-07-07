import React from 'react'
import Navbar from './components/Navbar';
import { ScrollTrigger, SplitText } from 'gsap/all';
import gsap from 'gsap';
import Hero from './components/Hero.jsx';
import Cocktails from './components/Cocktails.jsx';
import About from './components/About.jsx';
import Art from './components/Art.jsx';
import Menu from './components/Menu.jsx';
import Contact from './components/Contact.jsx';
import { Analytics } from "@vercel/analytics/next"


gsap.registerPlugin(ScrollTrigger, SplitText);


const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Cocktails />
      <About />
      <Art />
      <Menu />
      <Contact />
      <Analytics />
    </main>
  )
}

export default App