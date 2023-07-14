import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { DownloadDTO } from './download.dto';

@Injectable()
export class DownloadService {
  async execute(data: DownloadDTO) {
    const supabaseURL = process.env.SUPABASE_URL;
    const supabaseKEY = process.env.SUPABASE_KEY;

    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: {
        persistSession: false,
      },
    });

    const url = await supabase.storage
      .from(data.bucket)
      .createSignedUrl(data.path, data.expiresIn ?? 70);

    return url;
  }
}
