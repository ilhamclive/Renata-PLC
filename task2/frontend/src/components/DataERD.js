import React, { useEffect, useState } from 'react';
import ReactFlow, { Controls } from 'react-flow-renderer';

const defaultNodeStyle = { width: 200, height: 50 };

const DataERD = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {
        const newNodes = [
            { id: 'customer', data: { label: 'Customer' }, position: { x: 300, y: 50 }, style: defaultNodeStyle },
            { id: 'division', data: { label: 'Division' }, position: { x: 80, y: 200 }, style: defaultNodeStyle },
            { id: 'gender', data: { label: 'Gender' }, position: { x: 300, y: 200 }, style: defaultNodeStyle },
            { id: 'maritalStatus', data: { label: 'MaritalStatus' }, position: { x: 520, y: 200 }, style: defaultNodeStyle },
            { id: 'income', data: { label: 'Income' }, position: { x: 700, y: 100 }, style: defaultNodeStyle },
        ];

        const newEdges = [
            { id: 'e1', source: 'division', target: 'customer', animated: true, label: 'Has' },
            { id: 'e2', source: 'gender', target: 'customer', animated: true, label: 'Has' },
            { id: 'e3', source: 'maritalStatus', target: 'customer', animated: true, label: 'Has' },
            { id: 'e4', source: 'income', target: 'customer', animated: true, label: 'Earns' },
        ];

        setNodes(newNodes);
        setEdges(newEdges);
    }, []);

    return (
        <div style={{ height: '500px', width: '100%' }}>
            <ReactFlow nodes={nodes} edges={edges} fitView>
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default DataERD;