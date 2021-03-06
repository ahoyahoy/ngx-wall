/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FirstSubStringNode = /** @class */ (function () {
    function FirstSubStringNode(root, subStringHTML) {
        this.root = root;
        this.subStringHTML = subStringHTML;
        this.firstLevelSubStringNodes = [];
        // get text representation
        this.subString = this.getSubStringTextContent();
        if (subStringHTML.length !== 0) {
            if (this.root.childNodes.length === 1) {
                this.firstLevelSubStringNodes = Array.from(this.root.childNodes);
            }
            else if (this.root.childNodes.length > 1) {
                this.firstLevelSubStringNodes = this.findFirstLevelSubStringNodes();
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    FirstSubStringNode.prototype.findFirstLevelSubStringNodes = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var i = this.root.childNodes.length - 1;
        /** @type {?} */
        var currentNode = this.root.childNodes[i];
        /** @type {?} */
        var text = '';
        /** @type {?} */
        var firstLevelSubStringNodes = [];
        while (currentNode && !text.includes(this.subString)) {
            text = currentNode.textContent + text;
            firstLevelSubStringNodes.push(currentNode);
            i--;
            currentNode = this.root.childNodes[i];
        }
        return firstLevelSubStringNodes.reverse();
    };
    /**
     * @private
     * @return {?}
     */
    FirstSubStringNode.prototype.getSubStringTextContent = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var pNode = document.createElement('P');
        pNode.innerHTML = this.subStringHTML;
        return pNode.textContent;
    };
    return FirstSubStringNode;
}());
export { FirstSubStringNode };
if (false) {
    /** @type {?} */
    FirstSubStringNode.prototype.firstLevelSubStringNodes;
    /**
     * @type {?}
     * @private
     */
    FirstSubStringNode.prototype.subString;
    /**
     * @type {?}
     * @private
     */
    FirstSubStringNode.prototype.root;
    /**
     * @type {?}
     * @private
     */
    FirstSubStringNode.prototype.subStringHTML;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyc3Qtc3ViLXN0cmluZy1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXdhbGwvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlcy91dGlscy9maXJzdC1zdWItc3RyaW5nLW5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0lBS0ksNEJBQW9CLElBQWlCLEVBQVUsYUFBcUI7UUFBaEQsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBSnBFLDZCQUF3QixHQUFXLEVBQUUsQ0FBQztRQUtsQywwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUVoRCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzVCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUVwRTtpQkFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQzthQUN2RTtTQUNKO0lBQ0wsQ0FBQzs7Ozs7SUFFTyx5REFBNEI7Ozs7SUFBcEM7O1lBQ1EsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDOztZQUNuQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOztZQUNyQyxJQUFJLEdBQUcsRUFBRTs7WUFDUCx3QkFBd0IsR0FBRyxFQUFFO1FBRW5DLE9BQU8sV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDbEQsSUFBSSxHQUFHLFdBQVcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBRXRDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUUzQyxDQUFDLEVBQUUsQ0FBQztZQUNKLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6QztRQUVELE9BQU8sd0JBQXdCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUMsQ0FBQzs7Ozs7SUFFTyxvREFBdUI7Ozs7SUFBL0I7O1lBQ1UsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO1FBRXpDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUVyQyxPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUM7SUFDN0IsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FBQyxBQTVDRCxJQTRDQzs7OztJQTNDRyxzREFBc0M7Ozs7O0lBRXRDLHVDQUFtQzs7Ozs7SUFFdkIsa0NBQXlCOzs7OztJQUFFLDJDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBGaXJzdFN1YlN0cmluZ05vZGUge1xuICAgIGZpcnN0TGV2ZWxTdWJTdHJpbmdOb2RlczogTm9kZVtdID0gW107XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHN1YlN0cmluZzogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb290OiBIVE1MRWxlbWVudCwgcHJpdmF0ZSBzdWJTdHJpbmdIVE1MOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gZ2V0IHRleHQgcmVwcmVzZW50YXRpb25cbiAgICAgICAgdGhpcy5zdWJTdHJpbmcgPSB0aGlzLmdldFN1YlN0cmluZ1RleHRDb250ZW50KCk7XG5cbiAgICAgICAgaWYgKHN1YlN0cmluZ0hUTUwubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yb290LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdExldmVsU3ViU3RyaW5nTm9kZXMgPSBBcnJheS5mcm9tKHRoaXMucm9vdC5jaGlsZE5vZGVzKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJvb3QuY2hpbGROb2Rlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdExldmVsU3ViU3RyaW5nTm9kZXMgPSB0aGlzLmZpbmRGaXJzdExldmVsU3ViU3RyaW5nTm9kZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZmluZEZpcnN0TGV2ZWxTdWJTdHJpbmdOb2RlcygpIHtcbiAgICAgICAgbGV0IGkgPSB0aGlzLnJvb3QuY2hpbGROb2Rlcy5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgY3VycmVudE5vZGUgPSB0aGlzLnJvb3QuY2hpbGROb2Rlc1tpXTtcbiAgICAgICAgbGV0IHRleHQgPSAnJztcbiAgICAgICAgY29uc3QgZmlyc3RMZXZlbFN1YlN0cmluZ05vZGVzID0gW107XG5cbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICYmICF0ZXh0LmluY2x1ZGVzKHRoaXMuc3ViU3RyaW5nKSkge1xuICAgICAgICAgICAgdGV4dCA9IGN1cnJlbnROb2RlLnRleHRDb250ZW50ICsgdGV4dDtcblxuICAgICAgICAgICAgZmlyc3RMZXZlbFN1YlN0cmluZ05vZGVzLnB1c2goY3VycmVudE5vZGUpO1xuXG4gICAgICAgICAgICBpLS07XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IHRoaXMucm9vdC5jaGlsZE5vZGVzW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpcnN0TGV2ZWxTdWJTdHJpbmdOb2Rlcy5yZXZlcnNlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRTdWJTdHJpbmdUZXh0Q29udGVudCgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBwTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1AnKTtcblxuICAgICAgICBwTm9kZS5pbm5lckhUTUwgPSB0aGlzLnN1YlN0cmluZ0hUTUw7XG5cbiAgICAgICAgcmV0dXJuIHBOb2RlLnRleHRDb250ZW50O1xuICAgIH1cbn1cbiJdfQ==