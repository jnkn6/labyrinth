import domainModel from '../models/domain'

export default {
    Query: {
        /**
         * @param args \{ url: String! \}
         */
        domainInfo: async (root, args, context) => {
            return await domainModel.findOne(args, (err, res) => {
                if(err){
                    console.log(err);
                    return null;
                }
                else{
                    return res;
                }
            });
        }
    },
}