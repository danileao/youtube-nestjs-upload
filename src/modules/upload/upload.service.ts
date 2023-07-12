import { Injectable } from '@nestjs/common';
import { FileDTO } from './upload.dto';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UploadService {
  async upload(file: FileDTO) {
    const supabaseURL = '';
    const supabaseKEY = '';

    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: {
        persistSession: false,
      },
    });

    const data = await supabase.storage
      .from('youtube')
      .upload(file.originalname, file.buffer, {
        upsert: true,
      });

    return data;
  }
}
