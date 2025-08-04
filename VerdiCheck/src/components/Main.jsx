// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [handle, setHandle] = useState("");
//   const [status, setStatus] = useState("");
//   const [isSuspicious, setIsSuspicious] = useState(null);

//   const checkSuspicious = async () => {
//     if (!handle) {
//       setStatus("Please enter a Codeforces ID.");
//       return;
//     }

//     setStatus("Fetching data...");
//     setIsSuspicious(null);

//     try {
//       const response = await axios.get(
//         `https://codeforces.com/api/user.status?handle=${handle}`
//       );

//       // Check if API response is valid
//       if (response.data.status !== "OK") {
//         setStatus("Error: Invalid Codeforces ID.");
//         return;
//       }

//       const submissions = response.data.result;
//       let skippedSubmissions = 0;

//       // Count skipped submissions (assuming skipped submissions are those without a verdict)
//       submissions.forEach(submission => {
//         if (submission.verdict === "SKIPPED") skippedSubmissions++;
//       });

//       if (skippedSubmissions > 5) {
//         setIsSuspicious(true);
//         setStatus(`Suspicious! More than 5 skipped submissions detected.`);
//       } else {
//         setIsSuspicious(false);
//         setStatus(`Normal ID: ${skippedSubmissions} skipped submissions.`);
//       }
//     } catch (error) {
//       setStatus("An error occurred while fetching data.");
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>VerdiCheck:Codeforces Tracker</h1>
//         <input
//           type="text"
//           placeholder="Enter Codeforces ID"
//           value={handle}
//           onChange={(e) => setHandle(e.target.value)}
//         />
//         <button onClick={checkSuspicious}>Check ID</button>
//         <p>{status}</p>
//         {isSuspicious !== null && (
//           <div className={`status ${isSuspicious ? "suspicious" : "normal"}`}>
//             {isSuspicious ? "This ID is suspicious!" : "This ID is normal."}
//           </div>
//         )}
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
import { Search, AlertTriangle, CheckCircle, User, Code, TrendingUp } from "lucide-react";

function App() {
  const [handle, setHandle] = useState("");
  const [status, setStatus] = useState("");
  const [isSuspicious, setIsSuspicious] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkSuspicious = async () => {
    if (!handle) {
      setStatus("Please enter a Codeforces ID.");
      return;
    }

    setIsLoading(true);
    setStatus("Analyzing submission patterns...");
    setIsSuspicious(null);

    try {
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = await fetch(
        `https://codeforces.com/api/user.status?handle=${handle}`
      );
      
      const data = await response.json();

      // Check if API response is valid
      if (data.status !== "OK") {
        setStatus("Error: Invalid Codeforces ID or user not found.");
        setIsLoading(false);
        return;
      }

      const submissions = data.result;
      let skippedSubmissions = 0;

      // Count skipped submissions
      submissions.forEach(submission => {
        if (submission.verdict === "SKIPPED") skippedSubmissions++;
      });

      setIsLoading(false);

      if (skippedSubmissions > 5) {
        setIsSuspicious(true);
        setStatus(`Analysis complete: ${skippedSubmissions} skipped submissions detected.`);
      } else {
        setIsSuspicious(false);
        setStatus(`Analysis complete: ${skippedSubmissions} skipped submissions found.`);
      }
    } catch (error) {
      setIsLoading(false);
      setStatus("Network error: Unable to fetch data from Codeforces API.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkSuspicious();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="relative max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded-2xl mb-4 shadow-lg">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">VerdiCheck</h1>
            <p className="text-gray-300 text-sm">Codeforces Submission Analyzer</p>
          </div>

          {/* Input Section */}
          <div className="space-y-6">
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter Codeforces Handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            <button
              onClick={checkSuspicious}
              disabled={isLoading || !handle}
              className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Analyze Profile</span>
                </>
              )}
            </button>
          </div>

          {/* Status Section */}
          {status && (
            <div className="mt-6 p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
              <p className="text-gray-200 text-sm text-center">{status}</p>
            </div>
          )}

          {/* Results Section */}
          {isSuspicious !== null && (
            <div className={`mt-6 p-6 rounded-2xl border-2 transition-all duration-500 transform scale-100 ${
              isSuspicious 
                ? 'bg-red-500/20 border-red-400/50 text-red-100' 
                : 'bg-green-500/20 border-green-400/50 text-green-100'
            }`}>
              <div className="flex items-center justify-center space-x-3">
                {isSuspicious ? (
                  <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-400" />
                )}
                <div className="text-center">
                  <h3 className="font-bold text-lg">
                    {isSuspicious ? "Suspicious Activity Detected" : "Profile Appears Normal"}
                  </h3>
                  <p className="text-sm opacity-80 mt-1">
                    {isSuspicious 
                      ? "High number of skipped submissions found" 
                      : "Submission pattern looks healthy"
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs flex items-center justify-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>Powered by Codeforces API</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;