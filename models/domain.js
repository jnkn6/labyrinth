import mongoose from 'mongoose'

const domainSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    pages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page',
    }],
    memo: {
        type: String
    },
    checklist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checklist',
    },
});

const Domain = mongoose.model('Domain', domainSchema, 'domain');

export default Domain;