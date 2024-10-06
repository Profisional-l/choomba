import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnnouncScript } from "./scripts/announcScript.js";
import HelloMain from "./HelloMain/HelloMain.jsx";
import { initMiniApp as actualInitMiniApp } from '@telegram-apps/sdk-react';

const initMiniApp = () => {
    // Проверка, открыто ли приложение в Telegram
    if (window.location.href.includes("localhost")) {
        return [null, true]; // В локальной среде мы возвращаем null и true
    }
    
    // Попробуем инициализировать мини-приложение Telegram
    try {
        const miniApp = actualInitMiniApp();
        return [miniApp, true];
    } catch (error) {
        console.error("Ошибка инициализации мини-приложения:", error);
        return [null, false]; // Вернем null и false, если ошибка
    }
};

const MainScreen = () => {
    const [miniApp, isTelegram] = initMiniApp(); // Используем новый способ инициализации

    const location = useLocation();
    const { category, subcategory, fromFindPage } = location.state || {};
    
    const [isLoading, setIsLoading] = useState(true);
    const { announcements } = AnnouncScript();

    const filteredAnnouncements = subcategory
        ? announcements.filter(announcement => announcement.subcategory === subcategory)
        : announcements;

    useEffect(() => {
        if (isTelegram && miniApp) {
            miniApp.setHeaderColor('#000000');
            const [swipeBehavior] = initSwipeBehavior();
            swipeBehavior.disableVerticalSwipe();
        }

        // Имитация загрузки данных
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer); // Очистка таймера при размонтировании
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

            {isLoading ? (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <div className="spinner-container">
                        <div className="spinner"></div>
                    </div>
                </div>
            ) : (
                <div style={{ marginTop: "40px", marginBottom: "40px" }}>
                    {filteredAnnouncements.map(announcement => (
                        <Link
                            className="link"
                            to="/annpage"
                            state={{ announcement }}
                            key={announcement.id}
                        >
                            <div className="annCard">
                                <h2>
                                    @{announcement.title} ищет людей для: {announcement.subcategory} - {announcement.category}
                                </h2>
                                <hr style={{ opacity: .3, maxWidth: "85%" }} />
                                <p>Описание: {announcement.description}</p>
                                <p className="CardId">id: {announcement.id}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};

export default MainScreen;
