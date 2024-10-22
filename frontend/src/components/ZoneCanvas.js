import React from 'react';

function ZoneCanvas({ zones, points, handleMouseClick, formatPointsForSVG }) {
    return (
        <svg width="500" height="500" onClick={handleMouseClick} style={{ border: '1px solid black' }}>
            {zones.map((zone) => (
                <polygon
                    key={zone.id}
                    points={formatPointsForSVG(zone.points)}
                    style={{ fill: 'blue', stroke: 'black', strokeWidth: 1 }}
                />
            ))}
            {points.length > 0 && (
                <polygon points={formatPointsForSVG(points)}
                         style={{ fill: 'none', stroke: 'red', strokeWidth: 2 }} />
            )}
        </svg>
    );
}

export default ZoneCanvas;
