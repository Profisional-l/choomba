import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Head = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Choomba</title>
        {/* <script src="https://telegram.org/js/telegram-web-app.js" defer/> */}
      </Helmet>
    </HelmetProvider>
  );
};

export default Head;
