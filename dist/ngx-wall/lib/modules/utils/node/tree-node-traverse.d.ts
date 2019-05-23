export declare class TreeNodeTraverse {
    private root;
    constructor(root: HTMLElement);
    traversePostOrder(fn: (node: Node) => void): void;
    traversePreOrder(fn: (node: Node) => void): void;
    traversePostPreOrder(fn: (node: Node) => void): void;
    getPreOrderNodes(): Node[];
    getPostOrderNodes(): Node[];
    getPostPreOrderNodes(): Node[];
    private _traversePostOrder;
    private _traversePreOrder;
    private _traversePostPreOrder;
}
