import React from 'react';
import { AnnouncScript } from './scripts/announcScript';

const Creat = () => {
  const { announcements, createAnnouncement, setTitle, setDescription } = AnnouncScript(); 

  return (
    <div>
      <h2>Создать объявление</h2>
      <input 
          type="text" 
          placeholder="Заголовок" 
          value={announcements.title} 
          onChange={(e) => setTitle(e.target.value)} 
      />
      <input 
          placeholder="Описание" 
          value={announcements.description} 
          onChange={(e) => setDescription(e.target.value)} 
      />
      <button onClick={createAnnouncement}>Создать объявление</button>
    </div>
  );
};

export default Creat;
