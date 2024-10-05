import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { initMiniApp } from '@telegram-apps/sdk-react';

const Head = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Choomba</title>
        <script src="https://telegram.org/js/telegram-web-app.js" defer></script>
        <script>Telegram.WebApp.expand();</script>
        {() => {                
          const [miniApp] = initMiniApp();
          miniApp.setHeaderColor('#000000');}}
      </Helmet>
    </HelmetProvider>
  );
};

export default Head;
