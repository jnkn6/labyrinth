const comptype = require('./data/comptype.json');

class NodeType{
    constructor() {
        this.originNodetype = {};
        this.nodetype = {};
        this.nodetypeOrder = {};
    }

    setNodetype(key, nodetype) {
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
     *      form: { vul: [input] },
     *      form_checkbox: { vul: [input] },
     *      form_file: { vul: ["busl_upload-filetype"] },
     *      button: {},
     *      'user-text': { vul: ["input_xss"] }
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
     *          "form",
     *          "form_checkbox",
     *          "form_select",
     *          ...
     *      ],
     *      "button": [
     *          "button"
     *      ],
     *  }
     * }
     */
    _extractOrder(key, rootCode){
        let keys = Object.keys(this.nodetype[key]);
        let children = [];

        keys.forEach(code => {
            if(code.startsWith(rootCode)){
                children.push(code)
            }
        });

        return children;
    }
}

let nodetype = new NodeType();
nodetype.setNodetype("component", comptype);

export default nodetype;
