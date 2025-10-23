import React from 'react'

const Card = ({item}) => {
 
const [[key, value]] = Object.entries(item);
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="M18 6L6 18"/><path d="M6 6L18 18"/>
    </svg>
);

    const isTrue = value === true;
    
    // Tailwind classes based on boolean value
    const indicatorBg = isTrue ? 'bg-green-500' : 'bg-red-500';
    const textColor = isTrue ? 'text-green-700' : 'text-red-700';
    const StatusIcon = isTrue ? CheckIcon : XIcon;
    const statusLabel = isTrue ? 'True' : 'False';

    return (
        <div className="flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50 transition duration-150 ease-in-out">
            <div className="flex items-center space-x-4">
                {/* Key / Description */}
                <span className="text-lg font-medium text-gray-800">{key}</span>
            </div>

            <div className="flex items-center space-x-3">
                {/* Visual Status Indicator (Icon) */}
                <div className={`w-7 h-7 flex items-center justify-center ${indicatorBg} rounded-full shadow-md`}>
                    <StatusIcon />
                </div>
                
                {/* Text Status (True/False) */}
                <span className={`font-bold text-sm min-w-[50px] text-right ${textColor}`}>{statusLabel}</span>
            </div>
        </div>
    );
}

export default Card