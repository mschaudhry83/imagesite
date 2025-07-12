
     1 'use client';
     2
     3 import { useState } from 'react';
     4 import Link from 'next/link';
     5
     6 export default function ConvertFromJpgPage() {
     7   const [file, setFile] = useState<File | null>(null);
     8   const [targetFormat, setTargetFormat] = useState<string>('png'); // Default to PNG
     9   const [isConverting, setIsConverting] = useState(false);
    10   const [error, setError] = useState<string | null>(null);
    11
    12   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    13     if (e.target.files && e.target.files[0]) {
    14       setFile(e.target.files[0]);
    15       setError(null);
    16     }
    17   };
    18
    19   const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    20     setTargetFormat(e.target.value);
    21   };
    22
    23   const handleSubmit = async (e: React.FormEvent) => {
    24     e.preventDefault();
    25     if (!file) {
    26       setError('Please select a file to convert.');
    27       return;
    28     }
    29     if (!file.name.toLowerCase().endsWith('.jpg') && !file.name.toLowerCase().endsWith('.jpeg')) {
    30         setError('Please upload a JPG or JPEG image.');
    31         return;
    32     }
    33
    34     setIsConverting(true);
    35     setError(null);
    36
    37     const formData = new FormData();
    38     formData.append('file', file);
    39     formData.append('targetFormat', targetFormat); // Send the target format to the API
    40
    41     try {
    42       const response = await fetch('/api/convert-from-jpg', {
    43         method: 'POST',
    44         body: formData,
    45       });
    46
    47       if (!response.ok) {
    48         const errorData = await response.json();
    49         throw new Error(errorData.error || 'Something went wrong during conversion.');
    50       }
    51
    52       const result = await response.json();
    53       window.location.href = `/download?filename=${result.filename}`;
    54
    55     } catch (err: any) {
    56       setError(err.message);
    57     } finally {
    58       setIsConverting(false);
    59     }
    60   };
    61
    62   return (
    63     <div className="bg-gray-50 min-h-screen flex flex-col">
    64       <header className="bg-white shadow-sm">
    65         <div className="container mx-auto px-4 py-6 flex justify-between items-center">
    66           <Link href="/" className="text-3xl font-bold text-gray-800">editcompressimage.com</Link>
    67           <nav>
    68             <Link href="/" className="text-blue-600 hover:underline">Back to Tools</Link>
    69           </nav>
    70         </div>
    71       </header>
    72
    73       <main className="flex-grow container mx-auto px-4 py-8">
    74         <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
    75           <div className="text-center mb-6">
    76             <h1 className="text-4xl font-bold text-gray-800">Convert from JPG</h1>
    77             <p className="text-gray-600 mt-2">Convert JPG images to PNG, WEBP, or other formats.</p>
    78           </div>
    79
    80           {/* Ad Placeholder */}
    81           <div className="ad-placeholder my-6"><p>Google Ad Banner (728x90)</p></div>
    82
    83           <form onSubmit={handleSubmit}>
    84             <div className="mb-6">
    85               <label htmlFor="file-upload" className="block text-lg font-medium text-gray-700 mb-2">Upload JPG Image</label>
    86               <input
    87                 id="file-upload"
    88                 name="file-upload"
    89                 type="file"
    90                 accept="image/jpeg" // Only accept JPG for upload
    91                 onChange={handleFileChange}
    92                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50
       file:text-blue-700 hover:file:bg-blue-100"
    93               />
    94             </div>
    95
    96             <div className="mb-6">
    97               <label htmlFor="target-format" className="block text-lg font-medium text-gray-700 mb-2">Convert To:</label>
    98               <select
    99                 id="target-format"
   100                 name="target-format"
   101                 value={targetFormat}
   102                 onChange={handleFormatChange}
   103                 className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
   104               >
   105                 <option value="png">PNG</option>
   106                 <option value="webp">WEBP</option>
   107                 {/* Add more formats if needed, e.g., <option value="bmp">BMP</option> */}
   108               </select>
   109             </div>
   110
   111             <div className="text-center">
   112               <button
   113                 type="submit"
   114                 disabled={isConverting || !file}
   115                 className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors
       duration-300"
   116               >
   117                 {isConverting ? 'Converting...' : 'Convert Image'}
   118               </button>
   119             </div>
   120           </form>
   121
   122           {error && <p className="text-red-500 text-center mt-4">{error}</p>}
   123         </div>
   124       </main>
   125
   126       <footer className="bg-white mt-12 py-6">
   127         <div className="container mx-auto px-4 text-center text-gray-600">
   128           <p>&copy; {new Date().getFullYear()} editcompressimage.com. All rights reserved.</p>
   129           <div className="mt-4">
   130             <Link href="/privacy-policy" className="text-blue-600 hover:underline mx-2">Privacy Policy</Link>
   131             <Link href="/terms-and-conditions" className="text-blue-600 hover:underline mx-2">Terms and Conditions</Link>
   132             <a href="mailto:support@editcompressimage.com" className="text-blue-600 hover:underline mx-2">Contact Support</a>
   133           </div>
   134         </div>
   135       </footer>
   136     </div>
   137   );
   138 }