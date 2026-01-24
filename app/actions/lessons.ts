'use server';

import { createClient } from '@/lib/supabaseServer';
import type { Lesson } from '@/lib/types';

export async function getLessons(): Promise<Lesson[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createLesson(
  title: string,
  description: string,
  grade: number,
  pdf_path: string,
  accessToken?: string
): Promise<Lesson> {
  const supabase = await createClient(accessToken);
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('lessons')
    .insert({
      title,
      description,
      grade,
      pdf_path,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateLesson(
  id: string,
  title: string,
  description: string,
  grade: number,
  pdf_path: string,
  accessToken?: string
): Promise<Lesson> {
  const supabase = await createClient(accessToken);
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('lessons')
    .update({
      title,
      description,
      grade,
      pdf_path,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteLesson(
  id: string,
  pdf_path: string,
  accessToken?: string
): Promise<void> {
  const supabase = await createClient(accessToken);
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) throw new Error('Not authenticated');

  // Delete PDF from storage
  try {
    const { error: storageError } = await supabase.storage
      .from('lesson_pdfs')
      .remove([pdf_path]);
    if (storageError) console.error('Failed to delete PDF:', storageError);
  } catch (err) {
    console.error('Failed to delete PDF:', err);
  }

  // Delete lesson record
  const { error } = await supabase.from('lessons').delete().eq('id', id);

  if (error) throw error;
}
