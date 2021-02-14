export const originVulcode = require('./data/vulcode.json');

/** Result Example
 * {
 *      "component": {
 *          input: {
 *              name: "Vulnerability from lack of client input validation"
 *          },
 *          input_sqli: {
 *              name: "Check SQL injection"
 *          },
 *          input_sqli_mysql: {
 *              name: "Check MySQL DB SQL injection"
 *          }
 *      }
 * }
 */
export let vulcode = {
    "domain": {},
    "page": {},
    "component": {},
};

originVulcode.forEach(element => {
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
        vulcode["domain"][code] = {
            name: element.name,
        };
    }
    if (element.scope.includes("page")){
        vulcode["page"][code] = {
            name: element.name,
        };
    }
    if (element.scope.includes("component")){
        vulcode["component"][code] = {
            name: element.name,
        };
    }
}


