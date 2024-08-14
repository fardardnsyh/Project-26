import Resume from '../../assets/resume.png';
import './assets/style.css';

const Logo = () => {
    return (
        <div className="logo flex items-center">
            <img src={Resume} alt="app tracker logo" />
            <span className="hidden md:block ml-2">AppTrack</span>
            <span className="block md:hidden mobile">AT</span>
        </div>
    );
};

export default Logo;