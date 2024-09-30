import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const AnnouncScript = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deleteId, setDeleteId] = useState('');

    // Определяем базовый URL в зависимости от среды
    const isLocal = window.location.hostname === 'localhost';
    const API_URL = isLocal ? 'http://localhost:5000' : '/api';

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        const response = await axios.get(`${API_URL}/announcements`);
        setAnnouncements(response.data);
    };

    const createAnnouncement = async () => {
        await axios.post(`${API_URL}/announcements`, { title, description });
        fetchAnnouncements();
        setTitle('');
        setDescription('');
    };

    const deleteAnnouncement = async () => {
        if (!deleteId) {
            alert('Пожалуйста, введите id объявления для удаления.');
            return;
        }
        await axios.delete(`${API_URL}/announcements/${deleteId}`);
        fetchAnnouncements();
        setDeleteId('');
    };

    return { announcements, createAnnouncement, deleteAnnouncement, setTitle, setDescription, setDeleteId };
};
