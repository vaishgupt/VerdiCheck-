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

import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./components/Home";
import Main from "./components/main";

function App() {
 return(
 <div>
   <BrowserRouter>
      <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  </div>
 )
}

export default App;