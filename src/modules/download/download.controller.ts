import { Body, Controller, Get, Post } from '@nestjs/common';
import { DownloadService } from './download.service';
import { DownloadDTO } from './download.dto';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Post('/')
  async download(@Body() data: DownloadDTO) {
    const result = await this.downloadService.execute(data);
    return result;
  }
}
