export declare class FirstSubStringNode {
    private root;
    private subStringHTML;
    firstLevelSubStringNodes: Node[];
    private readonly subString;
    constructor(root: HTMLElement, subStringHTML: string);
    private findFirstLevelSubStringNodes;
    private getSubStringTextContent;
}
