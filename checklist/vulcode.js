const vulcode = require('./vulcode.json');

let domainVulcode = {};
let pageVulcode = {};
let componentVulcode = {};

vulcode.forEach(element => {
    parseVulcode(element, "");
});

function parseVulcode(element, parentsCode){
    let code = parentsCode + element.code;
    if(element.children){
        // recursive
        element.children.forEach(child => {
            parseVulcode(child, code+ "_");
        })
    }

    if (element.scope.includes("domain")){
        domainVulcode[code] = {
            name: element.name,
        };
    }
    if (element.scope.includes("page")){
        pageVulcode[code] = {
            name: element.name,
        };
    }
    if (element.scope.includes("component")){
        componentVulcode[code] = {
            name: element.name,
        };
    }
}


/** Result Example
 * {
 *      input: {
 *          name: "Vulnerability from lack of client input validation"
 *      },
 *      input_sqli: {
 *          name: "Check SQL injection"
 *      }
 *      input_sqli_mysql: {
 *          name: "Check MySQL DB SQL injection"
 *      }
 * }
 */
export default {
    domainVulcode,
    pageVulcode,
    componentVulcode,
};
