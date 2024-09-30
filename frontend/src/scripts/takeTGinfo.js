import { useEffect, useState } from 'react';
import WebApp from "@twa-dev/sdk"; 

const useUserData = () => {
  const [userData, setUserData] = useState(null);

  
    // Определяем базовый URL в зависимости от среды
    const isLocal = window.location.hostname === 'localhost';
    const API_URL = isLocal ? 'http://localhost:5000' : 'api';

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
      body: JSON.stringify({ userID }), 
    });

    const data = await response.json();
    console.log(data);
  };

  const handleCreateAnnouncement = async (title, description) => {
    if (!userData) {
      console.error("User data is not available");
      return;
    }

    const response = await fetch(`${API_URL}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        userID: userData.id // Добавляем userID в данные объявления
      }),
    });

    const data = await response.json();
    console.log(data);
    // Обработка ответа от сервера
  };

  return { userData, handleCreateAnnouncement };
};

export default useUserData;
