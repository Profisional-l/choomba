import React from "react";
import { useLocation } from "react-router-dom";

const AnnPage = () => {
  const location = useLocation();
  const { announcement } = location.state || {}; // Получаем переданное объявление

  if (!announcement) {
    return <div>Объявление не найдено.</div>;
  }

  return (
    <div>
      <h2>Объявление от @{announcement.title}</h2>
      <p className="AnnCategoryField">{announcement.category}</p>
      {announcement.subcategory ? (
        <div>
          <p className="AnnSubCategoryField">Подкатегория: {announcement.subcategory}</p>{" "}
        </div>
      ) : (
        <div></div>
      )}
        <p className="AnnDescriptionField">Описание:<br />{announcement.description}</p>

      {/* <p>ID: {announcement.id}</p> */}
      <a href={`https://t.me/${announcement.title}`}>
        <button className="linkToUserBut">
          Связаться с {announcement.title}
        </button>
      </a>


      {/* {(announcement.category == "computerGames")? (
              <a href="https://discord.gg/naJFECBK3F">
              <button className="linkToUserBut">
                Наш Discord сервер
              </button>
            </a>
            ) : (
              <div></div>
            )} */}
    </div>
  );
};

export default AnnPage;
