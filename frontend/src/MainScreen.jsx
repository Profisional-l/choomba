import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AnnouncScript } from "./scripts/announcScript.js";
import HelloMain from "./HelloMain/HelloMain.jsx";
import { initMiniApp, mockTelegramEnv, parseInitData, retrieveLaunchParams } from '@telegram-apps/sdk-react';

// Мокирование окружения Telegram для разработки
if (import.meta.env.DEV) {
    let shouldMock;

    try {
        retrieveLaunchParams();
        shouldMock = !!sessionStorage.getItem('____mocked');
    } catch (e) {
        shouldMock = true;
    }

    if (shouldMock) {
        const initDataRaw = new URLSearchParams([
            ['user', JSON.stringify({
                id: 99281932,
                first_name: 'Andrew',
                last_name: 'Rogue',
                username: 'rogue',
                language_code: 'en',
                is_premium: true,
                allows_write_to_pm: true,
            })],
            ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
            ['auth_date', '1716922846'],
            ['start_param', 'debug'],
            ['chat_type', 'sender'],
            ['chat_instance', '8428209589180549439'],
        ]).toString();

        mockTelegramEnv({
            themeParams: {
                accentTextColor: '#6ab2f2',
                bgColor: '#17212b',
                buttonColor: '#5288c1',
                buttonTextColor: '#ffffff',
                destructiveTextColor: '#ec3942',
                headerBgColor: '#17212b',
                hintColor: '#708499',
                linkColor: '#6ab3f3',
                secondaryBgColor: '#232e3c',
                sectionBgColor: '#17212b',
                sectionHeaderTextColor: '#6ab3f3',
                subtitleTextColor: '#708499',
                textColor: '#f5f5f5',
            },
            initData: parseInitData(initDataRaw),
            initDataRaw,
            version: '7.2',
            platform: 'tdesktop',
        });
        sessionStorage.setItem('____mocked', '1');

        console.info(
            'Мокированное окружение. Это только для разработки.'
        );
    }
}

const MainScreen = () => {
    const [miniApp] = initMiniApp();
    miniApp.setHeaderColor('#000000');

    const location = useLocation();
    const { category, subcategory, fromFindPage } = location.state || {}; // Получаем состояние
    const { announcements } = AnnouncScript(); // Получаем данные из AnnouncScript

    // Фильтруем объявления по подкатегории
    const filteredAnnouncements = subcategory
        ? announcements.filter(
            (announcement) => announcement.subcategory === subcategory
        )
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
        </>
    );
};

export default MainScreen;
