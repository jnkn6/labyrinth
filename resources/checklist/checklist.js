import vulcode from './vulcode'

let configure = require('./conf.json');

let temp = {};

let domainChecklist = {};
let pageChecklist = {};
let componentChecklist = {};

configure.forEach(conf => {
    const path = conf.path;
    delete conf.path;

    const key = conf.code;
    const expandKey = key + "_expand";

    // import json file
    temp[key] = require(path);

    domainChecklist[key] = [];
    pageChecklist[key] = [];
    componentChecklist[key] = [];

    domainChecklist[expandKey] = [];
    pageChecklist[expandKey] = [];
    componentChecklist[expandKey] = [];

    // categorize checklist
    temp[key].forEach(element => {
        const code = element.code;

        if (code in vulcode.domainVulcode){
            domainChecklist[key].push(element);

            // make expand checklist
            domainChecklist[expandKey].push(getExpandList(element, "domain"))
        }
        if (code in vulcode.pageVulcode){
            pageChecklist[key].push(element);

            // make expand checklist
            pageChecklist[expandKey].push(getExpandList(element, "page"))
        }
        if (code in vulcode.componentVulcode){
            componentChecklist[key].push(element);

            // make expand checklist
            componentChecklist[expandKey].push(getExpandList(element, "component"))
        }
    });
});


function getExpandList(element, type){

    let vulcodeSearch = {}
    let result = {...element};

    switch(type){
        case "domain":
            vulcodeSearch = vulcode.domainVulcode;
            break;
        case "page":
            vulcodeSearch = vulcode.pageVulcode;
            break;
        case "component":
            vulcodeSearch = vulcode.componentVulcode;
            break;
    }

    if (!(element.code in vulcodeSearch)){
        return result;
    }

    const codes = element.code.split("_");
    let children = findChildren(vulcode.vulcode, codes);

    // If no children
    if (!children){
        return result;
    }

    result.children = parseChildred(children, type, element.code);
    return result;
}

function findChildren(parents, codes){
    for (let i = 0; i< parents.length; i++){
        const parent = parents[i];

        if (parent.code === codes[0]){
            codes.shift();

            // found location
            if (codes.length === 0){
                return parent.children;
            }

            return findChildren(parent.children, codes)
        }
    }
}

function parseChildred(children, type, code){
    let result = [];

    children.forEach(child => {
        const newCode = code + "_" + child.code;
        let parsed = {};
        if(child.scope.includes(type)){
            parsed.code = newCode;
            parsed.name = child.name;
        }

        if(child.children){
            parsed.children = parseChildred(child.children, type, newCode);
        }
        result.push(parsed);
    });

    return result;
}


/** Result Example
 * {
 *      wstg_v4_2: [
 *          {
 *              code: "input_sqli",
 *              name: "WSTG-INPV-05 Testing for SQL Injection"
 *              children: [ // if expanded
 *                  {
 *                      code: "input_sqli_mysql",
 *                      name: "Check MySQL DB SQL injection"
 *                  },
 *                  {
 *                      code: "input_sqli_filter-check",
 *                      name: "Check SQL injection defense",
 *                      children: [
 *                          {
 *                              code: "input_sqli_filter-check_some-filter",
 *                              name: "This is example"
 *                          }
 *                      ]
 *                  }
 *              ]
 *          },
 *          {
 *              code: "input_ldap",
 *              name: "WSTG-INPV-06 Testing for LDAP Injection"
 *          }
 *      ]
 * }
 */
export default {
    domainChecklist,
    pageChecklist,
    componentChecklist,
    configure,
};
