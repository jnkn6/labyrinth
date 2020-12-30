import mongoose from 'mongoose'

const componentSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site',
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