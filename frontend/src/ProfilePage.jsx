import React, { useEffect, useState } from "react";
import { AnnouncScript } from "./scripts/announcScript.js";
import useUserData from "./scripts/takeTGinfo.js";
import trashpng from "./assets/trash.png";

const ProfilePage = () => {
  const { deleteAnnouncement } = AnnouncScript();
  const userData = useUserData();
  const [userAnnouncements, setUserAnnouncements] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [selectedId, setSelectedId] = useState(null); // Состояние для хранения выбранного ID
  const [isLoading, setIsLoading] = useState(true); // Состояние для загрузки

  const isLocal = window.location.hostname === "localhost";
  const API_URL = isLocal ? "http://localhost:5000" : "/api";

  useEffect(() => {
    if (userData) {
      setIsLoading(true); // Включаем состояние загрузки
      fetch(`${API_URL}/announcements/user/${userData.username}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setUserAnnouncements(data);
          } else {
            console.error("Error fetching announcements:", data);
          }
          setIsLoading(false); // Отключаем состояние загрузки после получения данных
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsLoading(false); // Отключаем состояние загрузки в случае ошибки
        });
    }
  }, [userData]);

  const handleDelete = async (id) => {
    await deleteAnnouncement(id);
    setUserAnnouncements((prevAnnouncements) =>
      prevAnnouncements.filter((announcement) => announcement.id !== id)
    );
    // Сбрасываем выбранный ID, если удаляемое объявление совпадает
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const handleDeleteById = async () => {
    if (!deleteId) {
      alert("Пожалуйста, введите id объявления.");
      return;
    }
    await handleDelete(Number(deleteId));
    setDeleteId("");
  };

  const handleSelect = (id) => {
    setSelectedId(id); // Обновляем выбранный ID при нажатии кнопки
  };

  return (
    <div>
      <div>
        {userData ? (
          <div>
            <h2>{userData.username}, ку! 👋</h2>
            {(userData.id == 1181442479) || (userData.id == 548461454) ? (
              <div style={{ marginTop: "40px" }}>
                <hr />
                <h3>Удалить объявление по ID:</h3>
                <input
                  type="text"
                  value={deleteId}
                  onChange={(e) => setDeleteId(e.target.value)}
                  placeholder="ID объявления"
                />
                <button onClick={handleDeleteById}>Удалить по ID</button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <p>Запущено вне Telegram</p>
        )}

        <div style={{ marginTop: "40px", marginBottom: "40px" }}>
          <h2>Твои объявления:</h2>
          <br />

          {/* Спиннер, пока идет загрузка */}
          {isLoading ? (
                        <div style={{ textAlign: "center", marginTop: "50px" }}>
                           <div className="spinner-container">
                                 <div className="spinner"></div>
                           </div>
                   </div>
          ) : userAnnouncements.length > 0 ? (
            <div>
              {userAnnouncements.map((announcement) => (
                <div
                  className={`annCard ${
                    selectedId === announcement.id ? "active" : ""
                  }`} // Условный класс
                  key={announcement.id}
                >
                  <h2>
                    @{announcement.title} - {announcement.description} |
                    {announcement.category}
                  </h2>
                  <br />

                  <p className="CardId">
                    <button
                      className="delet_but"
                      onClick={() => {
                        handleSelect(announcement.id); // Выбор ID при нажатии
                        handleDelete(announcement.id); // Удаление объявления
                      }}
                    >
                      Удалить <img src={trashpng} alt="" />
                    </button>
                    id: {announcement.id}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>Нет объявлений.</p>
          )}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default ProfilePage;
