import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    }],
    pages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page',
    }],
    components: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component',
    }],
    memo: {
        type: String
    },
  },
);

const Group = mongoose.model('Group', groupSchema, 'group');

export default Group;