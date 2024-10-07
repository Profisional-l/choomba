import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnnouncScript } from "./scripts/announcScript.js";
import HelloMain from "./HelloMain/HelloMain.jsx";
import { initMiniApp as actualInitMiniApp } from '@telegram-apps/sdk-react';

const initMiniApp = () => {
    if (window.location.href.includes("localhost")) {
        return [
            {
                setHeaderColor: (color) => console.log(`Header color set to: ${color}`),
            },
        ];
    } 
    return actualInitMiniApp();
};
const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Получаем компоненты даты
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Форматируем дату в нужный формат
    return `${day}.${month} ${hours}:${minutes}`;
};
const imageMap = {
    'CS2': 'src/assets/subcat_pictures/cs2.jpg',
    'Dota 2': 'path/to/dota2-image.jpg',
    'PUBG': 'path/to/pubg-image.jpg',
    'Fortnite': 'path/to/fortnite-image.jpg',
    'Warzone': 'path/to/warzone-image.jpg',
    'Apex Legends': 'path/to/apex-legends-image.jpg',
    'Футбол': 'src/assets/subcat_pictures/cs2.jpg',
    'Баскетбол': 'path/to/dota2-image.jpg',
    'Волейбол': 'path/to/pubg-image.jpg',
    'Хоккей': 'path/to/fortnite-image.jpg',
    'Теннис': 'path/to/warzone-image.jpg',
    'Кино': 'path/to/apex-legends-image.jpg',
    'Квизы': 'src/assets/subcat_pictures/cs2.jpg',
    'Настольные игры': 'path/to/dota2-image.jpg',
    'Концерты': 'path/to/pubg-image.jpg',
    'Квесты': 'path/to/fortnite-image.jpg',
    'Просто прогулка': 'path/to/warzone-image.jpg',
    'Другое': 'path/to/apex-legends-image.jpg',
}
const MainScreen = () => {
    const [miniApp] = initMiniApp();
    const isTelegram = !!miniApp;

    const location = useLocation();
    const { category, subcategory, fromFindPage } = location.state || {};
    
    // Состояние для отслеживания загрузки
    const [isLoading, setIsLoading] = useState(true);
    const { announcements } = AnnouncScript();

    const filteredAnnouncements = subcategory
        ? announcements.filter(
            (announcement) => announcement.subcategory === subcategory
        )
        : announcements;

    const sortedAnnouncements = filteredAnnouncements.sort((a, b) => b.id - a.id);    

    useEffect(() => {
        // Установка цвета заголовка, если мы в окружении Telegram
        if (isTelegram) {
            miniApp.setHeaderColor('#000000');
        }
        
        // Имитация загрузки данных
        setTimeout(() => {
            setIsLoading(false); // Завершение загрузки
        }, 500); // Задержка для демонстрации спиннера (можно убрать в реальной ситуации)

    }, [isTelegram, miniApp]);

    return (
        <>
            {!fromFindPage && <HelloMain />}

            <div style={{ marginTop: "20px", textAlign: "center" }}>
                {category && subcategory && (
                    <h2>
                        Выбранная категория: {category} | {subcategory}
                    </h2>
                )}
            </div>
            {fromFindPage && (
                <Link to="/">
                    <button className="NoFilterBut">Сбросить фильтры</button>
                </Link>
            )}

            {/* Показываем спиннер/индикатор загрузки, пока идет загрузка */}
            {isLoading ? (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                        <div className="spinner-container">
                              <div className="spinner"></div>
                        </div>
                </div>
            ) : (
                <div style={{ marginTop: "40px", marginBottom: "40px" }}>
                    <div>
                        {sortedAnnouncements.map((announcement) => (
                            <Link
                                className="link"
                                to="/annpage"
                                state={{ announcement }}
                                key={announcement.id}
                            >
                            <div className="annCard">
                                <div>
                                    <h2>@{announcement.title} ищет людей для: {announcement.subcategory} - {announcement.category}</h2>
                                    <hr style={{ opacity: 0.3, maxWidth: "85%" }} />
                                </div>
                                <div className="DescContainer">
                                    <img 
                                        src={imageMap[announcement.subcategory] || 'src/assets/subcat_pictures/default.jpg'} 
                                        alt={announcement.subcategory} 
                                        className="announcementImage" 
                                    />
                                     <p className="descriptionText"> <b className="textdesc">Описание: </b><br />
                                        {announcement.description.length > 50 
                                            ? `${announcement.description.substring(0, 50)}...` 
                                            : announcement.description}
                                    </p>
                                </div>
                                <div className="CardIdContainer">
                                    <p className="CardId">
                                        {formatDate(announcement.created_at)}
                                    </p>
                                    <p className="CardId">
                                        id: {announcement.id}
                                    </p>
                                </div>
                            </div>
                                                    

                            </Link>
                        ))}
                    </div>
                    <ul style={{ textAlign: "left" }}>
                        {/* Другие элементы списка, если нужно */}
                    </ul>
                </div>
            )}
        </>
    );
};

export default MainScreen;
