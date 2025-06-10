import React from 'react'
import { supabase_client } from './clint'

export default function supabse_image_path(path) {
    const supabase = supabase_client();

  return supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl;
}
