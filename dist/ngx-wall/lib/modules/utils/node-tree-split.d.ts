export declare class NodeTreeSplit {
    private root;
    private targetElement;
    private offset;
    leftTree: HTMLElement;
    rightTree: HTMLElement;
    constructor(root: HTMLElement, targetElement: Node, // text node
    offset: number);
    private prependPreviousSiblingsToNode;
    private appendNextSiblingsToNode;
}
