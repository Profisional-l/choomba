import React, { useEffect } from "react";
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

const MainScreen = () => {
    const [miniApp] = initMiniApp();
    const isTelegram = !!miniApp;

    const location = useLocation();
    const { category, subcategory, fromFindPage } = location.state || {};
    const { announcements } = AnnouncScript();

    const filteredAnnouncements = subcategory
        ? announcements.filter(
            (announcement) => announcement.subcategory === subcategory
        )
        : announcements;

    useEffect(() => {
        // Установка цвета заголовка, если мы в окружении Telegram
        if (isTelegram) {
            miniApp.setHeaderColor('#000000');
        }
    }, [isTelegram, miniApp]); // Зависимости для useEffect

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
            <div style={{ marginTop: "40px", marginBottom: "40px" }}>
                <div>
                    {filteredAnnouncements.map((announcement) => (
                        <Link
                            className="link"
                            to="/annpage"
                            state={{ announcement }}
                            key={announcement.id}
                        >
                            <div className="annCard">
                                <div>
                                    <h2>@{announcement.title} ищет людей для: {announcement.category} - {announcement.subcategory}</h2>
                                    <hr style={{opacity: .3, maxWidth: "85%"}}/>
                                    <p>Описание: {announcement.description}</p>                                    
                                </div>
                                <p className="CardId">id: {announcement.id}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <ul style={{ textAlign: "left" }}>
                    {/* Другие элементы списка, если нужно */}
                </ul>
            </div>
        </>
    );
};

export default MainScreen;
