import React from 'react';
import styles from './ColorPalette.module.css'; 

const colors = ['#ff4d4d', '#ffcc00', '#5878e3', '#99ff99'];

const ColorPalette = ({ onColorSelect }) => {
    return (
        <div className={styles.paletteContainer}>
            {colors.map((color) => (
                <div

                    key={color}
                    className={styles.colorCircle}
                    style={{ backgroundColor: color }}
                    onClick={() => onColorSelect(color)}
                ></div>
            ))}
        </div>
    );
};

export default ColorPalette;
