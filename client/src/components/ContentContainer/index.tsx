import { ReactElement } from 'react';
import './assets/style.css';

interface ContentContainerPropsI {
    children: ReactElement;
    className?: String;
} 

const ContentContainer = ({children, className}: ContentContainerPropsI) => {
    return(
        <div className={`contentContainer ${className ? className : ''}`}>
            {children}
        </div>
    );
};


export default ContentContainer;