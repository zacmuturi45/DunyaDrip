import React from 'react'
import { supabase_client } from './clint'

export default function supabse_image_path(path) {
  if (!path || typeof path !== 'string' || path.trim() === '') return null;

  const supabase = supabase_client();

  return supabase.storage.from('product-images').getPublicUrl(path.trim()).data.publicUrl;
}
