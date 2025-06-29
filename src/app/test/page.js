"use client"
import React, { useState, useEffect } from 'react';
import { propertyService } from '@/lib/propertyService';
import { supabase } from '@/lib/supabase';

const TestPage = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addTestResult = (test, result, error = null) => {
    setTestResults(prev => [...prev, {
      test,
      result,
      error,
      timestamp: new Date().toISOString()
    }]);
  };

  const runTests = async () => {
    setLoading(true);
    setTestResults([]);

    try {
      // Test 1: Check Supabase connection
      addTestResult('Supabase Connection', 'Testing...');
      try {
        const { data, error } = await supabase.from('properties').select('count').limit(1);
        if (error) {
          addTestResult('Supabase Connection', 'Failed', error);
        } else {
          addTestResult('Supabase Connection', 'Success', null);
        }
      } catch (err) {
        addTestResult('Supabase Connection', 'Failed', err);
      }

      // Test 2: Check environment variables
      addTestResult('Environment Variables', 'Testing...');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        addTestResult('Environment Variables', 'Missing', {
          supabaseUrl: !!supabaseUrl,
          supabaseKey: !!supabaseKey
        });
      } else {
        addTestResult('Environment Variables', 'Present', {
          supabaseUrl: supabaseUrl.substring(0, 20) + '...',
          supabaseKey: supabaseKey.substring(0, 20) + '...'
        });
      }

      // Test 3: Get all properties
      addTestResult('Get All Properties', 'Testing...');
      try {
        const result = await propertyService.getProperties();
        addTestResult('Get All Properties', `Success - Found ${result.properties.length} properties`, result);
      } catch (err) {
        addTestResult('Get All Properties', 'Failed', err);
      }

      // Test 4: Get property by ID (test with a known ID)
      addTestResult('Get Property by ID', 'Testing...');
      try {
        const result = await propertyService.getPropertyById('PLOT001');
        if (result) {
          addTestResult('Get Property by ID', 'Success - Property found', result);
        } else {
          addTestResult('Get Property by ID', 'Success - Property not found (returned null)', null);
        }
      } catch (err) {
        addTestResult('Get Property by ID', 'Failed', err);
      }

      // Test 5: Check database schema
      addTestResult('Database Schema', 'Testing...');
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .limit(1);
        
        if (error) {
          addTestResult('Database Schema', 'Failed', error);
        } else {
          addTestResult('Database Schema', 'Success', {
            columns: data.length > 0 ? Object.keys(data[0]) : 'No data',
            sampleData: data[0] || 'No data'
          });
        }
      } catch (err) {
        addTestResult('Database Schema', 'Failed', err);
      }

    } catch (err) {
      addTestResult('General Test', 'Failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Database Connection Test</h1>
          
          <button
            onClick={runTests}
            disabled={loading}
            className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Running Tests...' : 'Run Tests'}
          </button>

          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{result.test}</h3>
                  <span className={`px-2 py-1 rounded text-sm ${
                    result.result === 'Success' || result.result.includes('Success') 
                      ? 'bg-green-100 text-green-800' 
                      : result.result === 'Failed' 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {result.result}
                  </span>
                </div>
                {result.error && (
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <pre className="text-sm text-red-800 overflow-auto">
                      {JSON.stringify(result.error, null, 2)}
                    </pre>
                  </div>
                )}
                {!result.error && result.result !== 'Testing...' && (
                  <div className="bg-gray-50 border border-gray-200 rounded p-3">
                    <pre className="text-sm text-gray-800 overflow-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-2">
                  {result.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage; 