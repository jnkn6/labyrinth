import mongoose from 'mongoose'

const siteSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    pages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page',
    }],
});

const Site = mongoose.model('Site', siteSchema, 'site');

export default Site;