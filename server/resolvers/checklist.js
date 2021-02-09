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
            if (checklist.deactivated.includes(args.done.code)){
                return false;
            }

            // Update timestamp
            checklist.done.set(args.done.code, Date());
            checklist.save()
  
            return true;
        },
        /**
         * @param args \{ deactivate: ChecklistInput! \}
         */
        deactivate: async (root, args, context) => {
            let checklist = await checklistModel.findOne({_id: args.deactivate._id});

            if (!checklist){
                return false; // change: send error
            }

            // if already deactivated
            if (checklist.deactivated.includes(args.deactivate.code)){
                return true;
            }

            checklist.deactivated.push(args.deactivate.code)
            checklist.save()

            return true;
        },
        /**
         * @param args \{ activate: ChecklistInput! \}
         */
        activate: async (root, args, context) => {
            let checklist = await checklistModel.findOne({_id: args.activate._id});

            if (!checklist){
                return false; // change: send error
            }

            // if it's not deactivated
            if (!(checklist.deactivated.includes(args.activate.code))){
                return true;
            }

            checklist.deactivated.pull(args.activate.code)
            checklist.save()

            return true;

        },
    },
}
