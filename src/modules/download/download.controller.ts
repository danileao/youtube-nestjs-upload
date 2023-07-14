import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { DownloadService } from './download.service';
import { DownloadDTO } from './download.dto';
import { Response } from 'express';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Post('/url-temp')
  async urlTemp(@Body() data: DownloadDTO) {
    const result = await this.downloadService.createURLTemp(data);
    return result;
  }

  @Post('/')
  async download(@Body() data: DownloadDTO, @Res() res: Response) {
    const result = await this.downloadService.download(data);

    const fileBuffer = await result.arrayBuffer();
    const byteArray = new Uint8Array(fileBuffer);

    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename=${data.path}`,
    });

    res.send(Buffer.from(byteArray));
  }
}
