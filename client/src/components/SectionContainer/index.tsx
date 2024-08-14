import { ReactElement } from 'react';
import './assets/style.css';

interface SectionContainerPropsI {
    children: ReactElement;
    className?: String;
} 

const SectionContainer = ({children, className}: SectionContainerPropsI) => {
    return(
        <section className={`sectionContainer ${className ? className : ''}`}>
            {children}
        </section>
    );
};


export default SectionContainer;