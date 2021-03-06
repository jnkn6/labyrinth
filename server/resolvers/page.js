import pageModel from '../models/page'
import domainModel from '../models/domain'
import checklistModel from '../models/checklist'

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
    Mutation:{
        /**
         * @param args \{ page: PageInput! \}
         */
        createPage: async (root, args, context) => {
            delete args.page._id; // ID will be created by DB

            let domain = await domainModel.findOne({_id: args.page.domain}, (err, res) => {
                if(err){
                    console.log(err);
                    return null;
                }
                else{
                    return res;
                }
            });

            if (!domain){
                return null; // change: send error
            }

            // add checklist reference
            const checklist = await checklistModel.create({})
            args.page.checklist = checklist._id

            let page = await pageModel.create(args.page);

            domain.pages.push(page);
            domain.save()

            return page;

        },
        /**
         * @param args \{ page: PageInput! \}
         */
        modifyPage: async (root, args, context) => {
            return await pageModel.findByIdAndUpdate(
                args.page._id,
                args.page,
                {new: true},
            );
        },
    },
}
