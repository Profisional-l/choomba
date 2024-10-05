import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Head = () => {
  React.useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.expand(); // Расширяем приложение
      window.Telegram.WebApp.setHeaderColor('#000000'); // Меняем цвет заголовка
      // Уберите следующий вызов, если он вызывает ошибку
      // window.Telegram.WebApp.setBgColor('#888311'); // Этот метод не поддерживается
    }
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Choomba</title>
        <script src="https://telegram.org/js/telegram-web-app.js" defer></script>
      </Helmet>
    </HelmetProvider>
  );
};

export default Head;
