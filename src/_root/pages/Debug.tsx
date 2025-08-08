import { useState } from "react";
import { appwriteConfig, account } from "@/lib/appwrite/config";

const Debug = () => {
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testAppwriteConnection = async () => {
    addResult("🔧 Starting Appwrite connection test...");
    
    // Test 1: Check environment variables
    addResult(`📋 Environment Variables:`);
    addResult(`- URL: ${appwriteConfig.url}`);
    addResult(`- Project ID: ${appwriteConfig.projectId}`);
    addResult(`- Database ID: ${appwriteConfig.databaseId}`);
    
    // Test 2: Test Appwrite client connection
    try {
      addResult("🔌 Testing Appwrite client connection...");
      const health = await fetch(`${appwriteConfig.url}/health`);
      if (health.ok) {
        addResult("✅ Appwrite server is reachable");
      } else {
        addResult("❌ Appwrite server returned error: " + health.status);
      }
    } catch (error) {
      addResult("❌ Cannot reach Appwrite server: " + error);
    }

    // Test 3: Test account service
    try {
      addResult("👤 Testing account service...");
      await account.get();
      addResult("✅ Account service working (user is logged in)");
    } catch (error: any) {
      if (error.code === 401) {
        addResult("ℹ️ Account service working (user not logged in)");
      } else {
        addResult("❌ Account service error: " + error.message);
      }
    }

    // Test 4: Test project access
    try {
      addResult("🏗️ Testing project access...");
      const response = await fetch(`${appwriteConfig.url}/account`, {
        headers: {
          'X-Appwrite-Project': appwriteConfig.projectId,
        }
      });
      
      if (response.status === 401) {
        addResult("✅ Project ID is valid (got expected 401 for unauthenticated request)");
      } else if (response.ok) {
        addResult("✅ Project access successful");
      } else {
        addResult("❌ Project access failed: " + response.status);
      }
    } catch (error) {
      addResult("❌ Project access test failed: " + error);
    }
  };

  const testSignUp = async () => {
    addResult("📝 Testing sign up...");
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = "TestPassword123!";
    
    try {
      const { signInAccount, createUserAccount } = await import("@/lib/appwrite/api");
      
      const result = await createUserAccount({
        name: "Test User",
        email: testEmail,
        password: testPassword,
        username: "testuser" + Date.now()
      });
      
      if (result && !result.message) {
        addResult("✅ Sign up successful!");
        
        // Try to sign in with the new account
        try {
          const session = await signInAccount({ email: testEmail, password: testPassword });
          if (session) {
            addResult("✅ Sign in successful!");
          }
        } catch (signInError) {
          addResult("❌ Sign in failed: " + signInError);
        }
      } else {
        addResult("❌ Sign up failed: " + (result?.message || "Unknown error"));
      }
    } catch (error: any) {
      addResult("❌ Sign up error: " + error.message);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="debug"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Debug Appwrite Connection</h2>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={testAppwriteConnection}
            className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
          >
            Test Connection
          </button>
          <button
            onClick={testSignUp}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Test Sign Up
          </button>
          <button
            onClick={clearResults}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear Results
          </button>
        </div>

        <div className="bg-dark-3 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Test Results:</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-gray-400">Click "Test Connection" to start debugging...</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debug;
