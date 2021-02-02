import componentModel from '../models/component'
export default {
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
