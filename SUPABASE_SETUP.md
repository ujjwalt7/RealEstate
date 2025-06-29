# Supabase Integration Setup Guide

## Overview
This guide will help you set up Supabase integration for the real estate application, including database schema, environment configuration, and data seeding.

## 1. Supabase Project Setup

### Create a new Supabase project:
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Choose your organization and project name
4. Set a database password
5. Choose your region

### Get your project credentials:
1. Go to Settings > API in your Supabase dashboard
2. Copy the following values:
   - Project URL
   - Anon public key
   - Service role key (keep this secret)

## 2. Environment Configuration

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 3. Database Schema Setup

### Option 1: Using Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Execute the SQL script

### Option 2: Using Supabase CLI
1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Link your project: `supabase link --project-ref your-project-ref`
4. Run migrations: `supabase db push`

## 4. Generate Mock Data

Use the `property-schema.json` file to generate mock data with ChatGPT:

### Prompt for ChatGPT:
```
I need to generate realistic mock data for a real estate property database. Please create 50 diverse property listings based on this JSON schema:

[Copy the contents of property-schema.json here]

Requirements:
- Mix of residential, commercial, agricultural, and industrial properties
- Realistic locations across major Indian cities (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, etc.)
- Varied price ranges from ₹10 Lakhs to ₹50 Crores
- Different plot sizes from 500 sq ft to 50 acres
- Realistic features and amenities
- Diverse agent information
- Mix of property statuses (Available, Sold, Under Contract)
- Include all required fields from the schema

Please format the response as a valid JSON array that can be directly inserted into a Supabase database.
```

## 5. Insert Mock Data

### Option 1: Using Supabase Dashboard
1. Go to Table Editor in your Supabase dashboard
2. Select the `properties` table
3. Click "Insert row" and paste the generated data

### Option 2: Using SQL
1. Convert the generated JSON to SQL INSERT statements
2. Execute in the SQL Editor

### Option 3: Using the application
1. Create an admin interface to bulk upload properties
2. Use the `propertyService.createProperty()` function

## 6. Testing the Integration

### Test the discover page:
1. Start your development server: `npm run dev`
2. Navigate to `/discover`
3. Verify that properties are loading from Supabase
4. Test filters and search functionality

### Test the property detail page:
1. Navigate to `/property/[id]` (replace [id] with an actual property ID)
2. Verify that property details are loading
3. Test the map integration
4. Check that view count is incrementing

## 7. Database Indexes and Performance

The schema includes several indexes for optimal performance:
- Type and status indexes for filtering
- Location and price indexes for range queries
- Features index for feature-based filtering
- Created_at index for sorting
- Views index for popularity sorting

## 8. Row Level Security (RLS)

The schema includes RLS policies:
- Public read access to all properties
- Authenticated users can create/update properties
- You can modify these policies based on your requirements

## 9. Additional Features

### Search Functionality
The database includes a `search_properties()` function for full-text search across titles, locations, and descriptions.

### View Tracking
Properties automatically track view counts using the `increment_property_views()` function.

### Similar Properties
The `propertyService.getSimilarProperties()` function finds properties of the same type.

## 10. Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure your Supabase project allows requests from your domain
2. **RLS Policy Errors**: Check that your RLS policies allow the operations you're trying to perform
3. **Connection Issues**: Verify your environment variables are correct
4. **Data Not Loading**: Check the browser console for error messages

### Debug Commands:
```javascript
// Test Supabase connection
import { supabase } from '@/lib/supabase'
const { data, error } = await supabase.from('properties').select('*').limit(1)
console.log('Data:', data, 'Error:', error)
```

## 11. Production Considerations

1. **Environment Variables**: Ensure all environment variables are set in your production environment
2. **Database Backups**: Set up regular backups in Supabase
3. **Monitoring**: Use Supabase's built-in monitoring tools
4. **Rate Limiting**: Consider implementing rate limiting for API calls
5. **Caching**: Implement caching strategies for frequently accessed data

## 12. Next Steps

After setting up the basic integration, consider adding:

1. **User Authentication**: Implement user registration/login
2. **Favorites System**: Allow users to save properties
3. **Contact Forms**: Store contact form submissions
4. **Analytics**: Track user behavior and property performance
5. **Admin Panel**: Create an interface for managing properties
6. **Image Upload**: Implement image upload functionality
7. **Notifications**: Add email/SMS notifications for new properties

## Support

If you encounter any issues:
1. Check the Supabase documentation
2. Review the error messages in your browser console
3. Verify your database schema matches the expected structure
4. Test with a simple query first before implementing complex features 