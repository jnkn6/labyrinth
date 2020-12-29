import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    group: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    }],
    components: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component',
    }],
  },
);

const Group = mongoose.model('Group', groupSchema, 'group');

export default Group;