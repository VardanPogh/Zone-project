import React, { useState, useEffect } from 'react';
import ZoneList from './components/ZoneList';
import ZoneCreation from './components/ZoneCreation';
import ZoneCanvas from './components/ZoneCanvas';
import axios from 'axios';

function App() {
    const [zones, setZones] = useState([]);
    const [points, setPoints] = useState([]);
    const [drawing, setDrawing] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/zones`)
            .then((res) => setZones(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleMouseClick = (e) => {
        if (drawing) {
            const svg = e.target.closest('svg');
            const rect = svg.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setPoints([...points, [x, y]]);
        }
    };

    const handleCreateZone = (zone) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/zones`, zone)
            .then((res) => {
                setZones([...zones, { id: Date.now(), name: zone.name, points: zone.points }]);
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/zones/${id}`)
            .then(() => {
                setZones(zones.filter((zone) => zone.id !== id));
            });
    };

    const formatPointsForSVG = (points) => points.map((point) => point.join(',')).join(' ');

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <ZoneCreation
                        onCreate={handleCreateZone}
                        drawing={drawing}
                        setDrawing={setDrawing}
                        points={points}
                        setPoints={setPoints}
                    />
                    <ZoneCanvas zones={zones} points={points} handleMouseClick={handleMouseClick} formatPointsForSVG={formatPointsForSVG} />
                </div>
                <div className="col-md-6">
                    <h1>Zone Management</h1>
                    <ZoneList zones={zones} onDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
}

export default App;
