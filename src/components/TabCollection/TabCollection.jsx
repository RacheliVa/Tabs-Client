import React, { useEffect, useState } from 'react';
import { getTabs, createTab, updateTab, deleteTab } from '../../services/tabService.js';
import Tab from '../Tab/Tab.jsx';
import styles from './TabCollection.module.css';
import { tab } from '@testing-library/user-event/dist/tab.js';

function TabCollection() {

    const [tabs, setTabs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTabs();
                console.log(data);
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
            const updatedTabs = tabs.filter(card => card.id!== id);
            setTabs(updatedTabs);
            console.log('Tab deleted successfully:', id);
        } catch (err) {
            console.log('Error deleting tab:', err);
        }
    };

    const handleAddTab = async () => {
        try {
            const tabToAdd = {color: '#99ff99', text: 'New task'}
            const newTab = await createTab(tabToAdd );
            setTabs([...tabs, newTab]);
            console.log('Tab added successfully:', newTab);
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
        updateTabField(id, { color: newColor });
    };
    
    const handleTextChange = (id, newText) => {
        updateTabField(id, { text: newText });
    };
    

    return (
        <div >
            {tabs.map(tab => (
                <Tab 
                    key={tab.id} 
                    task={tab} 
                    onDelete={handleDelete} 
                    onColorChange={handleColorChange} 
                    onTextChange={handleTextChange}
                />
            ))}
            <button onClick={handleAddTab} >+</button>
        </div>
    )
}

export default TabCollection;