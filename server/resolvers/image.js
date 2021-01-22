import fs from 'fs'

export default {
    Query: {
        /**
         * @param args \{ id: ID! \}
         */
        allImages: async (root, args, context) => {
            let files = fs.readdirSync('./public/upload/');
            let images = [];
            
            files.forEach(name => {
                if (name.startsWith(args.id)){
                    images.push({source: name});
                }
            });
            return images;
        }
    },
}
