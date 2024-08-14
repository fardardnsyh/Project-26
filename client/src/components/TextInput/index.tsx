import { ChangeEventHandler } from 'react';

import './assets/style.css';

interface TextInputPropsI {
    labelTitle?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    name: string;
    value?: string | number;
}

const TextInput = ({ labelTitle, onChange, name, value }: TextInputPropsI) => {
    const styledName = labelTitle ? labelTitle : name;
    let inputType;
    if(name === 'password') inputType = 'password';
    if(name === 'job-score') inputType = 'number';

    return (
        <input type={inputType} name={name} className="drop-shadow-md p-2" onChange={onChange} placeholder={styledName} value={value}/>
    );
}

export default TextInput;