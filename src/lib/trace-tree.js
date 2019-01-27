/**
 * Build tree from all the stack traces
 */

/**
 * @FoodForThought: What is the runtime of this algorithm?
 * @param stack1
 * @param stack2
 */
const findCommon = (stack1,stack2)=>{
    let result = [];
    let l = Math.min(stack1.length,stack2.length);
    for(let i=0;i<l;i++){
        if(stack1[i]!==stack2[i]){
            break;
        }
        result.push(stack1[i]);
    }
    return result;
};

/**
 * @FoodForThought: What is runtime of this algorithm
 * @param tree
 * @param arr
 * @returns {*}
 */
const addToTree = (tree,arr)=>{

    if(arr.length===0){
        return tree;
    }
    if(!tree.hasOwnProperty(arr[0]) || !tree[arr[0]].hasOwnProperty('children')){
        tree[arr[0]] = {children:{}};
    }

    tree[arr[0]]={
        children:addToTree(tree[arr[0]]['children'],arr.slice(1))
    };
    return tree;

};

const TraceTree  = {
    findCommon:findCommon,
    addToTree:addToTree
};

module.exports = TraceTree;