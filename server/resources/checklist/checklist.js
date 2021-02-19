import {originVulcode, vulcode} from './vulcode'
import _ from 'lodash'

export let configure = require('./conf.json');

/** Result Example
 * {
 *  component:{
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
 *  }
 * }
 */
export let checklist = {
    "domain": {},
    "page": {},
    "component": {},
};

configure.forEach(conf => {
    const path = conf.path;
    delete conf.path;

    const key = conf.code;
    const expandKey = key + "_expand";

    // import json file
    let temp = require(path);

    checklist["domain"][key] = [];
    checklist["page"][key] = [];
    checklist["component"][key] = [];

    checklist["domain"][expandKey] = [];
    checklist["page"][expandKey] = [];
    checklist["component"][expandKey] = [];

    // categorize checklist
    temp.forEach(element => {
        const code = element.code;

        if (code in vulcode["domain"]){
            checklist["domain"][key].push(element);

            // make expand checklist
            checklist["domain"][expandKey].push(getExpandList(element, "domain"))
        }
        if (code in vulcode["page"]){
            checklist["page"][key].push(element);

            // make expand checklist
            checklist["page"][expandKey].push(getExpandList(element, "page"))
        }
        if (code in vulcode["component"]){
            checklist["component"][key].push(element);

            // make expand checklist
            checklist["component"][expandKey].push(getExpandList(element, "component"))
        }
    });
});


function getExpandList(element, key){

    let result = {...element};

    if (!(element.code in vulcode[key])){
        return result;
    }

    const codes = element.code.split("_");
    let children = findChildren(originVulcode, codes);

    // If no children
    if (!children){
        return result;
    }

    result.children = parseChildred(children, key, element.code);
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

function parseChildred(children, key, code){
    let result = [];

    children.forEach(child => {
        const newCode = code + "_" + child.code;
        let parsed = {};
        if(child.scope.includes(key)){
            parsed.code = newCode;
            parsed.name = child.name;
        }

        if(child.children){
            parsed.children = parseChildred(child.children, key, newCode);
        }
        result.push(parsed);
    });

    return result;
}

function getExpandFiltered(parent, vulFilter){
    let result = []; // list to stay

    parent.forEach(element => {
        if(element.children){
            let childResult = getExpandFiltered(element.children, vulFilter);

            if(childResult.length !==0){
                result.push(element); // include parent
            }

            // remove not included children
            element.children = childResult;
        }
 
        let vul = _.filter(vulFilter, (code) => {
            if(element.code.startsWith(code)){ // if same or child
                return true;
            }
        });

        if(vul.length !== 0){
            result.push(element); // include same/child
        }

    });

    result = _.uniqBy(result, 'code'); // remove duplicate element
    return result;
}

export function getFilteredChecklist(key, name, expand, vulFilter){
    let result = [];

    if (!key || !name){
        return result;
    }

    if(!checklist[key] || !checklist[key][name]){
        return result;
    }

    let original = expand ? checklist[key][name + "_expand"] : checklist[key][name];
    original = JSON.parse(JSON.stringify(original)) // deep copy

    vulFilter.forEach(code => {
        // find item & children
        if(!expand){
            let children = _.filter(original, (element) => {
                if(element.code.startsWith(code)){
                    return true;
                }
            });

            if(children.length !== 0){
                result = result.concat(children);
            }
        }
        else{
            // find parent, if exist, include parent~child tree
            result = getExpandFiltered(original, vulFilter);
        }
    });

    result = _.uniqBy(result, 'code'); // remove duplicate element

    return result;
    
}
