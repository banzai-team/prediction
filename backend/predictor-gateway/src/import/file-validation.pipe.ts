import { ArgumentMetadata, BadRequestException, Inject, Injectable, PipeTransform } from "@nestjs/common";
import * as mime from 'mime-types';

@Injectable()
export class FileValidationPipe implements PipeTransform {
    private supportedMimes;

    constructor() {
        this.supportedMimes = [
            mime.lookup('.csv'), 
            mime.lookup('.xls'), 
            mime.lookup('.x-xls')
        ];
    }

    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) throw new BadRequestException('At least one file requiered');
        value.forEach(f =>  {
            if (this.supportedMimes.indexOf(f.mimetype) === -1) 
                throw new BadRequestException(`Unsupported file mime-type ${f.mimetype}`);
        });

        console.log('value', value);
       
        return value;
    }
}