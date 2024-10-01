import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { userName } from './takeTGinfo';

export const AnnouncScript = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deleteId, setDeleteId] = useState('');

    const isLocal = window.location.hostname === 'localhost';
    const API_URL = isLocal ? 'http://localhost:5000' : '/api';

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const response = await axios.get(`${API_URL}/announcements`);
            setAnnouncements(response.data);
        } catch (error) {
            console.error('Ошибка при получении объявлений:', error);
        }
    };

    const createAnnouncement = async () => {
        if (!title || !description) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }
        try {
            await axios.post(`${API_URL}/announcements`, { title, description });
            setTitle(''); // Сбрасываем title после успешного создания
            setDescription(''); // Сбрасываем description после успешного создания
            fetchAnnouncements();
        } catch (error) {
            console.error('Ошибка при создании объявления:', error);
        }
    };

    const deleteAnnouncement = async () => {
        if (!deleteId) {
            alert('Пожалуйста, введите id объявления для удаления.');
            return;
        }
        try {
            await axios.delete(`${API_URL}/announcements/${deleteId}`);
            fetchAnnouncements();
            setDeleteId('');
        } catch (error) {
            console.error('Ошибка при удалении объявления:', error);
        }
    };

    return { announcements, createAnnouncement, deleteAnnouncement, setTitle, setDescription, setDeleteId };
};
