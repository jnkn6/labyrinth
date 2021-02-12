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

           // change done type (Array to Object)
            let done = checklistObject.done.map(function(code){return {code: code}});
            checklistObject.done = JSON.stringify(done);

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
                return {
                    codes: [],
                    date: ""
                }; // change: send error
            }

            let date = Date();
            let success = [];

            args.done.codes.forEach(code => {
                // Update if it's not deactivated
                if (!(checklist.deactivated.includes(code))){
                    success.push(code);
                    checklist.done.push(code);
                    checklist.timestamp.set(code, date);
                }
            });

            checklist.save()

            return {
                codes: success,
                date: date
            };
        },
        /**
         * @param args \{ undo: ChecklistInput! \}
         */
        uncheck: async (root, args, context) => {
            let checklist = await checklistModel.findOne({_id: args.undo._id});
            let success = [];

            if (!checklist){
                return {
                    codes: success,
                    date: ""
                }; // change: send error
            }

            args.undo.codes.forEach(code => {
                // Update if it's not deactivated
                if (!(checklist.deactivated.includes(code))){
                    success.push(code);
                    checklist.done.pull(code);
                }
            });

            checklist.save()

            return {
                codes: success,
                date: ""
            };
        },
        /**
         * @param args \{ deactivate: ChecklistInput! \}
         */
        deactivate: async (root, args, context) => {
            let checklist = await checklistModel.findOne({_id: args.deactivate._id});
            let success = [];

            if (!checklist){
                return success; // change: send error
            }

            args.deactivate.codes.forEach(code => {
                if (!(checklist.deactivated.includes(code))){
                    success.push(code);
                    checklist.deactivated.push(code);
                }
            });

            checklist.save()

            return success;
        },
        /**
         * @param args \{ activate: ChecklistInput! \}
         */
        activate: async (root, args, context) => {
            let checklist = await checklistModel.findOne({_id: args.activate._id});
            let success = [];

            if (!checklist){
                return success; // change: send error
            }

            args.activate.codes.forEach(code => {
                if (checklist.deactivated.includes(code)){
                    success.push(code);
                    checklist.deactivated.pull(code);
                }
            });

            checklist.save()

            return success;
        },
    },
}
