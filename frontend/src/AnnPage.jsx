// AnnPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const AnnPage = () => {
    const location = useLocation();
    const { announcement } = location.state || {};

    if (!announcement) {
        return <div>Объявление не найдено.</div>;
    }

    return (
        <div>
            <h2>{announcement.title}</h2>
            <p>{announcement.description}</p>
            <p>Категория: {announcement.category}</p>
            <p>Подкатегория: {announcement.subcategory}</p>
            <p>ID: {announcement.id}</p>
        </div>
    );
};

export default AnnPage;
