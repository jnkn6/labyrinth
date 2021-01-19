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
    Mutation: {
        /**
         * @param args \{ domain: DomainInput! \}
         */
        modifyDomain: async (root, args, context) => {
            delete args.domain.url;

            return await domainModel.findByIdAndUpdate(
                args.domain._id,
                args.domain,
                {new: true},
            );
        },
    }
}