import React, { useState } from 'react';
import { AnnouncScript } from '../scripts/announcScript.js';
import styles from './CreateField.module.css';
import useUserData from '../scripts/takeTGinfo.js';
import checkmarkImage from '../assets/checked.png'; 
import ErrorCheckmarkImage from '../assets/error.png'; 
import LoadCheckmarkImage from '../assets/loadingchecked.png'; 

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
    const [subCategoryError, setSubCategoryError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAnnouncementCreated, setIsAnnouncementCreated] = useState(false);
    const [isErrorOccurred, setIsErrorOccurred] = useState(false);
    const [isDescriptionError, setIsDescriptionError] = useState(false);
    const [isCategoryError, setIsCategoryError] = useState(false); // Новое состояние для проверки категории
    const [description, setDescriptionState] = useState(''); // Управление состоянием description внутри компонента

    const categories = {
        activities: [
            { value: 'sport', label: 'Спорт' },
            { value: 'computerGames', label: 'Компьютерные игры' },
            { value: 'mobileGames', label: 'Мобильные игры' },
            { value: 'entertainment', label: 'Развлечения' }
        ],
        sport: ['Футбол', 'Баскетбол', 'Волейбол', 'Теннис', 'Хоккей', 'Другое'],
        computerGames: ['CS2', 'Dota 2', 'PUBG', 'Fortnite', 'Warzone', 'Apex Legends', 'Valorant', 'Другие игры'],
        mobileGames: ['Brawl Stars', 'PUBG Mobile', 'Standoff 2', 'Free Fire', 'League of Legends', 'Другие игры'],
        entertainment: ['Кино', 'Квизы', 'Настольные игры', 'Концерты', 'Квесты', 'Просто прогулка', 'Другое']
    };

    const handleCategoryChange = (category) => {
        setSelectedCategoryState(category);
        setCategory(category);
        setIsCategoryError(false); // Сбрасываем ошибку при выборе категории

        if (category === 'Спорт') {
            setSubCategories(categories.sport);
        } else if (category === 'Компьютерные игры') {
            setSubCategories(categories.computerGames);
        } else if (category === 'Мобильные игры') {
            setSubCategories(categories.mobileGames);
        } else if (category === 'Развлечения') {
            setSubCategories(categories.entertainment);
        } else {
            setSubCategories([]);
        }

        setSelectedSubCategory('');
        setIsCategoryModalOpen(false);
        setSubCategoryError(false);
    };

    const handleSubCategoryChange = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setSubCategory(subCategory);
        setIsSubCategoryModalOpen(false);
        setSubCategoryError(false);
    };

    const handleCreateAnnouncement = async () => {
        if (!description || !description.trim()) {
            setIsDescriptionError(true);  
            return;
        }

        setIsDescriptionError(false); 

        if (!selectedSubCategory && subCategories.length > 0) {
            setSubCategoryError(true);
            return;
        }

        if (!selectedCategory) { // Проверка, выбрана ли категория
            setIsCategoryError(true);
            return;
        }

        setSubCategoryError(false);
        setIsLoading(true);
        setIsErrorOccurred(false);

        const title = userData.username;
        setTitle(title);

        try {
            const response = await fetch(`${API_URL}/announcements`);

            if (!response.ok) {
                throw new Error('Ошибка при получении объявлений');
            }

            const existingAnnouncements = await response.json();

            const count = existingAnnouncements.filter(announcement => announcement.title === title).length;

            if (count >= 2) {
                setIsErrorOccurred(true);
                setIsLoading(false);
                return;
            }

            await createAnnouncement();
            setIsAnnouncementCreated(true);
        } catch (error) {
            console.error('Ошибка:', error);
            setIsErrorOccurred(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.CreatField}>
            {isAnnouncementCreated ? (
                <div className={styles.successMessage}>
                    <img src={checkmarkImage} alt="Галочка" className={styles.checkmarkImage} />
                    <h2>Объявление создано!</h2>
                </div>
            ) : isLoading ? (
                <div className={styles.successMessage}>
                    <img src={LoadCheckmarkImage} alt="Загрузка" className={styles.LoadcheckmarkImage} />
                    <h2>Объявление уже в пути!</h2>
                </div>
            ) : isErrorOccurred ? (
                <div className={styles.successMessage}>
                    <img src={ErrorCheckmarkImage} alt="Крестик" className={styles.checkmarkImage} />
                    <h2 style={{color: "#be2731"}}>Нельзя создавать более 2х объявлений!</h2>
                    <h3>Удалите старые объявления и попробуйте еще раз  (◕‿◕)</h3>
                </div>
            ) : (
                <>
                    <h2>Создать объявление</h2>
                    <div className={styles.Selector_Cont}>
                        <button
                            className={`${styles.select_button} ${isCategoryError ? styles.redborder : ''}`} // Применяем класс для обводки
                            onClick={() => setIsCategoryModalOpen(true)}
                        >
                            {selectedCategory ? `Категория: ${selectedCategory}` : 'Выберите категорию'}
                        </button>
                        {isCategoryModalOpen && (
                            <div className={styles.modal}>
                                <div className={styles.modal_content}>
                                    <ul>
                                        <h3>Выберите категорию:</h3>
                                        <br />
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
                            <button
                                className={`${styles.select_button} ${subCategoryError ? styles.redborder : ''}`}
                                onClick={() => setIsSubCategoryModalOpen(true)}
                            >
                                {selectedSubCategory ? `Подкатегория: ${selectedSubCategory}` : 'Выберите подкатегорию'}
                            </button>
                            {isSubCategoryModalOpen && (
                                <div className={styles.modal}>
                                    <div className={styles.modal_content}>
                                        <ul>
                                            <h3>Выберите подкатегорию:</h3>
                                            <br />
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
                        className={`${styles.description_input} ${isDescriptionError ? styles.redborder : ''}`}
                        placeholder="Описание, пожалуйста, обязательно укажите детали"
                        maxLength={150}
                        value={description}  // Используем внутреннее состояние description
                        onClick={() => {
                            setTitle(userData.username.toString());
                        }}
                        onChange={(e) => {
                            setDescriptionState(e.target.value); // Используем локальную функцию
                            setDescription(e.target.value); // Также передаем значение в AnnouncScript для сохранения
                            if (e.target.value.trim()) {
                                setIsDescriptionError(false);
                            }
                        }}
                    />

                    <button className={styles.createBut} onClick={handleCreateAnnouncement}>
                        Создать объявление
                    </button>
                </>
            )}
        </div>
    );
};

export default CreateField;
