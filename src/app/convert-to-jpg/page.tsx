 1 'use client';
     2
     3 import { useState } from 'react';
     4 import Link from 'next/link';
     5
     6 export default function ConvertToJpgPage() {
     7   const [file, setFile] = useState<File | null>(null);
     8   const [isConverting, setIsConverting] = useState(false);
     9   const [error, setError] = useState<string | null>(null);
    10
    11   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    12     if (e.target.files && e.target.files[0]) {
    13       setFile(e.target.files[0]);
    14       setError(null);
    15     }
    16   };
    17
    18   const handleSubmit = async (e: React.FormEvent) => {
    19     e.preventDefault();
    20     if (!file) {
    21       setError('Please select a file to convert.');
    22       return;
    23     }
    24
    25     setIsConverting(true);
    26     setError(null);
    27
    28     const formData = new FormData();
    29     formData.append('file', file);
    30
    31     try {
    32       const response = await fetch('/api/convert-to-jpg', {
    33         method: 'POST',
    34         body: formData,
    35       });
    36
    37       if (!response.ok) {
    38         const errorData = await response.json();
    39         throw new Error(errorData.error || 'Something went wrong during conversion.');
    40       }
    41
    42       const result = await response.json();
    43       window.location.href = `/download?filename=${result.filename}`;
    44
    45     } catch (err: any) {
    46       setError(err.message);
    47     } finally {
    48       setIsConverting(false);
    49     }
    50   };
    51 // The main page component that uses Suspense
    52   return (ault function DownloadPage() {
    53     <div className="bg-gray-50 min-h-screen flex flex-col">
    54       <header className="bg-white shadow-sm">en flex flex-col">
    55         <div className="container mx-auto px-4 py-6 flex justify-between items-center">
    56           <Link href="/" className="text-3xl font-bold text-gray-800">editcompressimage.com</Link>
    57           <nav>     <Link href="/" className="text-3xl font-bold text-gray-800">editcompressimage.com</Link>
    58             <Link href="/" className="text-blue-600 hover:underline">Back to Tools</Link>
    59           </nav>        <Link href="/" className="text-blue-600 hover:underline">Back to Tools</Link>
    60         </div>      </nav>
    61       </header> </div>
    62             </header>
    63       <main className="flex-grow container mx-auto px-4 py-8">
    64         <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
    65           <div className="text-center mb-6">ssName="text-center text-lg">Loading download page...</div>}>
    66             <h1 className="text-4xl font-bold text-gray-800">Convert to JPG</h1>
    67             <p className="text-gray-600 mt-2">Convert PNG, WEBP, and other image formats to JPG.</p>
    68           </div>in>
    69
    70           {/* Ad Placeholder */}g-white mt-12 py-6">
    71           <div className="ad-placeholder my-6"><p>Google Ad Banner (728x90)</p></div>
    72                     <p>&copy; {new Date().getFullYear()} editcompressimage.com. All rights reserved.</p>
    73           <form onSubmit={handleSubmit}>">
    74             <div className="mb-6">="/privacy-policy" className="text-blue-600 hover:underline mx-2">Privacy Policy</Link>
    75               <label htmlFor="file-upload" className="block text-lg font-medium text-gray-700 mb-2">Upload Image</label>itions</Link>
    76               <input    <a href="mailto:support@editcompressimage.com" className="text-blue-600 hover:underline mx-2">Contact Support</a>
    77                 id="file-upload"
    78                 name="file-upload"
    79                 type="file"
    80                 accept="image/png,image/webp,image/gif,image/tiff"
    81                 onChange={handleFileChange}
    82                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50
       file:text-blue-700 hover:file:bg-blue-100"
    83               />
    84             </div>
    85 e let me know when you have created this file.
    86             <div className="text-center">
    87               <button
    88                 type="submit"
    89                 disabled={isConverting || !file}
    90                 className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors
       duration-300"
    91               >
    92                 {isConverting ? 'Converting...' : 'Convert to JPG'}
    93               </button>
    94             </div>
    95           </form>
    96
    97           {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    98         </div>
    99       </main>
   100
   101       <footer className="bg-white mt-12 py-6">
   102         <div className="container mx-auto px-4 text-center text-gray-600">
   103           <p>&copy; {new Date().getFullYear()} editcompressimage.com. All rights reserved.</p>
   104           <div className="mt-4">
   105             <Link href="/privacy-policy" className="text-blue-600 hover:underline mx-2">Privacy Policy</Link>
   106             <Link href="/terms-and-conditions" className="text-blue-600 hover:underline mx-2">Terms and Conditions</Link>
   107             <a href="mailto:support@editcompressimage.com" className="text-blue-600 hover:underline mx-2">Contact Support</a>
   108           </div>
   109         </div>
   110       </footer>
   111     </div>
   112   );
   113 }