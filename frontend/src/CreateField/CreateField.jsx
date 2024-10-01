import React from 'react';
import { AnnouncScript } from '../scripts/announcScript.js';
import styles from  './CreateField.module.css';
import useUserData from '../scripts/takeTGinfo.js'; 


const CreateField = () => {
    const { announcements, createAnnouncement, setTitle, setDescription } = AnnouncScript(); 
    const userData = useUserData();

    return (
      <div className={styles.CreatField}>
        <h2>Создать объявление</h2>
        <h1>Welcome, {userData.username}!</h1>
        {/* <input 
            className={styles.category_input}
            type="text" 
            placeholder="Заголовок" 
            value={announcements.title} 
            onChange={(e) => setTitle(e.target.value)} 
        />   */}
        <textarea 
            className={styles.description_input}
            placeholder="Описание" 
            value={announcements.description} 
            onChange={(e) => {
              setDescription(e.target.value);
              setTitle(userData.username);
          }}
                  />
        
        <button  className={styles.createBut} onClick={createAnnouncement}>Создать объявление</button>
      </div>
    );
  };
  
  export default CreateField;
  