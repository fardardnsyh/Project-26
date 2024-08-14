require('dotenv').config();
const db = require('../config/connection');

const { App, Question } = require('../models');


// add questions to existing applications
const addQuestionsToExistingApps = async () => {
    const existingApps = await App.find();
    let filteredApps = existingApps.filter(n => !n.questions.length)
    const lastUpdated = Date.now();
    const basicQuestionsList = [
        'What is the breakdown of the team and who does what?',
        'What are you most excited about having a new person in this role?',
        'What is your biggest pain point? How will this role alleviate that?',
        'What advice would you give someone through the rest of the interviewing process?',
        'What is the rest of the hiring process?'
    ];
    for (let i = 0; i < filteredApps.length; i++) {
        const questionsList = basicQuestionsList.map(question => {
            return {
                questionText: question,
                roleTag: '',
                lastUpdated
            };
        })

        const questionData = await Question.create(questionsList);
        const questionIdList = questionData.map(question => question._id);
        await App.findByIdAndUpdate(
            { _id: filteredApps[i]._id },
            { lastUpdated, $set: { questions: questionIdList } },
            { new: true }
        );
    }

    console.log('done');
    process.exit(1);
};

addQuestionsToExistingApps();