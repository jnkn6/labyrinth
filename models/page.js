import mongoose from 'mongoose'

const pageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site',
    },
    components: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component',
    }],
  },
);

const Page = mongoose.model('Page', pageSchema, 'page');

export default Page;