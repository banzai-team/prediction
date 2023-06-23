export class TaskTypeNotFoundException extends Error {
    constructor(message: string, readonly code: string) {
        super(message);
    }
}

export class TaskNotFoundException extends Error {
    constructor(message: string, readonly id: number) {
        super(message);
    }
}