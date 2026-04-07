import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Navbar from './Navbar';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="flex h-screen bg-surface-50 relative overflow-hidden">
            {/* Background Decorators */}
            <div className="blob blob-primary -top-24 -left-24"></div>
            <div className="blob blob-secondary top-1/2 -right-24"></div>

            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto px-8 py-8">
                    <div className="max-w-[1600px] mx-auto animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
