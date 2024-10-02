import React, { useEffect, useState } from 'react';
import { AnnouncScript } from './scripts/announcScript.js';
import useUserData from './scripts/takeTGinfo.js'; 

const ProfilePage = () => {
  const { deleteAnnouncement, setDeleteId } = AnnouncScript(); 
  const userData = useUserData();
  const [userAnnouncements, setUserAnnouncements] = useState([]);

  useEffect(() => {
    if (userData) {
      fetch(`http://localhost:5000/announcements/user/${userData.username}`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            setUserAnnouncements(data);
          } else {
            console.error('Error fetching announcements:', data);
          }
        })
        .catch(error => console.error('Error:', error));
    }
  }, [userData]);

  return (
    <div>
      <h1>Profile Page</h1>
      <hr /><br />
      <div>
        {userData ? (
          <div>
            <h1>Welcome, {userData.first_name}!</h1>
            <p>Username: {userData.username}</p>
            <p>UserID: {userData.id}</p>
            <p>Language: {userData.language_code}</p>
            {userData.is_premium && <p>You are a premium user!</p>}
            {!userData.is_premium && <p>Без премиума</p>}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <div style={{ marginTop: "40px", marginBottom: "40px" }}>
          <p>Ваши объявления:</p><br/>
          {userAnnouncements.length > 0 ? (
            <div>
              {userAnnouncements.map((announcement) => (
                <div className='annCard' key={announcement.id}>
                  <h2>@{announcement.title} - {announcement.description} | {announcement.category}</h2>
                  <p className='CardId'>id: {announcement.id}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Нет объявлений.</p>
          )}
        </div>
      </div>
      <br /><hr /><br />
      <h2>Удалить объявление по ID:</h2>
      <input 
          type="text" 
          placeholder="id" 
          value={announcements.deleteId} 
          onChange={(e) => setDeleteId(e.target.value)} 
      />
      <button onClick={deleteAnnouncement}>Удалить объявление</button>
    </div>
  );
};

export default ProfilePage;

