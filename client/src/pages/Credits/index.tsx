import SectionContainer from '../../components/SectionContainer';
import ContentContainer from '../../components/ContentContainer';
import Credit from '../../components/Credit';

import githubLogo from '../../assets/github-mark.svg';
import jobHuntImg from '../../assets/job-hunt.svg';
import landingHeroImg from '../../assets/landing-hero.svg';

const Credits = () => {
    const credits = [
        {
            name: 'Job Hunt',
            desc: 'An illustration of a man standing in front of a newspaper titled "Jobs", magnifying glass, and tablet.',
            owner: 'StorySet',
            source: 'StorySet',
            link: 'https://storyset.com/illustration/job-hunt/amico',
            credit: jobHuntImg
        },
        {
            name: 'Annoyed',
            desc: 'An illustration of a woman frustrated with the job junting process',
            owner: 'StorySet',
            source: 'StorySet',
            link: 'https://storyset.com/illustration/annoyed/rafiki',
            credit: landingHeroImg
        },
        {
            name: 'Github Logo',
            desc: 'The Github logo',
            owner: 'Github',
            source: 'Github',
            link: 'https://github.com/logos',
            credit: githubLogo,
        }
    ];
    return (
        <SectionContainer>
            <ContentContainer>
                <>
                    <h2>Credits</h2>
                    <div className="credit-container flex flex-wrap justify-start">
                        {credits.map((credit)=> <Credit name={credit.name} desc={credit.desc} artist={credit.owner} source={credit.source} link={credit.link} credit={credit.credit} />)}
                    </div>
                </>
            </ContentContainer>
        </SectionContainer>
    );
};

export default Credits;
