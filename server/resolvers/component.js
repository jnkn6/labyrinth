import componentModel from '../models/component'
import pageModel from '../models/page'

async function getComponentInfo (ids) {
    let components = []

    if (ids <= 0) {
        return components;
    }

    for (let index=0; index < ids.length; index++) {
        await componentModel.findOne({_id: ids[index]}, (err, res) => {
            if(err){
                console.log(err);
            }
            else{
                components.push(res)
            }
        });
    }

    return components;
}


export default {
    Query: {
        /**
         * @param args \{ page: ID! \}
         */
        allComponentsInfo: async (root, args, context) => {

            let page = await pageModel.findOne({_id: args.page});

            return await getComponentInfo(page.components)
        },
    },
    Mutation:{
        /**
         * @param args \{ component: ComponentInput! \}
         */
        createComponent: async (root, args, context) => {
            delete args.component._id; // ID will be created by DB

            let page = await pageModel.findOne({_id: args.component.page});

            if (!page){
                return null; // change: send error
            }

            let component = await componentModel.create(args.component);

            page.components.push(component);
            page.save()

            // Update parent component
            if (args.component.parent !== null){
                let parent = await componentModel.findOne({_id: args.component.parent});
                parent.components.push(component);
                parent.save()
            }

            return component;
        },
        /**
         * @param args \{ component: ComponentInput! \}
         */
        modifyComponent: async (root, args, context) => {
            return await componentModel.findByIdAndUpdate(
                args.component._id,
                args.component,
                {new: true},
            );
        },
    },
}
