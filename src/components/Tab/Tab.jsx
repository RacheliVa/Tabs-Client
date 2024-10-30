import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import ColorPalette from '../ColorPalette/ColorPalette.jsx';
import styles from './Tab.module.css';

const Tab = ({ task, onDelete, onColorChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [showPalette, setShowPalette] = useState(false);

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleColorSelect = (color) => {
        onColorChange(task.id, color);
        setShowPalette(false); // לסגור את הפלטה אחרי הבחירה
    };

    return (
        <div className={`${styles.tab} ${styles[task.priorityLevel.toLowerCase()]}`}>
            {isEditing ? (
                <input
                    type="text"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    onBlur={handleSave}
                    className={styles.input}
                    autoFocus
                />
            ) : (
                <p onClick={() => setIsEditing(true)} className={styles.text}>{editedDescription}</p>
            )}
            <button onClick={() => setShowPalette(!showPalette)} className={styles.colorButton}>
                ●
            </button>
            {showPalette && <ColorPalette onSelectColor={handleColorSelect} />}
            <button onClick={() => onDelete(task.id)} className={styles.deleteButton}>
                <FaTrash />
            </button>
        </div>
    );
};

export default Tab;
