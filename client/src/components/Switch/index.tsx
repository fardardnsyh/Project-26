import { Dispatch } from 'react';

import './assets/style.css';

interface SwitchProps {
    active: boolean
    toggleId: string
    setActiveApps: Dispatch<boolean>
}

const Switch = (props: SwitchProps) => {
    const { active, setActiveApps, toggleId } = props;
    let text = active ? 'Active' : 'All';
    const filterActiveApps = () => {
        setActiveApps(!active);
    };
    return (
        <div className={`toggle-switch my-4 ${active ? 'active' : ''}`} >
            <input type="checkbox" className="toggle-switch-checkbox" id={toggleId} name={toggleId} onChange={filterActiveApps}/>
            <label className="toggle-switch-label" htmlFor={toggleId}>
                <span className="toggle-switch-inner">{text}</span>
                <span className="toggle-switch-switch" />
            </label>
        </div>
    );
};

export default Switch;