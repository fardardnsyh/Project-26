import { KeyboardEvent, useState, useRef, useEffect, createRef, SetStateAction } from "react";

import StageBadge from "../StageBadge";
import ArrowSVG from './assets/arrow.svg';

import Accessibility from "../../utils/accessibility";

import './assets/style.css';

interface jobProp {
    _id: string;
    jobTitle: string;
    companyName: string;
    jobDescription: string;
    location: string;
    status: string;
    dateApplied: string;
    lastUpdated: string;
}

interface StageDropdownPropsI {
    onStageChange: (newStage: string, job?: (jobProp | undefined)) => Promise<void> | void;
    job?: jobProp | undefined;
    selectedStage: string;
    options: Array<string>;
}

const StageDropdown = ({ options, onStageChange, selectedStage, job }: StageDropdownPropsI) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<SetStateAction<null | number>>(null);
    const dropDownElRef = useRef<HTMLDivElement>(null);
    const optionRefs = useRef(options.map(() => createRef<HTMLDivElement>()));
    const maxIndex = optionRefs.current.length - 1;

    useEffect(() => {
        setSelectedIndex(0)
        optionRefs.current[0].current?.focus();
    }, [isDropdownOpen])

    const handleDropdownOpen = () => {
        setIsDropdownOpen(true);
    };

    const handleDropdownKeyPress = (event: KeyboardEvent) => {
        const { code } = event;
        const { toggleKeys, closeKeys, upKeys, downKeys } = Accessibility;
        if (code === 'Tab' && isDropdownOpen) {
            event.preventDefault();
        }
        if (toggleKeys.includes(code)) {
            event.preventDefault();
            if (typeof (selectedIndex) !== 'number') return;
            if (!isDropdownOpen) {
                handleDropdownOpen();
                return;
            }
            let newStage = optionRefs.current[selectedIndex].current?.textContent || '';
            onStageChange(newStage);
            closeDropdown();
            return;
        };
        if (closeKeys.includes(code)) {
            event.preventDefault();
            closeDropdown();
            return;
        }
        if (upKeys.includes(code)) {
            event.preventDefault();
            if (typeof (selectedIndex) !== 'number') return;
            if (selectedIndex === 0) {
                optionRefs.current[maxIndex].current?.focus();
                setSelectedIndex(maxIndex);
                return;
            }
            let newIndex = selectedIndex - 1;
            optionRefs.current[newIndex].current?.focus();
            setSelectedIndex(newIndex);
            return;
        }
        if (downKeys.includes(code)) {
            event.preventDefault();
            if (typeof (selectedIndex) !== 'number') return;
            if (selectedIndex === maxIndex) {
                optionRefs.current[0].current?.focus();
                setSelectedIndex(0);
                return;
            }
            let newIndex = selectedIndex + 1;
            optionRefs.current[newIndex].current?.focus();
            setSelectedIndex(newIndex);
            return;
        }
    };

    const handleDropdownClick = () => {
        handleDropdownOpen();
    };

    const handleClick = (newStage: string, jobInfo: any) => {
        onStageChange(newStage, jobInfo);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
        dropDownElRef.current?.focus();
    };

    return (
        <div className="dropdown">
            <label
                htmlFor="stage-dropdown"
                className="block font-medium"
            >
                stage
            </label>
            <div
                className={`stage-select-container ${isDropdownOpen ? 'active' : ''}`}
                id="stage-dropdown"
                role="combobox"
                onClick={handleDropdownClick}
                onKeyDown={handleDropdownKeyPress}
                tabIndex={0}
                aria-expanded={isDropdownOpen}
                aria-controls="stage-dropdown"
                aria-haspopup="listbox"
                ref={dropDownElRef}
            >
                <div className="selected-stage p-2">
                    <StageBadge stage={selectedStage} />
                    <div className="arrow">
                        <img src={ArrowSVG} alt="arrow icon" />
                    </div>
                </div>
                <div className='stage-options shadow-lg' id="stage-dropdown" onMouseLeave={closeDropdown} role="listbox" aria-expanded={isDropdownOpen}>
                    {options && options.map((option, index) => (
                        <div className="stage-container py-1 px-2" key={option.split(' ').join('-')} tabIndex={0} onClick={() => handleClick(option, job)} ref={optionRefs.current[index]} aria-label={option} role="option" aria-selected={options.indexOf(option) === selectedIndex}>
                            <StageBadge stage={option} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StageDropdown;