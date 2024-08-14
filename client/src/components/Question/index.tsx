import { ChangeEvent, useState } from 'react';
import { useMutation } from '@apollo/client';

import { EDIT_QUESTION, DELETE_QUESTION } from '../../utils/mutations';

import './assets/style.css'
import TextArea from '../TextArea';
import Button from '../Button';

import editBtn from '../../assets/edit.svg';
import deleteBtn from '../../assets/trash.svg';
import { QUERY_SINGLE_APP } from '../../utils/queries';

interface IQuestionParams {
    question: IQuestion;
    appId: string | undefined;
}

interface IQuestion {
    questionText: string;
    _id: string;
    lastUpdated: String;
    roleTag: String;
}

const Question = (params: IQuestionParams) => {
    const { question, appId } = params;
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(question.questionText);
    const [deleteQuestion] = useMutation(DELETE_QUESTION, {
        update(cache, { data: { deleteQuestion } }) {
            try {
                cache.updateQuery({
                    query: QUERY_SINGLE_APP,
                    variables: {
                        id: appId
                    }
                }, ({ app }) => {
                    return ({
                        app: {
                            ...app,
                            questions: app.questions
                        }
                    })
                })
            } catch (e) {
                console.error(e);
            }
        }
    })

    const [editQuestion] = useMutation(EDIT_QUESTION, {
        update(cache, { data: { editQuestion }}) {
            try {
                cache.updateQuery({
                    query: QUERY_SINGLE_APP,
                    variables: {
                        id: appId
                    }
                }, ({app}) => {
                    return ({
                        app: {
                            ...app,
                            questions: [...app.questions]
                        }
                    })
                })
            } catch (e) {
                console.error(e);
            }
        }
    })

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleTrashClick = async (questionID: string) => {
        try {
            await deleteQuestion({
                variables: {
                    questionID,
                    appId
                }
            })
        } catch (e) {
            console.error(e)
        }
    };
    const handleQuestionEditChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEditText(e.target.value);
    };

    const handleQuestionEditClick = async () => {
        try {
            await editQuestion({
                variables: {
                    questionId: question._id,
                    questionText: editText,
                }
            })

            setIsEditing(false);
        } catch(e) {
            console.error(e)
        }
    };

    const handleCancelEditClick = () => {
        setIsEditing(false);
        setEditText(question.questionText);
    };
    return (
        <li className="question" >
            {isEditing ?
                <div className="edit-container">
                    <TextArea
                        onChange={handleQuestionEditChange}
                        labelText=''
                        name={`${question._id}`}
                        rows={2}
                        value={editText}
                    />
                    <div className="flex justify-end my-2 items-center">
                        <p onClick={handleCancelEditClick} className='mr-2 cancel-btn'>Cancel</p>
                        <Button text="Submit"
                            onClick={handleQuestionEditClick}
                            type="button"
                            classes='blue'
                        />
                    </div>
                </div>
                : <div className="li-content mb-3 flex justify-between">
                    <p className='flex items-center'>{question.questionText}</p>
                    <div className="buttons flex ml-1">
                        <button onClick={handleEditClick}><img src={editBtn} alt="click to edit this question" /></button>
                        <button onClick={() => handleTrashClick(question._id)}><img src={deleteBtn} alt="click to delete this question" /></button>
                    </div>
                </div>}
        </li>
    );
};

export default Question;