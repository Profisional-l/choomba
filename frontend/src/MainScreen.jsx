import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnnouncScript } from "./scripts/announcScript.js";
import HelloMain from "./HelloMain/HelloMain.jsx";
import { initMiniApp as actualInitMiniApp } from '@telegram-apps/sdk-react';

import cs2Image from './assets/subcat_pictures/cs2.jpg';
import dota2Image from './assets/subcat_pictures/dota2.png';
import pubgImage from './assets/subcat_pictures/pubg.png';
import fortniteImage from './assets/subcat_pictures/fortnite.png';
import warzoneImage from './assets/subcat_pictures/warzone.png';
import apexImage from './assets/subcat_pictures/apex.png';
import valorantImage from  './assets/subcat_pictures/valorant.png';
import overwatchImage from  './assets/subcat_pictures/overwatch.png';

import brawlstarsImage from  './assets/subcat_pictures/brawlstars.png';
import pubgmobileImage from  './assets/subcat_pictures/pubgmobile.png';
import standoffImage from  './assets/subcat_pictures/standoff.png';
import freefireImage from  './assets/subcat_pictures/freefire.png';
import lolImage from  './assets/subcat_pictures/lol.png';
import genshinImage from  './assets/subcat_pictures/genshin.png';

import footballImage from './assets/subcat_pictures/football.png';
import basketballImage from './assets/subcat_pictures/basketball.png';
import voleyballImage from './assets/subcat_pictures/voleyball.png';
import hockeyImage from './assets/subcat_pictures/hockey.png';
import tenisImage from './assets/subcat_pictures/tenis.png';
import cinemaImage from './assets/subcat_pictures/cinema.png';
import kvizImage from './assets/subcat_pictures/kviz.png';
import boardgamesImage from './assets/subcat_pictures/boardgames.png';
import concertImage from './assets/subcat_pictures/concert.png';
import questsImage from './assets/subcat_pictures/quests.png';
import anyImage from  './assets/subcat_pictures/any.png';


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
    'CS2': cs2Image,
    'Dota 2': dota2Image,
    'PUBG': pubgImage,
    'Fortnite': fortniteImage,
    'Warzone': warzoneImage,
    'Apex Legends': apexImage,
    'Valorant': valorantImage,
    'Overwatch': overwatchImage,
    'Brawl Stars': brawlstarsImage,
    'PUBG Mobile': pubgmobileImage,
    'Standoff 2': standoffImage,
    'Free Fire': freefireImage,
    'League of Legends': lolImage,
    'Genshin Impact': genshinImage,
    'Футбол': footballImage,
    'Баскетбол': basketballImage,
    'Волейбол': voleyballImage,
    'Хоккей': hockeyImage,
    'Теннис': tenisImage,
    'Кино': cinemaImage,
    'Квизы': kvizImage,
    'Настольные игры': boardgamesImage,
    'Концерты': concertImage,
    'Квесты': questsImage,
    'Другое':  anyImage,
    'Другие игры':  anyImage,
    'Просто прогулка'  : anyImage
};
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
