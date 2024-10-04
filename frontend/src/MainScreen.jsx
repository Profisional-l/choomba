import React from 'react';
import { Link } from 'react-router-dom';
import { AnnouncScript } from './scripts/announcScript.js';
import HelloMain from './HelloMain/HelloMain.jsx';

const MainScreen = () => {
    const { announcements } = AnnouncScript(); // Получаем данные из AnnouncScript

    return (
        <>
            <HelloMain/>

            <div style={{ marginTop: "40px", marginBottom: "40px" }}>
                <div>
                    {announcements.map((announcement) => (
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
