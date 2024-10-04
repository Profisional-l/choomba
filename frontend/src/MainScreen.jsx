import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnnouncScript } from './scripts/announcScript.js';
import HelloMain from './HelloMain/HelloMain.jsx';

const MainScreen = () => {
    const location = useLocation();
    const { category, subcategory, fromFindPage } = location.state || {}; // Получаем состояние
    const { announcements } = AnnouncScript(); // Получаем данные из AnnouncScript

    // Фильтруем объявления по подкатегории
    const filteredAnnouncements = subcategory
        ? announcements.filter(announcement => announcement.subcategory === subcategory)
        : announcements;

    return (
        <>
            {/* Условная отрисовка HelloMain */}
            {!fromFindPage && <HelloMain />}
            <Link to="/findpage">
                <button>
                    Поиск
                </button>
            </Link>
            {fromFindPage && <Link to="/"><button>Сбросить фильтры</button></Link>}
            {/* Отображение выбранной категории и подкатегории */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                {category && subcategory && (
                    <h2>
                        Выбранная категория: {category} | Подкатегория: {subcategory}
                    </h2>
                )}
            </div>

            <div style={{ marginTop: "40px", marginBottom: "40px" }}>
                <div>
                    {filteredAnnouncements.map((announcement) => (
                        <Link 
                            className='link' 
                            to="/annpage" 
                            state={{ announcement }}
                            key={announcement.id}
                        >
                            <div className='annCard'>
                                <h2>@{announcement.title} - {announcement.description} | {announcement.category} - {announcement.subcategory}</h2>
                                <p className='CardId'>id: {announcement.id}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <ul style={{ textAlign: 'left' }}>
                    {/* Другие элементы списка, если нужно */}
                </ul>
            </div>
        </>
    );
};

export default MainScreen;
