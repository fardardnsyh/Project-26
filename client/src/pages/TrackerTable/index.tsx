import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { EDIT_APP_STATUS } from "../../utils/mutations";
import { QUERY_MY_APPS } from "../../utils/queries";
import { hasBeenGhosted } from '../../utils/dateFormat';
import Auth from '../../utils/auth';

import './assets/style.css';
import arrow from './assets/reshot-icon-arrow-chevron-right-WDGHUKQ634.svg';

import ContentContainer from "../../components/ContentContainer";
import StageBadge from "../../components/StageBadge";
import StageDropdown from "../../components/StageDropdown";
import SearchBar from '../../components/SearchBar';
import Switch from '../../components/Switch';
import Button from "../../components/Button";

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

type jobStatusObj = {
    [key: string]: jobProp[]
}

const TrackerTable = () => {
    const loggedIn = Auth.loggedIn();
    if (!loggedIn) {
        window.location.assign('/login')
    }

    const [editAppStatus] = useMutation(EDIT_APP_STATUS);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchText, setSearchText] = useState<string>('');
    const [activeApps, setActiveApps] = useState<boolean>(true);
    const [firstShownApp, setFirstShownApp] = useState<number>(0);
    const [lastShownApp, setLastShownApp] = useState<number>(9);
    const { loading, data } = useQuery(QUERY_MY_APPS);
    let jobs: jobProp[] = data?.myApps || [];
    let totalPages: number;

    if (loading) {
        return (
            <ContentContainer>
                <h1>Loading....</h1>
            </ContentContainer>
        )
    }

    if (jobs.length === 0) {
        return (
            <ContentContainer>
                <>
                    <h1>No Jobs Tracked yet ¯\_(ツ)_/¯</h1>
                    <p>Click <a href="./tracker">here to go back</a> to the tracker</p>
                </>
            </ContentContainer>
        );
    }
    const statusArr: string[] = ["offer", "first interview", "technical", "phone screen", "preparing", "applied", "rejected"];

    const filterByStatus = () => {
        const jobStatusObj: jobStatusObj = {};
        jobs.forEach(app => {
            const { status } = app;
            if (!jobStatusObj[status]) {
                jobStatusObj[status] = [app];
                return;
            }
            jobStatusObj[status] = [app, ...jobStatusObj[status]];

        })
        let sortedJobs: jobProp[][] = [];
        statusArr.forEach(status => {
            if (jobStatusObj[status]) {
                sortedJobs.push(jobStatusObj[status])
            }
        })
        return sortedJobs.flat();
    }
    jobs = filterByStatus();

    if (searchText) {
        let searchResults: Set<jobProp> = new Set();
        jobs.filter(job => {
            const {
                jobTitle,
                location,
                companyName
            } = job;
            if (companyName.toLowerCase().includes(searchText.toLowerCase()) || location.toLowerCase().includes(searchText.toLowerCase()) || jobTitle.toLowerCase().includes(searchText.toLowerCase())) {
                searchResults.add(job)
            }
        })
        jobs = Array.from(searchResults)
    }

    if (activeApps) {
        let activeApps: Set<jobProp> = new Set();
        jobs.filter(job => {
            const { status, lastUpdated } = job;
            const isGhosted = hasBeenGhosted(lastUpdated);
            if (status !== 'rejected' && !isGhosted) {
                activeApps.add(job);
            }
        })
        jobs = Array.from(activeApps);
    }

    const numJobs = jobs.length;
    const pageCounter = () => {
        const handleBack = () => {
            setCurrentPage(currentPage - 1);
            setFirstShownApp(firstShownApp - 10);
            setLastShownApp(lastShownApp - 10);
        }
        const handleNext = () => {
            setCurrentPage(currentPage + 1);
            setFirstShownApp(firstShownApp + 10);
            setLastShownApp(lastShownApp + 10);
        }
        return (
            <div className="page-counter-wrap">
                <div className="page-buttons">
                    {currentPage !== 1 &&
                        <Button
                            type='button'
                            onClick={handleBack}
                            text='prev'
                            classes="prev"
                        ></Button>

                    }
                    {currentPage !== totalPages && currentPage !== 1 && '/'}
                    {currentPage !== totalPages &&
                        <Button
                            type='button'
                            onClick={handleNext}
                            text='next'
                            classes="next"
                        ></Button>}
                </div>
                <div className="pages-counter">
                    <p className="curr">{currentPage}</p> / <p className="total">{totalPages} </p>
                </div>
            </div>
        );
    }
    if (numJobs > 10) {
        totalPages = Math.ceil(numJobs / 10);
    }

    const tableBody = (jobs: jobProp[]) => {
        let paginatedJobs: jobProp[] = [];
        for (let i = firstShownApp; i <= lastShownApp; i++) {
            if (jobs[i]) {
                paginatedJobs.push(jobs[i])
            }
        }
        return (
            paginatedJobs.map((job: jobProp) => {
                const handleDropdownChange = async (status: string) => {
                    try {
                        await editAppStatus({
                            variables: {
                                ...job,
                                id: job._id,
                                status
                            }
                        })
                    } catch (e) {
                        console.log(e)
                    }
                };
                return (
                    <tr key={job._id}>
                        <td className="whitespace-nowrap job-date-applied">
                            <p>
                                {job.dateApplied}
                            </p>
                        </td>
                        <td className="job-title">
                            <p>
                                {job.jobTitle}
                            </p>
                        </td>
                        <td className="text-gray-500 job-company-name">
                            <p>{job.companyName}</p>
                        </td>
                        <td className="whitespace-nowrap job-stage">
                            <StageDropdown options={statusArr} onStageChange={handleDropdownChange} selectedStage={job.status} job={job} />
                        </td>
                        <td className="job-location">
                            <p>{job.location}</p>
                        </td>
                        <td className="whitespace-nowrap text-right font-medium job-see-more">
                            <Link
                                to={job._id}
                                className="text-indigo-600 hover:text-indigo-900"
                            >
                                More
                            </Link>
                        </td>
                    </tr>
                )
            }
            )
        );
    };

    return (
        <ContentContainer className='applied'>
            <>
                <div className="flex justify-between">
                    <SearchBar searchText={searchText} setSearchText={setSearchText} />
                    <Switch active={activeApps} setActiveApps={setActiveApps} toggleId="active-apps-toggle" />
                </div>
                <div className="table-container shadow">
                    <table className="w-full divide-y">
                        <thead className="w-full">
                            <tr className="w-full">
                                <th scope="col">
                                    Date Applied
                                </th>
                                <th scope="col">
                                    Position
                                </th>
                                <th scope="col">
                                    Company
                                </th>
                                <th scope="col">
                                    Stage
                                </th>
                                <th scope="col">
                                    Location
                                </th>
                                <th scope="col" className="relative"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {tableBody(jobs)}
                        </tbody>
                    </table>
                </div>
                <div className="mobile-table">
                    {jobs.map((job: jobProp) => (
                        <div className="job-item" key={job._id}>
                            <div className="top-container">
                                <div className="text">
                                    <p className="title">{job.jobTitle}</p>
                                    <p className="company">{job.companyName}</p>
                                </div>
                                <div className="badge-container">
                                    <StageBadge stage={job.status} />
                                </div>
                            </div>
                            <div className="bottom-container">
                                <div className="text">
                                    <p><span>applied:</span> {job.dateApplied}</p>
                                    <p><span>location:</span> {job.location}</p>
                                </div>
                                <Link
                                    to={job._id}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    <img src={arrow} className="arrow" />
                                </Link>
                            </div>
                        </div>
                    )
                    )}
                </div>
                {numJobs > 10 && pageCounter()}
            </>
        </ContentContainer>
    );
};

export default TrackerTable;
