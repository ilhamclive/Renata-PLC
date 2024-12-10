import React from 'react';
import ReactFlow, { Controls } from 'react-flow-renderer';

const nodes = [
    {
        id: '1',
        data: { label: 'Frontend' },
        position: { x: 100, y: 50 },
    },
    {
        id: '2',
        data: { label: 'Backend' },
        position: { x: 300, y: 50 },
    },
    {
        id: '3',
        data: { label: 'Routes' },
        position: { x: 300, y: 150 },
    },
    {
        id: '4',
        data: { label: 'CSV Data Entity' },
        position: { x: 500, y: 50 },
    },
    {
        id: '5',
        data: { label: 'DataDisplay.js' },
        position: { x: 100, y: 150 },
    },
    {
        id: '6',
        data: { label: 'DataChart.js' },
        position: { x: 100, y: 250 },
    },
];

const edges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, label: 'Calls API' },
    { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Defines Routes' },
    { id: 'e3-4', source: '3', target: '4', animated: true, label: 'Fetches Data' },
    { id: 'e1-5', source: '1', target: '5', animated: true, label: 'Uses Component' },
    { id: 'e1-6', source: '1', target: '6', animated: true, label: 'Renders Chart' },
];

const ERD = () => {
    return (
        <div style={{ height: '500px', width: '100%' }}>
            <ReactFlow nodes={nodes} edges={edges} fitView>
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default ERD;