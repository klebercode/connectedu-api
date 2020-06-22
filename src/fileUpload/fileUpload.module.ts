import { Module } from '@nestjs/common';
import { FileUploadController } from './fileUpload.controller';
import { FileUploadService } from './shared/fileUpload.service';

@Module({
  controllers: [
    FileUploadController,
  ],
  providers: [
    FileUploadService,
  ],
  exports: [
    FileUploadService,
  ],
})

export class FileUploadModule { }
