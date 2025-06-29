// Script to insert test data into Supabase
import { createClient } from '@supabase/supabase-js';
import { completeDataset } from './generateSampleData.js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function insertTestData() {
  try {
    console.log('Starting to insert test data...');
    
    // First, check if data already exists
    const { data: existingData, error: checkError } = await supabase
      .from('properties')
      .select('id')
      .limit(1);
    
    if (checkError) {
      console.error('Error checking existing data:', checkError);
      return;
    }
    
    if (existingData && existingData.length > 0) {
      console.log('Data already exists in the database. Skipping insertion.');
      return;
    }
    
    // Insert the test data
    const { data, error } = await supabase
      .from('properties')
      .insert(completeDataset);
    
    if (error) {
      console.error('Error inserting test data:', error);
      return;
    }
    
    console.log('Successfully inserted test data!');
    console.log('Inserted properties:', data?.length || completeDataset.length);
    
    // Verify the insertion
    const { data: verifyData, error: verifyError } = await supabase
      .from('properties')
      .select('id, title, location->city')
      .limit(5);
    
    if (verifyError) {
      console.error('Error verifying data:', verifyError);
      return;
    }
    
    console.log('Verification - Sample inserted data:');
    console.log(verifyData);
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the insertion
insertTestData(); 