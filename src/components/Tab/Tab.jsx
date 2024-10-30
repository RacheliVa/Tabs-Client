import React, { useState } from 'react';
import styles from './Tab.module.css';
import { FaTrash } from 'react-icons/fa';
import ColorPalette from '../ColorPalette/ColorPalette';

const Tab = ({ task, onDelete, onColorChange, onTextChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [showPalette, setShowPalette] = useState(false); 
    const priorityClass = task.priorityLevel ? task.priorityLevel.toLowerCase() : '';

    const handleSave = () => {
        onTextChange(task.id, editedDescription);
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    const handleDelete = () => {
        onDelete(task.id);
    };

    const handleColorSelect = (color) => {
        onColorChange(task.id, color);
        setShowPalette(false); 
    };

    return (
        <div className={`${styles.taskCard} ${styles[priorityClass]}`}>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        onBlur={handleSave} 
                        onKeyDown={handleKeyDown} // הוספת מאזין לאירוע keydown
                        autoFocus 
                        className={styles.input}
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
