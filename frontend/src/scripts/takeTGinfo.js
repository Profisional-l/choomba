import { useEffect, useState } from 'react';
import WebApp from "@twa-dev/sdk"; 

const useUserData = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user);
      handleSendUserID(WebApp.initDataUnsafe.user.id); // Отправляем userID сразу после загрузки
    }
  }, []);

  const handleSendUserID = async (userID) => {
    const response = await fetch('http://localhost:5000/send_userid', {
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

  const handleCreateAnnouncement = async (title, description) => {
    if (!userData) {
      console.error("User data is not available");
      return;
    }

    const response = await fetch('http://localhost:5000/announcements', {
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
