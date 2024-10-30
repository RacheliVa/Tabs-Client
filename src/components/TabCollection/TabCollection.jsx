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
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteTab(id);
            setTabs(tabs.filter(tab => tab.id !== id));
        } catch (err) {
            console.log('Error deleting tab:', err);
        }
    };

    const handleAddTab = async () => {
        try {
            const newTab = await createTab({ description: "New Task", priorityLevel: "low" });
            setTabs([...tabs, newTab]);
        } catch (err) {
            console.log('Error adding tab:', err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.tabList}>
                {tabs.map(tab => (
                    <Tab
                        key={tab.id}
                        task={tab}
                        onDelete={handleDelete}
                    />
                ))}
                <button onClick={handleAddTab} className={styles.addButton}>+</button>
            </div>
        </div>
    );
}

export default TabCollection;
