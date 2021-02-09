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
    Mutation:{
        /**
         * @param args \{ done: ChecklistInput! \}
         */
        check: async (root, args, context) => {
            let checklist = await checklistModel.findOne({_id: args.done._id});

            if (!checklist){
                return false; // change: send error
            }

            // You can't update check state if it's deactivated
            if (args.done.code in checklist.deactivated){
                return false;
            }

            // Update timestamp
            checklist.done.set(args.done.code, Date());
            checklist.save()
  
            return true;
        },
    },
}
