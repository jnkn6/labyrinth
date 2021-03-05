import { vulcode } from '../checklist/vulcode'
import _ from 'lodash'

const comptype = require('./data/comptype.json');

class NodeType{
    constructor(nodetypes) {
        this.originNodetype = {};
        this.nodetype = {};
        this.nodetypeOrder = {};

        for(const key in nodetypes){
            this._setNodetype(key, nodetypes[key]);
        }
    }

    _setNodetype(key, nodetype) {
        this.originNodetype[key] = nodetype;

        this.nodetype[key] = {};
        this.originNodetype[key].forEach(element => {
            this._parse(key, element, "");
        });

        this.nodetypeOrder[key] = {};
        this.originNodetype[key].forEach(root => {
            this.nodetypeOrder[key][root.code] = this._extractOrder(key, root.code);
        });
    }

    /**
     * {
     *  component: {
     *      form: { name: "Form", vul: [input] },
     *      form_checkbox: { "name": "Checkbox", vul: [input] },
     *      form_file: { "name":"File upload", vul: ["busl_upload"] },
     *      button: {"name": "Button"},
     *      'user-text': { "User input reflection", vul: ["input_xss"] }
     *  }
     * }
     */
    _parse(key, element, parentsCode) {
        let code = parentsCode;
        if (parentsCode !== ""){
            code += "_";
        }
        code += element.code;

        this.nodetype[key][code] = {
            name: element.name
        };

        if (element.vul){ // Override parent's vul
            this.nodetype[key][code].vul = element.vul;
        }
        else{ // Inherit parent's vul
            if(parentsCode !== ""){
                this.nodetype[key][code].vul = this.nodetype[key][parentsCode].vul;
            }
        }
        
        // Validate vul type
        let unvalidVul = _.differenceWith(this.nodetype[key][code].vul, Object.keys(vulcode[key]), _.isEqual);
        if (unvalidVul.length !== 0){
            throw( key + " type setting fail: Not valid vul " + JSON.stringify(unvalidVul));
        }

        if(element.children){
            // recursive
            element.children.forEach(child => {
                this._parse(key, child, code);
            })
        }
    }

    /**  // only one level order
     * {
     *  component: {
     *      "form": [
     *          {
     *              code: "form",
     *              name: "Form"
     *          },
     *          {
     *              code: "form_checkbox",
     *              name: "Checkbox"
     *          },
     *          ...
     *      ],
     *      "button": [
     *          {
     *              code: "button",
     *              name: "Button"
     *          }
     *      ],
     *  }
     * }
     */
    _extractOrder(key, rootCode){
        let keys = Object.keys(this.nodetype[key]);
        let children = [];

        keys.forEach(code => {
            if(code.startsWith(rootCode)){
                children.push({
                    code: code,
                    name: this.nodetype[key][code].name,
                })
            }
        });

        return children;
    }
}

let nodetype = new NodeType({
    component: comptype,
});

export default nodetype;
