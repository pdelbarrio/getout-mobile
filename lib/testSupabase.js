import { supabase } from './supabase';

export async function testSupabaseConnection() {
    try {
        const { data, error } = await supabase.from('profiles').select('count');
        if (error) throw error;
        console.log('Successfully connected to Supabase!');
        console.log('Profiles count:', data);
        return true;
    } catch (error) {
        console.error('Error connecting to Supabase:', error.message);
        return false;
    }
}