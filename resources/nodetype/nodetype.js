const type = require('./data/nodetype.json');

class NodeType{
    constructor(nodetype) {
        this.originNodetype = nodetype;

        this.nodetype = {};
        this.originNodetype.forEach(element => {
            this._parse(element, "");
        });

        this.nodetypeOrder = {};
        this.originNodetype.forEach(root => {
            this.nodetypeOrder[root.code] = this._extractOrder(root.code);
        });

    }

    /**
     * nodetype: {
     *      form: { vul: [input] },
     *      form_checkbox: { vul: [input] },
     *      form_file: { vul: ["busl_upload-filetype"] },
     *      button: {},
     *      'user-text': { vul: ["input_xss"] }
     * }
     */
    _parse(element, parentsCode) {
        let code = parentsCode;
        if (parentsCode !== ""){
            code += "_";
        }
        code += element.code;

        this.nodetype[code] = {
            name: element.name
        };

        if (element.vul){ // Override parent's vul
            this.nodetype[code].vul = element.vul;
        }
        else{ // Inherit parent's vul
            if(parentsCode !== ""){
                this.nodetype[code].vul = this.nodetype[parentsCode].vul;
            }
        }

        if(element.children){
            // recursive
            element.children.forEach(child => {
                this._parse(child, code);
            })
        }
    }

    /**  // only one level order
     * {
     *  "form": [
     *      "form",
     *      "form_checkbox",
     *      "form_select",
     *      ...
     *  ],
     *  "button": [
     *      "button"
     *  ],
     * }
     */
    _extractOrder(rootCode){
        let keys = Object.keys(this.nodetype);
        let children = [];

        keys.forEach(code => {
            if(code.startsWith(rootCode)){
                children.push(code)
            }
        });

        return children;
    }
}

export default new NodeType(type);
