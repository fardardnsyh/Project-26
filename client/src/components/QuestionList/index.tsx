import { ChangeEvent, useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_QUESTION } from '../../utils/mutations';

import TextArea from '../TextArea';
import Button from '../Button';
import Question from '../Question';

import './assets/style.css'
import { QUERY_SINGLE_APP } from '../../utils/queries';

interface IQuestionParams {
    questions: IQuestion[],
    appId: string | undefined,
}

interface IQuestion {
    questionText: string;
    _id: string;
    lastUpdated: string;
    roleTag: string;
}

const QuestionList = ({ questions, appId }: IQuestionParams) => {
    const [newQuestionText, setNewQuestionText] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [addQuestion] = useMutation(ADD_QUESTION, {
        update(cache, { data: { addQuestion } }) {
            try {
                cache.updateQuery({
                    query: QUERY_SINGLE_APP,
                    variables: {
                        id: appId
                    }
                }, ({ app }) => ({
                    app: {
                        ...app,
                        questions: [...app.questions, addQuestion]
                    }
                }))
            } catch (e) {
                console.error(e);
            }
        }
    })
    let questionList = questions || [];

    const handleNewQuestionClick = async () => {
        try {
            await addQuestion({ variables: { questionText: newQuestionText, appId } });
            setNewQuestionText('');
            setIsDisabled(true);
        } catch (e) {
            console.log(e)
        }
    };

    const handleNewQuestionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setNewQuestionText(value);
        if (value.length > 0) {
            setIsDisabled(false);
            return;
        }
        setIsDisabled(true);
    };

    const handleCancelClick = () => {
        setNewQuestionText('');
        setIsDisabled(true);
    };

    return (
        <div className='questions flex flex-col'>
            <h3 className="text-2xl mb-2">Questions</h3>
            <ul className="px-5 flex flex-col">
                {questionList && questionList.map(question => <Question appId={appId} question={question} key={`Question${question._id}`} />)}
            </ul>
            <TextArea onChange={handleNewQuestionChange} labelText='' rows={3} value={newQuestionText} placeholder='add new question...'/>
            <div className='flex'>
                <p onClick={handleCancelClick} className={`flex mr-2 cancel-btn ${isDisabled && 'hidden'} items-center ml-auto mt-4`}>Cancel</p>
                <Button onClick={handleNewQuestionClick} type="button" text="Submit" classes={`${isDisabled && 'disabled ml-auto'} blue mt-4`} />
            </div>
        </div>
    );
};

export default QuestionList;