// Drag & Drop Interfaces
export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
    // To signal browser and JS that the thing we are dragging something over is a valid drag target
    dragOverHandler(event: DragEvent): void;
    // To react to actual drop that happens
    dropHandler(event: DragEvent): void;
    // If user does nothing, we can revert the drag and visual updates
    dragLeaveHandler(event: DragEvent): void;
}
