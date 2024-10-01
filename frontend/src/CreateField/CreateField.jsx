import React, { useState } from 'react';
import { AnnouncScript } from '../scripts/announcScript.js';
import styles from './CreateField.module.css';
import useUserData from '../scripts/takeTGinfo.js';

const CreateField = () => {
    const { announcements, createAnnouncement, setTitle, setDescription, setCategory } = AnnouncScript();
    const userData = useUserData();
    const [selectedCategory, setSelectedCategory] = useState(''); // Состояние для выбранной категории

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCategory(event.target.value); // Устанавливаем категорию в AnnouncScript
    };

    const handleCreateAnnouncement = async () => {
        await createAnnouncement(); // Создаем объявление
    };

    return (
        <div className={styles.CreatField}>
            <h2>Создать объявление</h2>
            {userData ? (
                <h1>Welcome, {userData.username}!</h1>
            ) : (
                <p>Loading user data...</p>
            )}

            <p>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option disabled value="">Выберите категорию</option>
                    <option value="sport">Спорт</option>
                    <option value="computerGames">Компьютерные игры</option>
                    <option value="entertainment">Развлечения</option>
                </select>
            </p>
            <textarea 
            className={styles.description_input}
            placeholder="Описание" 
            value={announcements.description} 
            onChange={(e) => {
            setDescription(e.target.value);
            setTitle(userData.username.toString());
          }}
        />

            <button className={styles.createBut} onClick={handleCreateAnnouncement}>Создать объявление</button>
        </div>
    );
};

export default CreateField;
