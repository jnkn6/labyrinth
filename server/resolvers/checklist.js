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

            let checklistObject = checklist.toObject();

            // change timestamp type (Map to JSON)
            let timestamp = [];
            checklistObject.timestamp.forEach((date, code) => {
                timestamp.push({
                    code: code,
                    date: date
                })
            });
            checklistObject.timestamp = JSON.stringify(timestamp);

            return checklistObject;
        },
    },
    Mutation:{
        /**
         * @param args \{ done: ChecklistInput! \}
         */
        check: async (root, args, context) => {
            let checklist = await checklistModel.findOne({_id: args.done._id});

            if (!checklist){
                return ""; // change: send error
            }

            let date = Date()

            args.done.codes.forEach(code => {
                // Update if it's not deactivated
                if (!(checklist.deactivated.includes(code))){
                    checklist.timestamp.set(code, date);
                }
            });

            checklist.save()

            return date;
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
