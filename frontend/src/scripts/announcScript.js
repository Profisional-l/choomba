import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const AnnouncScript = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [deleteId, setDeleteId] = useState('');

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
        try {
            await axios.post(`${API_URL}/announcements`, { title, description, category, subCategory });
            fetchAnnouncements();
            setTitle('');
            setDescription('');
            setCategory('');
            setSubCategory('');
        } catch (error) {
            console.error('Ошибка при создании объявления:', error);
        }
    };

    const deleteAnnouncement = async (id) => {
        try {
            await axios.delete(`${API_URL}/announcements/${id}`);
        } catch (error) {
            console.error('Ошибка при удалении объявления:', error);
        }
    };

    return { 
        announcements, 
        createAnnouncement, 
        deleteAnnouncement, 
        setTitle, 
        setDescription, 
        setCategory, 
        setSubCategory, 
        setDeleteId 
    };
};
