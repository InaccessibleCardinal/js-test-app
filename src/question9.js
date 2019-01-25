
export function question9() {

    class Node {
        constructor(value) {
            this.value = value;
            this.left = this.right = null;
        }
    }

    let tree = {
        root: null,
        add: addNewNodeToTree,
        find: function (value) {
            let {root} = this;
            let n;
            if (root === null) {
                n = null;
            } else {
                n = compareAndFindRecursor(root, value);
            }
            return n;
        }
    };

    function addNewNodeToTree(value) {
        let newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            compareAndAddRecursor(this.root, newNode);
        }
    }

    function compareAndAddRecursor(node, newNode) {
        
        if (newNode.value < node.value) { //newNode is going left
            if (node.left === null) {
                node.left = newNode;
            } else {
                compareAndAddRecursor(node.left, newNode);
            }
        } else { //newNode is going right
            if (node.right === null) {
                node.right = newNode;
            } else {
                compareAndAddRecursor(node.right, newNode);
            }
        } 
    }

    function compareAndFindRecursor(node, value) {

        if (node.value === value) {
            console.log('found node: ', node)
            return node;

        } else {
            if (value < node.value) {
                if (node.left) {
                    compareAndFindRecursor(node.left, value);
                } else {
                    return null;
                }
            } else {
                if (node.right) {
                    compareAndFindRecursor(node.right, value);
                } else {
                    return null;
                }
            }
        }
        
    }


    // let nums = [];
    // for (let i = 0; i < 50; ++i) {
    //     let num = Math.random() * 100;
    //     nums.push(Math.floor(num));
    // }
    // nums.forEach((n) => {
    //     tree.add(n);
    // });
    tree.add(3);
    tree.add(1);
    tree.add(5);
    tree.add(7);
    tree.add(8);
    tree.add(6);
    console.log(tree.find(3));
    console.log(JSON.stringify(tree, null, 4))

}