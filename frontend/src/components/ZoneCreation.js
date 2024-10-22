import React, {useState} from 'react';

function ZoneCreation({ onCreate, drawing, setDrawing, points, setPoints }) {
    const [zoneName, setZoneName] = useState('');

    const handleCreateZone = () => {
        if (points.length === 4 && zoneName) {
            onCreate({ name: zoneName, points });
            setZoneName('');
            setPoints([]);
            setDrawing(false);
        } else {
            alert('You need exactly 4 points and a name to create a zone.');
        }
    };

    return (
        <div className="mb-2">
            <h2>Create Zone</h2>
            <input
                type="text"
                placeholder="Zone Name"
                className="form-control w-25 mb-3"
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
            />
            <button
                className="btn btn-primary mx-2"
                onClick={() => setDrawing(true)}
                disabled={drawing}
            >
                Start Drawing
            </button>
            <button
                className="btn btn-success mx-2"
                onClick={handleCreateZone}
                disabled={points.length !== 4}
            >
                Create Zone
            </button>
            <button
                className="btn btn-warning mx-2"
                onClick={() => {
                    setPoints([]);
                    setDrawing(false);
                }}
            >
                Reset
            </button>
        </div>
    );
}

export default ZoneCreation;
