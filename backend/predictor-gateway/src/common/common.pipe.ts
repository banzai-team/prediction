import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PageableValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (value.desc) {
            value.desc = (value.desc.toLowerCase() === 'true');
        }
        return value;
    }

}