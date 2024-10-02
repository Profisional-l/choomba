import React, { useState } from 'react';
import { AnnouncScript } from '../scripts/announcScript.js';
import styles from './CreateField.module.css';
import useUserData from '../scripts/takeTGinfo.js';

const CreateField = () => {
    const { announcements, createAnnouncement, setTitle, setDescription, setCategory } = AnnouncScript();
    const userData = useUserData();
    const [selectedCategory, setSelectedCategoryState] = useState('');  // Локальный стейт для выбранной категории
    const [isModalOpen, setIsModalOpen] = useState(false);  // Стейт для открытия/закрытия модального окна
  
    const categories = [
      { value: 'sport', label: 'Спорт' },
      { value: 'computerGames', label: 'Компьютерные игры' },
      { value: 'entertainment', label: 'Развлечения' }
    ];

    // Функция для изменения выбранной категории
    const handleCategoryChange = (category) => {
      setSelectedCategoryState(category);  // Установка локальной категории
      setCategory(category);  // Сохранение выбранной категории в скрипт
      setIsModalOpen(false);  // Закрытие модального окна после выбора
    };

    const handleCreateAnnouncement = async () => {
        await createAnnouncement(); // Создаем объявление
    };

    return (
        <div className={styles.CreatField}>
            <h2>Создать объявление</h2>

            {/* Кнопка выбора категории и модальное окно */}
            <div className={styles.Selector_Cont}>
                <button className={styles.select_button} onClick={() => setIsModalOpen(true)}>
                    {selectedCategory ? `Категория: ${selectedCategory}` : 'Выберите категорию'}
                </button>
                {isModalOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modal_content}>
                            <ul>
                                <h3>Выберите категорию:</h3> <br />
                                {categories.map((category) => (
                                    <li key={category.value} onClick={() => handleCategoryChange(category.label)}>
                                        {category.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Область вне модального окна для закрытия */}
                        <div className={styles.modal_overlay} onClick={() => setIsModalOpen(false)} />
                    </div>
                )}
            </div>

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
