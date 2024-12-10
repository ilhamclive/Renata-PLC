import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from './components/SidebarContext';
import DashboardLayout from './components/DashboardLayout';
import HomePage from './pages/HomePage';
import ChartPage from './pages/ChartPage';
import TablePage from './pages/TablePage';
import SystemERDPage from './pages/SystemERDPage';
import DataERDPage from './pages/DataERDPage';

const App = () => (
    <SidebarProvider>
        <Router>
            <DashboardLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/chart" element={<ChartPage />} />
                    <Route path="/table" element={<TablePage />} />
                    <Route path="/system-erd" element={<SystemERDPage />} />
                    <Route path="/data-erd" element={<DataERDPage />} />
                </Routes>
            </DashboardLayout>
        </Router>
    </SidebarProvider>
);

export default App;
