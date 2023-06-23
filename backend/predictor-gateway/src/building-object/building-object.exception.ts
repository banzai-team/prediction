export class BuildingObjectNotFound extends Error {
    constructor(message: string, public readonly objKey: string) {
        super(message);
    }
}