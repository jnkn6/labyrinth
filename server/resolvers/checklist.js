import checklistModel from '../models/checklist'

export default {
    Query: {
        /**
         * @param args \{ id: ID! \}
         */
        checklist: async (root, args, context) => {
            const checklist = await checklistModel.findOne({_id: args.id})

            if (!checklist){
                return false; // change: send error
            }

            let checklist_object = checklist.toObject();

            // change done type (Map to JSON)
            let done = {};
            checklist_object.done.forEach((date, code) => {  
                done[code] = date  
            });
            checklist_object.done = JSON.stringify(done);

            return checklist_object;
        },
    },
}
