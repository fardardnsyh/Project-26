import React from 'react';

interface StageBadgeProps {
    stage: string
}

const StageBadge = ({ stage }: StageBadgeProps) => {
    let bgColorClass, textColorClass;


    switch (stage) {
        case 'applied': {
            bgColorClass = 'bg-green-100';
            textColorClass = 'text-green-800'
            break;
        }
        case 'preparing': {
            bgColorClass = 'bg-gray-100';
            textColorClass = 'text-gray-800'
            break;
        }
        case 'rejected': {
            bgColorClass = 'bg-red-100';
            textColorClass = 'text-red-800'
            break;
        }
        case 'phone screen': {
            bgColorClass = 'bg-blue-100';
            textColorClass = 'text-blue-800'
            break;
        }
        case 'technical': {
            bgColorClass = 'bg-orange-100';
            textColorClass = 'text-orange-800'
            break;
        }
        case 'first interview': {
            bgColorClass = 'bg-purple-100';
            textColorClass = 'text-purple-800';
            break;
        }
        case 'offer': {
            bgColorClass = 'bg-yellow-100';
            textColorClass = 'text-yellow-800';
            break;
        }
        default: {
            break;
        }
    }
    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColorClass} ${textColorClass}`}>{stage}</span>
    );
};

export default StageBadge;