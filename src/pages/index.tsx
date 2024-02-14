import React from 'react';

import About from '../components/About';
import Analytics from '../components/Analytics';
import Canvas from '../components/Canvas';
import Features from '../components/Features';
import Header from '../components/Header';
import LazyShow from '../components/LazyShow';
import MainHero from '../components/MainHero';
import MainHeroImage from '../components/MainHeroImage';
import Product from '../components/Product';
import config from '../config/index.json';

const App = () => {
  const { whatsapp } = config;

  return (
    <div className={`bg-background grid gap-y-16 overflow-hidden`}>
      <div className={`relative bg-background`}>
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}
          >
            <Header />
            <MainHero />
          </div>
        </div>
        <MainHeroImage />
      </div>
      <Canvas />
      <LazyShow>
        <>
          <Product />
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <Features />
        </>
      </LazyShow>
      {/* <LazyShow>
        <Pricing />
      </LazyShow> */}
      <LazyShow>
        <>
          <Canvas />
          <About />
        </>
      </LazyShow>
      <Analytics />
      <a
        href={whatsapp.link}
        className={`font-medium text-primary hover:text-secondary`}
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          margin: 35,
        }}
      >
        <img
          style={{
            margin: '0 auto',
          }}
          src={whatsapp.img}
          alt="whatsapp"
          className="w-16 h-16 "
        />
        <h1
          style={{
            color: 'white',
            textShadow: '2px 2px 4px rgba(1, 1, 1, 1)',
          }}
        >
          {whatsapp.title}
        </h1>
      </a>
    </div>
  );
};

export default App;
