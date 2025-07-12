

     1 'use client';
     2
     3 import { useState } from 'react';
     4 import Link from 'next/link';
     5
     6 export default function ImageMetadataPage() {
     7   const [file, setFile] = useState<File | null>(null);
     8   const [metadata, setMetadata] = useState<any>(null);
     9   const [isProcessing, setIsProcessing] = useState(false);
    10   const [error, setError] = useState<string | null>(null);
    11
    12   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    13     if (e.target.files && e.target.files[0]) {
    14       setFile(e.target.files[0]);
    15       setMetadata(null); // Clear previous metadata
    16       setError(null);
    17     }
    18   };
    19
    20   const handleSubmit = async (e: React.FormEvent) => {
    21     e.preventDefault();
    22     if (!file) {
    23       setError('Please select an image to view its metadata.');
    24       return;
    25     }
    26
    27     setIsProcessing(true);
    28     setMetadata(null);
    29     setError(null);
    30
    31     const formData = new FormData();
    32     formData.append('file', file);
    33
    34     try {
    35       const response = await fetch('/api/image-metadata', {
    36         method: 'POST',
    37         body: formData,
    38       });
    39
    40       if (!response.ok) {
    41         const errorData = await response.json();
    42         throw new Error(errorData.error || 'Something went wrong while fetching metadata.');
    43       }
    44
    45       const result = await response.json();
    46       setMetadata(result.metadata);
    47
    48     } catch (err: any) {
    49       setError(err.message);
    50     } finally {
    51       setIsProcessing(false);
    52     }
    53   };
    54
    55   return (
    56     <div className="bg-gray-50 min-h-screen flex flex-col">
    57       <header className="bg-white shadow-sm">
    58         <div className="container mx-auto px-4 py-6 flex justify-between items-center">
    59           <Link href="/" className="text-3xl font-bold text-gray-800">editcompressimage.com</Link>
    60           <nav>
    61             <Link href="/" className="text-blue-600 hover:underline">Back to Tools</Link>
    62           </nav>
    63         </div>
    64       </header>
    65
    66       <main className="flex-grow container mx-auto px-4 py-8">
    67         <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
    68           <div className="text-center mb-6">
    69             <h1 className="text-4xl font-bold text-gray-800">Image Metadata</h1>
    70             <p className="text-gray-600 mt-2">View EXIF data and other metadata embedded in your image files.</p>
    71           </div>
    72
    73           {/* Ad Placeholder */}
    74           <div className="ad-placeholder my-6"><p>Google Ad Banner (728x90)</p></div>
    75
    76           <form onSubmit={handleSubmit}>
    77             <div className="mb-6">
    78               <label htmlFor="file-upload" className="block text-lg font-medium text-gray-700 mb-2">Upload Image</label>
    79               <input
    80                 id="file-upload"
    81                 name="file-upload"
    82                 type="file"
    83                 accept="image/*"
    84                 onChange={handleFileChange}
    85                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50
       file:text-blue-700 hover:file:bg-blue-100"
    86               />
    87             </div>
    88
    89             <div className="text-center">
    90               <button
    91                 type="submit"
    92                 disabled={isProcessing || !file}
    93                 className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors
       duration-300"
    94               >
    95                 {isProcessing ? 'Fetching Metadata...' : 'View Metadata'}
    96               </button>
    97             </div>
    98           </form>
    99
   100           {error && <p className="text-red-500 text-center mt-4">{error}</p>}
   101
   102           {metadata && (
   103             <div className="mt-8 p-6 bg-gray-100 rounded-lg border border-gray-200">
   104               <h2 className="text-2xl font-bold text-gray-800 mb-4">Image Metadata:</h2>
   105               <pre className="bg-gray-800 text-white p-4 rounded-md overflow-auto text-sm">
   106                 {JSON.stringify(metadata, null, 2)}
   107               </pre>
   108             </div>
   109           )}
   110         </div>
   111       </main>
   112
   113       <footer className="bg-white mt-12 py-6">
   114         <div className="container mx-auto px-4 text-center text-gray-600">
   115           <p>&copy; {new Date().getFullYear()} editcompressimage.com. All rights reserved.</p>
   116           <div className="mt-4">
   117             <Link href="/privacy-policy" className="text-blue-600 hover:underline mx-2">Privacy Policy</Link>
   118             <Link href="/terms-and-conditions" className="text-blue-600 hover:underline mx-2">Terms and Conditions</Link>
   119             <a href="mailto:support@editcompressimage.com" className="text-blue-600 hover:underline mx-2">Contact Support</a>
   120           </div>
   121         </div>
   122       </footer>
   123     </div>
   124   );
   125 }