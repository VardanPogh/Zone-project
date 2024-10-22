import React from 'react';

function ZoneList({ zones, onDelete }) {
    return (
        <table>
            <tbody>
            {zones.map((zone) => (
                <tr className="list-unstyled" key={zone.id}>
                    <td>{zone.name}</td>
                    <td>
                        <button className="btn btn-danger mx-2" onClick={() => onDelete(zone.id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default ZoneList;
