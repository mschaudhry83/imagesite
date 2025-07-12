
     1 'use client';
     2
     3 import { useEffect, useState, Suspense } from 'react';
     4 import { useSearchParams } from 'next/navigation';
     5 import Link from 'next/link';
     6
     7 // We wrap the main content in a separate component to use Suspense,
     8 // which is required by Next.js for components that use `useSearchParams`.
     9 function DownloadPageContent() {
    10   const searchParams = useSearchParams();
    11   const filename = searchParams.get('filename');
    12   const [countdown, setCountdown] = useState(10);
    13   const downloadUrl = filename ? `/uploads/${filename}` : '#';
    14
    15   useEffect(() => {
    16     if (!filename) return;
    17
    18     // Start the countdown timer
    19     const timer = setInterval(() => {
    20       setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    21     }, 1000);
    22
    23     // Set a timeout to trigger the download automatically after 10 seconds
    24     const downloadTimeout = setTimeout(() => {
    25       // Create a temporary link element and click it to start the download
    26       const link = document.createElement('a');
    27       link.href = downloadUrl;
    28       link.setAttribute('download', filename); // This attribute ensures the file is downloaded
    29       document.body.appendChild(link);
    30       link.click();
    31       document.body.removeChild(link);
    32     }, 10000);
    33
    34     // Clean up the timer and timeout when the component is unmounted
    35     return () => {
    36       clearInterval(timer);
    37       clearTimeout(downloadTimeout);
    38     };
    39   }, [filename, downloadUrl]);
    40
    41   // Handle case where no filename is provided
    42   if (!filename) {
    43     return (
    44       <div className="text-center">
    45         <h2 className="text-2xl font-bold text-red-600">Error</h2>
    46         <p className="text-gray-600 mt-2">No file specified for download. Please go back and try again.</p>
    47         <Link href="/" className="mt-4 inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
    48           Back to Tools
    49         </Link>
    50       </div>
    51     );
    52   }
    53
    54   return (
    55     <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
    56       <div className="text-center mb-6">
    57         <h1 className="text-4xl font-bold text-gray-800">Your Download is Ready!</h1>
    58         <p className="text-gray-600 mt-2">
    59           Your download will start automatically in <span className="font-bold text-blue-600">{countdown}</span> seconds.
    60         </p>
    61       </div>
    62
    63       {/* Ad Placeholder - Top Banner */}
    64       <div className="ad-placeholder my-6">
    65         <p>Google Ad Banner (728x90)</p>
    66       </div>
    67
    68       <div className="text-center my-8">
    69         <a
    70           href={downloadUrl}
    71           download={filename}
    72           className="bg-green-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-green-700 transition-colors duration-300 text-2xl"
    73         >
    74           Download Now
    75         </a>
    76         <p className="text-sm text-gray-500 mt-2">If the download doesn't start, click the button above.</p>
    77       </div>
    78
    79       <div className="flex flex-col md:flex-row justify-between gap-4">
    80         {/* Ad Placeholder - Skyscraper */}
    81         <div className="ad-placeholder ad-placeholder-skyscraper mx-auto">
    82             <p>Google Ad<br/>Skyscraper<br/>(160x600)</p>
    83         </div>
    84
    85         {/* Ad Placeholder - Main Content Area */}
    86         <div className="ad-placeholder flex-grow mx-auto">
    87             <p>Google Ad<br/>Medium Rectangle<br/>(300x250)</p>
    88         </div>
    89       </div>
    90     </div>
    91   );
    92 }
    93
    94 // The main page component that uses Suspense
    95 export default function DownloadPage() {
    96     return (
    97         <div className="bg-gray-50 min-h-screen flex flex-col">
    98             <header className="bg-white shadow-sm">
    99                 <div className="container mx-auto px-4 py-6 flex justify-between items-center">
   100                     <Link href="/" className="text-3xl font-bold text-gray-800">editcompressimage.com</Link>
   101                     <nav>
   102                         <Link href="/" className="text-blue-600 hover:underline">Back to Tools</Link>
   103                     </nav>
   104                 </div>
   105             </header>
   106
   107             <main className="flex-grow container mx-auto px-4 py-8">
   108                 <Suspense fallback={<div className="text-center text-lg">Loading download page...</div>}>
   109                     <DownloadPageContent />
   110                 </Suspense>
   111             </main>
   112
   113             <footer className="bg-white mt-12 py-6">
   114                 <div className="container mx-auto px-4 text-center text-gray-600">
   115                     <p>&copy; {new Date().getFullYear()} editcompressimage.com. All rights reserved.</p>
   116                     <div className="mt-4">
   117                         <Link href="/privacy-policy" className="text-blue-600 hover:underline mx-2">Privacy Policy</Link>
   118                         <Link href="/terms-and-conditions" className="text-blue-600 hover:underline mx-2">Terms and Conditions</Link>
   119                         <a href="mailto:support@editcompressimage.com" className="text-blue-600 hover:underline mx-2">Contact Support</a>
   120                     </div>
   121                 </div>
   122             </footer>
   123         </div>
   124     );
   125 }
