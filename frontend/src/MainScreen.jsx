import React from "react";
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

    if (isTelegram) {
        miniApp.setHeaderColor('#000000');
    }

    const location = useLocation();
    const { category, subcategory, fromFindPage } = location.state || {};
    const { announcements } = AnnouncScript();

    const filteredAnnouncements = subcategory
        ? announcements.filter(
            (announcement) => announcement.subcategory === subcategory
        )
        : announcements;

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
                                <h2>
                                    @{announcement.title} - {announcement.description} |{" "}
                                    {announcement.category} - {announcement.subcategory}
                                </h2>
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
