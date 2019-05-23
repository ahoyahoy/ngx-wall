export interface IUndoRedoApi {
    undo(): any;
    undoSize(): number;
    redo(): any;
    redoSize(): number;
}
