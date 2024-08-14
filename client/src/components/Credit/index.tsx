import './assets/style.css'

interface CreditPropsI {
    name: string,
    artist: string,
    source: string,
    link: string,
    credit: string,
    desc: string
}

const Credit = ({ name, artist, source, link, credit, desc }: CreditPropsI) => {
    return (
        <div className="credit rounded shadow-lg flex flex-col justify-between">
            <div className="img-container flex items-center h-full">
                <img src={credit} alt={desc} className="credit-ex rounded-t" />
            </div>
            <div className="info-container p-2">
                <div className="name flex flex-wrap">
                    <h4>name: </h4>
                    <span>{name}</span>
                </div>
                <div className="artist flex justify-between">
                    <p className='flex'>artist: {artist}</p>
                    <span>•</span>
                    <div className="link"><a href={link}>[link]</a></div>
                </div>
            </div>
        </div>
    );
};

export default Credit;