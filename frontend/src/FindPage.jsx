import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Спорт",
    subcategories: ["Футбол", "Баскетбол", "Волейбол", "Теннис", "Хоккей"],
  },
  {
    name: "Компьютерные игры",
    subcategories: [
      "CS2",
      "Dota 2",
      "Valorant",
      "PUBG",
      "Fortnite",
      "Warzone",
      "Apex Legends",
      "Другие игры"
    ],
  },
  {
    name: "Развлечения",
    subcategories: [
      "Кино",
      "Квизы",
      "Настольные игры",
      "Концерты",
      "Квесты",
      "Просто прогулка",
      "Другое",
    ],
  },
];

const FindPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isNavigated, setIsNavigated] = useState(false); // Состояние для отслеживания навигации
  const navigate = useNavigate();

  useEffect(() => {
    // Функция для обработки изменения истории
    const handlePopState = () => {
      setIsNavigated(true); // Устанавливаем состояние при нажатии кнопки "Назад"
    };

    // Добавляем слушатель события popstate
    window.addEventListener("popstate", handlePopState);

    // Убираем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSubcategoryClick = (subcategory) => {
    const BackToCatBut = document.querySelector(".BackToCatBut");
    BackToCatBut.classList.add("BackButOut");
    // Перенаправление на MainScreen с выбранной категорией и подкатегорией
    navigate("/", {
      state: {
        category: selectedCategory.name,
        subcategory,
        fromFindPage: true,
      },
    });
  };

  return (
    <div>
      {!selectedCategory ? (
        <div>
          <h2>Категории</h2>
          <div>
            {categories.map((category, index) => (
              <div
                key={index}
                className={`button-container ${
                  index < categories.length - 1 ? "border-bottom" : ""
                }`}
              >
                <button
                  className="FindCatBut"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>{selectedCategory.name}</h2>
          <div>
            {selectedCategory.subcategories.map((subcategory, subIndex) => (
              <div
                key={subIndex}
                className={`button-container ${
                  subIndex < selectedCategory.subcategories.length - 1
                    ? "border-bottom"
                    : ""
                }`}
              >
                <button
                  className="FindCatBut"
                  onClick={() => handleSubcategoryClick(subcategory)}
                >
                  {subcategory}
                </button>
              </div>
            ))}
          </div>
          <button
            className={`BackToCatBut ${isNavigated ? "navigated" : ""}`} // Добавляем класс в зависимости от состояния
            onClick={() => {
              setSelectedCategory(null);
              setIsNavigated(false); // Сбрасываем состояние при нажатии на кнопку
            }}
          >
            Назад
          </button>
        </div>
      )}
    </div>
  );
};

export default FindPage;
