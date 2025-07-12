
     1 'use client';
     2
     3 import { useState } from 'react';
     4 import Link from 'next/link';
     5
     6 export default function CompressImagePage() {
     7   const [file, setFile] = useState<File | null>(null);
     8   const [isCompressing, setIsCompressing] = useState(false);
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
    21       setError('Please select a file to compress.');
    22       return;
    23     }
    24
    25     setIsCompressing(true);
    26     setError(null);
    27
    28     const formData = new FormData();
    29     formData.append('file', file);
    30
    31     try {
    32       const response = await fetch('/api/compress', {
    33         method: 'POST',
    34         body: formData,
    35       });
    36
    37       if (!response.ok) {
    38         const errorData = await response.json();
    39         throw new Error(errorData.error || 'Something went wrong during compression.');
    40       }
    41
    42       const result = await response.json();
    43
    44       // This is the key part: it redirects the user to the download page
    45       // with the new filename after a successful compression.
    46       window.location.href = `/download?filename=${result.filename}`;
    47
    48     } catch (err: any) {
    49       setError(err.message);
    50     } finally {
    51       setIsCompressing(false);
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
    69             <h1 className="text-4xl font-bold text-gray-800">Image Compressor</h1>
    70             <p className="text-gray-600 mt-2">Reduce the file size of your JPG, PNG, and WEBP images quickly and easily.</p>
    71           </div>
    72
    73           {/* Ad Placeholder - Top Banner */}
    74           <div className="ad-placeholder my-6">
    75             <p>Google Ad Banner (728x90)</p>
    76           </div>
    77
    78           <form onSubmit={handleSubmit}>
    79             <div className="mb-6">
    80               <label htmlFor="file-upload" className="block text-lg font-medium text-gray-700 mb-2">Upload Image</label>
    81               <input
    82                 id="file-upload"
    83                 name="file-upload"
    84                 type="file"
    85                 accept="image/jpeg,image/png,image/webp"
    86                 onChange={handleFileChange}
    87                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50
       file:text-blue-700 hover:file:bg-blue-100"
    88               />
    89             </div>
    90
    91             <div className="text-center">
    92               <button
    93                 type="submit"
    94                 disabled={isCompressing || !file}
    95                 className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors
       duration-300"
    96               >
    97                 {isCompressing ? 'Compressing...' : 'Compress Image'}
    98               </button>
    99             </div>
   100           </form>
   101
   102           {error && <p className="text-red-500 text-center mt-4">{error}</p>}
   103         </div>
   104       </main>
   105
   106       <footer className="bg-white mt-12 py-6">
   107         <div className="container mx-auto px-4 text-center text-gray-600">
   108           <p>&copy; {new Date().getFullYear()} editcompressimage.com. All rights reserved.</p>
   109           <div className="mt-4">
   110             <Link href="/privacy-policy" className="text-blue-600 hover:underline mx-2">Privacy Policy</Link>
   111             <Link href="/terms-and-conditions" className="text-blue-600 hover:underline mx-2">Terms and Conditions</Link>
   112             <a href="mailto:support@editcompressimage.com" className="text-blue-600 hover:underline mx-2">Contact Support</a>
   113           </div>
   114         </div>
   115       </footer>
   116     </div>
   117   );
   118 }