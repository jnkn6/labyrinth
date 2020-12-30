import mongoose from 'mongoose'

const pageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,    
    },
    domain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Domain',
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    }],
    components: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component',
    }],
    memo: {
        type: String
    },
});

const Page = mongoose.model('Page', pageSchema, 'page');

export default Page;