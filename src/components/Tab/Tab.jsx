import React, { useState } from 'react';
import styles from './Tab.module.css';
import { FaTrash } from 'react-icons/fa';
import ColorPalette from '../ColorPalette/ColorPalette';


const Tab = ({ task,onDelete,onColorChange,onTextChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [showPalette, setShowPalette] = useState(false); 
    const priorityClass = task.priorityLevel ? task.priorityLevel.toLowerCase() : '';

    const handleSave = () => {
        onTextChange(task.id,editedDescription);
        setIsEditing(false);
    };

    const handleDelete = () => {
        onDelete(task.id);
    };

    const handleColorSelect = (color) => {
        onColorChange(task.id,color);
        console.log("Selected color:", color);
        setShowPalette(false); 

    };

    return (
        <div className={`${styles.taskCard} ${styles[priorityClass]}`}>
            <h3>Task ID: {task.id}</h3>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        onBlur={handleSave} 
                        autoFocus 
                    />
                </div>
            ) : (
                <div onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }}>
                    {editedDescription}
                </div>
            )}
            <button onClick={handleDelete} className={styles.deleteButton}>
                <FaTrash />
            </button>
            <div
                className={styles.colorCircle}
                onClick={() => setShowPalette(!showPalette)} 
                style={{ backgroundColor: priorityClass }}
            ></div>
            {showPalette && <ColorPalette onColorSelect={handleColorSelect} />} 
        </div>
    );
};

export default Tab;


