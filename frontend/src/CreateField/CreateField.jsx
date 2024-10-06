import React, { useState } from 'react';
import { AnnouncScript } from '../scripts/announcScript.js';
import styles from './CreateField.module.css';
import useUserData from '../scripts/takeTGinfo.js';

const CreateField = () => {
    const { announcements, createAnnouncement, setTitle, setDescription, setCategory, setSubCategory } = AnnouncScript();
    const userData = useUserData();
    const isLocal = window.location.hostname === "localhost";
    const API_URL = isLocal ? "http://localhost:5000/" : "/api";

    const [selectedCategory, setSelectedCategoryState] = useState('');  
    const [subCategories, setSubCategories] = useState([]);  
    const [selectedSubCategory, setSelectedSubCategory] = useState('');  
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);  
    const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);  
    
    const categories = {
        activities: [
            { value: 'sport', label: 'Спорт' },
            { value: 'computerGames', label: 'Компьютерные игры' },
            { value: 'entertainment', label: 'Развлечения' }
        ],
        sport: ['Футбол', 'Баскетбол', 'Волейбол', 'Теннис', 'Хоккей'],
        computerGames: ['CS2', 'Dota 2', 'PUBG', 'Fortnite', 'Warzone', 'Apex Legends'],
        entertainment: ['Кино', 'Квизы', 'Настольные игры', 'Концерты', 'Квесты', 'Просто прогулка', 'Другое']
    };

    const handleCategoryChange = (category) => {
        setSelectedCategoryState(category);  
        setCategory(category);  
        
        if (category === 'Спорт') {
            setSubCategories(categories.sport);
        } else if (category === 'Компьютерные игры') {
            setSubCategories(categories.computerGames);
        } else if (category === 'Развлечения') {
            setSubCategories(categories.entertainment);
        } else {
            setSubCategories([]);
        }

        setSelectedSubCategory('');  
        setIsCategoryModalOpen(false);  
    };

    const handleSubCategoryChange = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setSubCategory(subCategory); 
        setIsSubCategoryModalOpen(false);  
    };

    const handleCreateAnnouncement = async () => {
        if (!selectedSubCategory && subCategories.length > 0) {
            alert("Пожалуйста, выберите подкатегорию");
            return;
        }
    
        try {
            const response = await fetch(`${API_URL}/announcements`);

            if (!response.ok) {
                throw new Error('Ошибка при получении объявлений');
            }
            const existingAnnouncements = await response.json();
            const title = userData.username.toString(); // Заголовок объявления
            setTitle(title);
            const count = existingAnnouncements.filter(announcement => announcement.title === title).length;
    
            if (count >= 2) {
                alert("Нельзя создавать более 2 объявлений одному человеку");
                return;
            }
    
            await createAnnouncement(); // Создание объявления
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при создании объявления. Пожалуйста, попробуйте еще раз.');
        }
    };

    return (
        <div className={styles.CreatField}>
            <h2>Создать объявление</h2>

            <div className={styles.Selector_Cont}>
                <button className={styles.select_button} onClick={() => setIsCategoryModalOpen(true)}>
                    {selectedCategory ? `Категория: ${selectedCategory}` : 'Выберите категорию'}
                </button>
                {isCategoryModalOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modal_content}>
                            <ul>
                                <h3>Выберите категорию:</h3> <br />
                                {categories.activities.map((category) => (
                                    <li key={category.value} onClick={() => handleCategoryChange(category.label)}>
                                        {category.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.modal_overlay} onClick={() => setIsCategoryModalOpen(false)} />
                    </div>
                )}
            </div>

            {subCategories.length > 0 && (
                <div className={styles.Selector_Cont}>
                    <button className={styles.select_button} onClick={() => setIsSubCategoryModalOpen(true)}>
                        {selectedSubCategory ? `Подкатегория: ${selectedSubCategory}` : 'Выберите подкатегорию'}
                    </button>
                    {isSubCategoryModalOpen && (
                        <div className={styles.modal}>
                            <div className={styles.modal_content}>
                                <ul>
                                    <h3>Выберите подкатегорию:</h3> <br />
                                    {subCategories.map((subCategory) => (
                                        <li key={subCategory} onClick={() => handleSubCategoryChange(subCategory)}>
                                            {subCategory}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.modal_overlay} onClick={() => setIsSubCategoryModalOpen(false)} />
                        </div>
                    )}
                </div>
            )}

            <textarea
                className={styles.description_input}
                placeholder="Описание"
                maxLength={150}
                value={announcements.description}
                onClick={(e) => {
                    setTitle(userData.username.toString());  
                }}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />

            <button className={styles.createBut} onClick={handleCreateAnnouncement}>
                Создать объявление
            </button>
        </div>
    );
};

export default CreateField;
