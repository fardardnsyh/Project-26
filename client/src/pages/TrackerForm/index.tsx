import { useState, ChangeEvent } from "react";
import { useMutation } from "@apollo/client";

import { ADD_APP } from "../../utils/mutations";
import Auth from '../../utils/auth';

import ContentContainer from "../../components/ContentContainer";
import SectionContainer from "../../components/SectionContainer";
import TextInput from "../../components/TextInput";
import TextArea from "../../components/TextArea";
import Button from '../../components/Button';
import Checkbox from "../../components/Checkbox";
import StageDropdown from "../../components/StageDropdown";

import './assets/style.css';

const TrackerFormPage = () => {
    const formInit = {
        jobTitle: "",
        companyName: "",
        location: "",
        jobDescription: "",
        status: "preparing",
        jobScore: 0,
        link: "",
    }
    const [formState, setFormState] = useState(formInit);
    const [checkboxState, setCheckboxState] = useState(false);
    const [inputError, setInputError] = useState("");
    const [addApp] = useMutation(ADD_APP);

    const loggedIn = Auth.loggedIn();
    if (!loggedIn) {
        window.location.assign('/login')
    }

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { jobTitle, companyName, location, jobDescription } = formState;
        if (
            jobTitle.length === 0 ||
            companyName.length === 0 ||
            location.length === 0 ||
            jobDescription.length === 0
        ) {
            setInputError("All fields are required :(");
            return;
        }
        try {
            await addApp({
                variables: {
                    ...formState,
                    quickApply: checkboxState,
                },
            });
            window.location.assign('/applied')
        } catch (err) {
            console.error(err);
        }
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckboxState(!checkboxState);
    };

    const handleDropDownChange = (newStage: string) => {
        setFormState({ ...formState, status: newStage })
    };

    const handleClearClick = () => {
        setFormState(formInit);
    }

    const handleChange = (
        e:
            | ChangeEvent<HTMLInputElement>
            | ChangeEvent<HTMLTextAreaElement>
            | ChangeEvent<HTMLSelectElement>
    ) => {
        let { name, value } = e.target;
        switch (name) {
            case "job-title":
                name = "jobTitle";
                break;
            case "company-name":
                name = "companyName";
                break;
            case "job-description":
                name = "jobDescription";
                break;
            case "job-score":
                name = "jobScore";
                break;
            case "stage":
                name = "status";
                break;
            case "job-url":
                name = "link";
                break;
            default:
                break;
        }
        // if (!value.length) {
        //     setInputError(`${inputName} is required!`);
        //     return;
        // }
        if (name === "jobScore") {
            const scoreNum = parseInt(value, 10);
            setFormState({ ...formState, [name]: scoreNum });
            return;
        }

        setFormState({ ...formState, [name]: value });
    };

    return (
        <SectionContainer>
            <div className="flex-col tracker">
                <div className="mt-10 sm:mt-0">
                    <ContentContainer>
                        <div className="flex">
                            <div className="form-container flex">
                                <form action="#" className="form shadow" onSubmit={handleSubmit}>
                                    <div className="content">
                                        <h1>Track.</h1>
                                        <p>All fields except JobScan Score, Link, and Quick Apply are required.</p>
                                        <div className="form-content">
                                            <div className="input-container">
                                                <TextInput
                                                    onChange={handleChange}
                                                    name="job-title"
                                                    labelTitle="Job title"
                                                    value={formState.jobTitle}
                                                />
                                            </div>
                                            <div className="input-container">
                                                <TextInput
                                                    onChange={handleChange}
                                                    name="company-name"
                                                    labelTitle="Company name"
                                                    value={formState.companyName}
                                                />
                                            </div>
                                            <div className="input-container">
                                                <TextInput
                                                    onChange={handleChange}
                                                    name="location"
                                                    labelTitle="Location"
                                                    value={formState.location}
                                                />
                                            </div>
                                            <div className="input-container">
                                                <TextInput
                                                    onChange={handleChange}
                                                    name="job-score"
                                                    labelTitle="JobScan score"
                                                    value={formState.jobScore}
                                                />
                                            </div>
                                            <div className="dropdown-container">
                                                <StageDropdown selectedStage={formState.status} onStageChange={handleDropDownChange} options={['preparing', 'applied']} />
                                            </div>
                                            <div className="input-container link">
                                                <TextInput
                                                    onChange={handleChange}
                                                    name="job-url"
                                                    labelTitle="Link"
                                                    value={formState.link}
                                                />
                                            </div>
                                            <div className="textArea-container">
                                                <TextArea onChange={handleChange} name="job-description" labelText="Job description" 
                                                value={formState.jobDescription}/>
                                            </div>
                                            <div className="checkbox-container">
                                                <Checkbox name="quick-apply" text="Quick Apply" onChange={handleCheckboxChange} classes="ml-3" />
                                            </div>
                                            <div className="right-btn-container">
                                                <div className="clear-container mr-4">
                                                    <div className="clear-btn underline text-white" onClick={handleClearClick}>x Clear</div>
                                                </div>
                                                <div className="btn-container">
                                                    <Button text="Save" classes="primary drop-shadow-md" type="submit" />
                                                </div>
                                            </div>
                                        </div>
                                        {inputError && (
                                            <p className="text-red-700 mt-2">{inputError}</p>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </ContentContainer>
                </div>
            </div>
        </SectionContainer>
    );
};

export default TrackerFormPage;
