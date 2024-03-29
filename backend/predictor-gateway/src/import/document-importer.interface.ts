export interface DocumentImporter {
    doParse(document: Express.Multer.File): void;
    supports(document: Express.Multer.File): boolean;
}

export interface BatchDocumentImporter {
    doParse(document: Express.Multer.File, onBatchParsed: (batch: Array<any>) => Promise<void>): Promise<void>;
    supports(document: Express.Multer.File): boolean;
    setBatchSize(size: number);
}