import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const AnnouncScript = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        const response = await axios.get('./announcements');
        setAnnouncements(response.data);
    };

    const createAnnouncement = async () => {
        await axios.post('./announcements', { title, description });
        fetchAnnouncements();
        setTitle('');
        setDescription('');
    };

    const deleteAnnouncement = async () => {
        if (!deleteId) {
            alert('Пожалуйста, введите id объявления для удаления.');
            return;
        }
        await axios.delete(`./announcements/${deleteId}`);
        fetchAnnouncements();
        setDeleteId('');
    };

    return { announcements, createAnnouncement, deleteAnnouncement, setTitle, setDescription, setDeleteId };
};
