import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AnnouncScript } from "./scripts/announcScript.js";
import HelloMain from "./HelloMain/HelloMain.jsx";
import { initMiniApp } from '@telegram-apps/sdk-react';
import useUserData from "./scripts/takeTGinfo.js";

const MainScreen = () => {
    const userData = useUserData();

    React.useEffect(() => {
        if (userData) {
            if (window.Telegram && window.Telegram.WebApp) {
                // Код для Telegram
                window.Telegram.WebApp.expand();
                const [miniApp] = initMiniApp();
                miniApp.setHeaderColor('#000000');
            } else {
                console.log("App is running in the browser."); // Отладочная информация для браузера
            }
        }
    }, [userData]);

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

            {/* Отображение выбранной категории и подкатегории */}
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
                {filteredAnnouncements.map(announcement => (
                    <Link
                        className="link"
                        to="/annpage"
                        state={{ announcement }}
                        key={announcement.id}
                    >
                        <div className="annCard">
                            <h2>
                                @{announcement.title} - {announcement.description} |{" "}
                                {announcement.category} - {announcement.subcategory}
                            </h2>
                            <p className="CardId">id: {announcement.id}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default MainScreen;
