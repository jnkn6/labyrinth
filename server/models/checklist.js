import mongoose from 'mongoose'

const checklistSchema = new mongoose.Schema({
    timestamp: {
        type: Map,
        of: Date,
        default: {},
    },
    deactivated: [{
        type: String
    }],
    done: [{
        type: String
    }]
});

const Checklist = mongoose.model('Checklist', checklistSchema, 'checklist');

export default Checklist;
