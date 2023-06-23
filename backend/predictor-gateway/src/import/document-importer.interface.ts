export interface DocumentImporter {
    doParse(document: Express.Multer.File): void;
    supports(document: Express.Multer.File): boolean;
}