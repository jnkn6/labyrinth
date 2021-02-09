import domainModel from '../models/domain'
import checklistModel from '../models/checklist'

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
        createDomain: async (root, args, context) => {
            delete args.domain._id; // ID will be created by DB

            const oldDomain = await domainModel.findOne({url: args.domain.url});
            if (oldDomain){
                return oldDomain;
            }

            // add checklist reference
            const checklist = await checklistModel.create({})
            args.domain.checklist = checklist._id

            return await domainModel.create(args.domain);
        },
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