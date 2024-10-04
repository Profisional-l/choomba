import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
    { name: 'Спорт', subcategories: ['Футбол', 'Баскетбол', 'Волейбол', 'Тенис', 'Хоккей'] },
    { name: 'Компьютерные игры', subcategories: ['CS2', 'Dota 2', 'PUBG', 'Fortnite', 'Warzone', 'Apex Legends'] },
    { name: 'Развлечения', subcategories: ['Кино', 'Квизы', 'Настольные игры', 'Концерты', 'Квесты', 'Просто прогулка', 'Другое'] }
];

const FindPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleSubcategoryClick = (subcategory) => {
        // Перенаправление на MainScreen с выбранной категорией и подкатегорией
        navigate('/', { state: { category: selectedCategory.name, subcategory, fromFindPage: true } });
    };

    return (
        <div>
            {!selectedCategory ? (
                <div>
                    <h3>Категории</h3>
                    <ul>
                        {categories.map((category, index) => (
                            <li key={index}>
                                <button onClick={() => handleCategoryClick(category)}>
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h3>{selectedCategory.name}</h3>
                    <ul>
                        {selectedCategory.subcategories.map((subcategory, subIndex) => (
                            <li key={subIndex}>
                                <button onClick={() => handleSubcategoryClick(subcategory)}>
                                    {subcategory}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setSelectedCategory(null)}>
                        Назад
                    </button>
                </div>
            )}
        </div>
    );
};

export default FindPage;
