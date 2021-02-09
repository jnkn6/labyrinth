import mongoose from 'mongoose'

const checklistSchema = new mongoose.Schema({
    done: {
        type: Map,
        of: Date,
        default: {},
    },
    deactivated: [{
        type: String
    }]
});

const Checklist = mongoose.model('Checklist', checklistSchema, 'checklist');

export default Checklist;
