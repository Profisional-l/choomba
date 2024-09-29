import React, { useEffect } from 'react';
import { AnnouncScript } from './scripts/announcScript.js';
import HelloMain from './HelloMain/HelloMain.jsx';
import mainbg01png from  './assets/mainbg01.png';


const MainScreen = () => {
    const { announcements } = AnnouncScript(); // Получаем данные из AnnouncScript

    return (
        <>
        <HelloMain/>

        <div style={{marginTop: "40px", marginBottom: "40px"}}>
            <div>
            {announcements.map((announcement) => (
                    <div className='annCard' key={announcement.id}>
                        <h2>@{announcement.title} - {announcement.description}</h2>
                        <p className='CardId' > id: {announcement.id}</p>
                    </div>
                ))}
            </div>
            <ul style={{ textAlign: 'left' }}>
                
            </ul>
        </div>
        </>

    );
};

export default MainScreen;
