import vulcode from './vulcode'

const paths = [
    './wstg.json'
]

let temp = {};

let domainChecklist = {};
let pageChecklist = {};
let componentChecklist = {};

paths.forEach(path => {
    const name = path.split('\/').pop().split('.')[0];
    
    // import json file
    temp[name] = require(path);

    domainChecklist[name] = [];
    pageChecklist[name] = [];
    componentChecklist[name] = [];


    // categorize checklist
    temp[name].forEach(element => {
        const code = element.code;

        if (code in vulcode.domainVulcode){
            domainChecklist[name].push(element);

        }
        if (code in vulcode.pageVulcode){
            pageChecklist[name].push(element);

        }
        if (code in vulcode.componentVulcode){
            componentChecklist[name].push(element);

        }
    });
});



/** Result Example
 * {
 *      wstg: [
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
};
