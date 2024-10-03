import React, { useEffect, useState } from 'react';
import { AnnouncScript } from '../scripts/announcScript.js';
import styles from './CreateField.module.css';
import useUserData from '../scripts/takeTGinfo.js';

const CreateField = () => {
    const { announcements, createAnnouncement, setTitle, setDescription, setCategory, setSubCategory } = AnnouncScript();
    const userData = useUserData();
    const [selectedCategory, setSelectedCategory] = useState(''); // Состояние для выбранной категории
    const [selectedSubCategory, setSelectedSubCategory] = useState(''); // Состояние для выбранной подкатегории

    // Определение категорий и подкатегорий
    const categories = {
        activities: [
            { value: 'sport', label: 'Спорт' },
            { value: 'computerGames', label: 'Компьютерные игры' },
            { value: 'entertainment', label: 'Развлечения' },
        ],
        sport: ['Футбол', 'Баскетбол', 'Волейбол'],
        computerGames: ['CS2', 'Dota', 'PUBG', 'Fortnite'],
        entertainment: [],
    };

    const handleCategoryChange = (event) => {
        const categoryValue = event.target.value;
        setSelectedCategory(categoryValue);
        setCategory(categoryValue); // Устанавливаем категорию в AnnouncScript
        setSelectedSubCategory(''); // Сбросить подкатегорию при изменении категории
        setSubCategory(''); // Сбросить подкатегорию в AnnouncScript
    };

    const handleSubCategoryChange = (event) => {
        const subCategoryValue = event.target.value;
        setSelectedSubCategory(subCategoryValue);
        setSubCategory(subCategoryValue); // Устанавливаем подкатегорию в AnnouncScript
    };

    const handleCreateAnnouncement = () => {
        const titleValue = userData.username.toString(); // Используем имя пользователя как заголовок
        setTitle(titleValue); // Устанавливаем заголовок в AnnouncScript
        createAnnouncement(); // Создаем объявление
    };

    return (
        <div className={styles.CreatField}>
            <h2>Создать объявление</h2>
            <p>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option disabled value="">Выберите категорию</option>
                    {categories.activities.map((activity) => (
                        <option key={activity.value} value={activity.value}>
                            {activity.label}
                        </option>
                    ))}
                </select>
            </p>
            {selectedCategory && (
                <p>
                    <select value={selectedSubCategory} onChange={handleSubCategoryChange}>
                        <option disabled value="">Выберите подкатегорию</option>
                        {categories[selectedCategory].map((subcategory) => (
                            <option key={subcategory} value={subcategory}>
                                {subcategory}
                            </option>
                        ))}
                    </select>
                </p>
            )}
            <textarea
                className={styles.description_input}
                placeholder="Описание"
                value={announcements.description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button className={styles.createBut} onClick={handleCreateAnnouncement}>Создать объявление</button>
        </div>
    );
};

export default CreateField;


