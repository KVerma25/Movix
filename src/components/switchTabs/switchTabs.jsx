import React, { useState } from 'react';
import './style.css';

function SwitchTabs({ data, onTabChange }) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);

    function activeTab(item, index) {
        setLeft(index * 96);
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);
        onTabChange(item, index);
    }

    return (
        <div className='switchingTabs bg-white'>
            <div className="tabItems d-flex align-items-center position-relative">
                {data.map((item, index) => (
                    <span
                        key={index}
                        className={`tabItem h-100 position-relative d-flex align-items-center justify-content-center
                             ${selectedTab === index ? 'text-white' : ""}`}
                        onClick={() => activeTab(item, index)}
                    >
                        {item}
                    </span>
                ))}
                <span className="movingBg" style={{ left }}></span>
            </div>
        </div>
    );
}

export default SwitchTabs;
