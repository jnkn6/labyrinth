import mongoose from 'mongoose'

const componentSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    domain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Domain',
    },
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page',
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component',
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
  },
);

const Component = mongoose.model('Component', componentSchema, 'component');

export default Component;