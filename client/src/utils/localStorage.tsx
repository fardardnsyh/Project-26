interface jobProp {
    id: string,
    jobTitle: string,
    companyName: string,
    jobDescription: string,
    location: string,
    stage: string
}

const getJobs = () => {
    const jobsArr = localStorage.getItem('jobs') ? JSON.parse(localStorage.getItem('jobs') || '') : [];
    return jobsArr
};

const getSingleJob = (id: string) => {
    let jobsArr = getJobs();
    const job = jobsArr.filter((el: jobProp) => el.id === id);
    return job[0];
};

const saveJob = (job: jobProp) => {
    let jobsArr = getJobs();
    jobsArr.push(job)
    localStorage.setItem('jobs', JSON.stringify(jobsArr))
}

export { getJobs, saveJob, getSingleJob }