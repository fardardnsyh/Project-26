import { Schema, Document, model, Model, SchemaDefinitionProperty } from 'mongoose';
import dateFormat from '../utils/dateFormat';

const questionSchema = new Schema<QuestionDocument>({
    questionText: {
        type: String,
        required: true
    },
    roleTag: {
        type: String,
        required: false
    },
    dateAdded: {
        type: Date,
        default: Date.now,
        get: timeStamp => dateFormat(timeStamp)
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
        get: timeStamp => dateFormat(timeStamp)
    }
}, {
    toJSON: {
        getters: true
    }
});

export interface QuestionDocument extends Document {
    questionText: string,
    roleTag: string,
    dateAdded: Date | SchemaDefinitionProperty<Date>,
    lastUpdated: Date | SchemaDefinitionProperty<Date>,
}

module.exports = model<QuestionDocument, Model<QuestionDocument>>("Question", questionSchema);