import { Module } from '@nestjs/common';
import { PageableValidationPipe } from './common.pipe';

@Module({
    providers: [PageableValidationPipe],
    exports: [PageableValidationPipe]
})
export class CommonModule {}
