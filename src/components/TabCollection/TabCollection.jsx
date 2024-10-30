import React, { useEffect, useState } from 'react';
import { getTabs, createTab, updateTab, deleteTab } from '../../services/tabService.js';
import Tab from '../Tab/Tab.jsx';
import styles from './TabCollection.module.css';

function TabCollection() {
    const [tabs, setTabs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTabs();
                setTabs(data);
                console.log('Data fetched successfully:', data);
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteTab(id);
            const updatedTabs = tabs.filter(card => card.id !== id);
            setTabs(updatedTabs);
            console.log('Tab deleted successfully:', id);
        } catch (err) {
            console.log('Error deleting tab:', err);
        }
    };

    const handleAddTab = async () => {
        try {
            const tabToAdd = {
                description: "New task",
                priorityLevel: "Low"
            };
            const newTab = await createTab(tabToAdd);
            setTabs([...tabs, newTab]);
        } catch (err) {
            console.log('Error adding tab:', err);
        }
    };

    const updateTabField = async (id, updates) => {
        try {
            await updateTab(id, updates);
            const updatedTabs = tabs.map(tab =>
                tab.id === id ? { ...tab, ...updates } : tab
            );
            setTabs(updatedTabs);
            console.log('Tab updated successfully:', id, updates);
        } catch (err) {
            console.log('Error updating tab:', err);
        }
    };

    const handleColorChange = (id, newColor) => {
        const priorityColors = [
            { priorityLevel: 'critical', color: '#ff4d4d' },
            { priorityLevel: 'high', color: '#ffcc00' },
            { priorityLevel: 'treated', color: '#5878e3' },
            { priorityLevel: 'low', color: '#99ff99' }
        ];
        const foundPriority = priorityColors.find(item => item.color === newColor);
        updateTabField(id, { priorityLevel: foundPriority.priorityLevel });
    };

    const handleTextChange = (id, newText) => {
        updateTabField(id, { text: newText });
    };

    return (
        <div>
        <button onClick={handleAddTab} className={styles.addButton}>+</button>
        <div className={styles.container}>
            {tabs.map(tab => (
                <Tab
                    key={tab.id}
                    task={tab}
                    onDelete={handleDelete}
                    onColorChange={handleColorChange}
                    onTextChange={handleTextChange}
                />
            ))}
        </div>
        </div>
    );
}

export default TabCollection;
