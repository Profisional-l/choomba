import React, { useState } from 'react';
import { AnnouncScript } from '../scripts/announcScript.js';
import styles from './CreateField.module.css';
import useUserData from '../scripts/takeTGinfo.js';

const CreateField = () => {
    const { announcements, createAnnouncement, setTitle, setDescription, setCategory, setSubCategory } = AnnouncScript();
    const userData = useUserData();
    
    const [selectedCategory, setSelectedCategoryState] = useState('');  // Стейт для выбранной категории
    const [subCategories, setSubCategories] = useState([]);  // Стейт для подкатегорий
    const [selectedSubCategory, setSelectedSubCategory] = useState('');  // Стейт для выбранной подкатегории
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);  // Стейт для модального окна категории
    const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);  // Стейт для модального окна подкатегории
    
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

    // Функция для изменения выбранной категории
    const handleCategoryChange = (category) => {
        setSelectedCategoryState(category);  // Установка выбранной категории
        setCategory(category);  // Сохранение выбранной категории в скрипт
        
        // Установка подкатегорий в зависимости от выбранной категории
        if (category === 'Спорт') {
            setSubCategories(categories.sport);
        } else if (category === 'Компьютерные игры') {
            setSubCategories(categories.computerGames);
        } 
        else if (category === 'Развлечения') {
            setSubCategories(categories.entertainment);
        }
        else {
            setSubCategories([]);
        }

        setSelectedSubCategory('');  // Сброс подкатегории
        setIsCategoryModalOpen(false);  // Закрытие модального окна категории
    };

    // Функция для изменения подкатегории
    const handleSubCategoryChange = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setSubCategory(subCategory); // Установка подкатегории в состояние AnnouncScript
        setIsSubCategoryModalOpen(false);  // Закрытие модального окна подкатегории
    };

    const handleCreateAnnouncement = async () => {
        if (!selectedSubCategory && subCategories.length > 0) {
            alert("Пожалуйста, выберите подкатегорию");
            return;
        }
        await createAnnouncement(); // Создание объявления
    };

    return (
        <div className={styles.CreatField}>
            <h2>Создать объявление</h2>

            {/* Кнопка выбора категории */}
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
                        {/* Закрытие модального окна при клике вне его области */}
                        <div className={styles.modal_overlay} onClick={() => setIsCategoryModalOpen(false)} />
                    </div>
                )}
            </div>

            {/* Кнопка выбора подкатегории появляется только при наличии подкатегорий */}
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
                            {/* Закрытие модального окна при клике вне его области */}
                            <div className={styles.modal_overlay} onClick={() => setIsSubCategoryModalOpen(false)} />
                        </div>
                    )}
                </div>
            )}

            {/* Поле для ввода описания */}
            <textarea
                className={styles.description_input}
                placeholder="Описание"
                value={announcements.description}
                onChange={(e) => {
                    setDescription(e.target.value);  // Установка описания
                    setTitle(userData.username.toString());  // Установка имени пользователя как заголовка
                }}
            />

            {/* Кнопка для создания объявления */}
            <button className={styles.createBut} onClick={handleCreateAnnouncement}>
                Создать объявление
            </button>
        </div>
    );
};

export default CreateField;
