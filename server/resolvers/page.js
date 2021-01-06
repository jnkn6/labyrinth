import pageModel from '../models/page'
import domainModel from '../models/domain'

async function getPagesInfo (ids) {
    let pages = []

    if (ids <= 0) {
        return pages;
    }

    for (let index=0; index < ids.length; index++) {
        await pageModel.findOne({_id: ids[index]}, (err, res) => {
            if(err){
                console.log(err);
            }
            else{
                pages.push(res)
            }
        });
    }

    return pages;
}


export default {
    Query: {
        /**
         * @param args \{ domain: ID! \}
         */
        allPagesInfo: async (root, args, context) => {

            let domain = await domainModel.findOne({_id: args.domain}, (err, res) => {
                if(err){
                    console.log(err);
                    return null;
                }
                else{
                    return res;
                }
            });

            return await getPagesInfo(domain.pages)
        },
    },
}
