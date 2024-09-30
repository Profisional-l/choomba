import { useEffect, useState } from 'react';
import WebApp from "@twa-dev/sdk"; 

const useUserData = () => {
  const [userData, setUserData] = useState(null);

  const isLocal = window.location.hostname === 'localhost';
    const API_URL = isLocal ? 'http://localhost:5000' : '/api';

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user);
      handleSendUserID(WebApp.initDataUnsafe.user.id); // Отправляем userID сразу после загрузки
    }
  }, []);

  const handleSendUserID = async (userID) => {
    const response = await fetch(`${API_URL}/send_userid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID }), // Отправляем userID
    });

    const data = await response.json();
    console.log(data);
    // Обработка ответа от сервера
  };

  return userData;
};

export default useUserData;
