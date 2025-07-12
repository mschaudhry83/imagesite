  1 'use client';
     2
     3 import { useState } from 'react';
     4 import Link from 'next/link';
     5
     6 export default function ImageInformationPage() {
     7   const [file, setFile] = useState<File | null>(null);
     8   const [imageInfo, setImageInfo] = useState<any>(null);
     9   const [isProcessing, setIsProcessing] = useState(false);
    10   const [error, setError] = useState<string | null>(null);
    11
    12   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    13     if (e.target.files && e.target.files[0]) {
    14       setFile(e.target.files[0]);
    15       setImageInfo(null); // Clear previous info
    16       setError(null);
    17     }
    18   };
    19
    20   const handleSubmit = async (e: React.FormEvent) => {
    21     e.preventDefault();
    22     if (!file) {
    23       setError('Please select an image to view its information.');
    24       return;
    25     }
    26
    27     setIsProcessing(true);
    28     setImageInfo(null);
    29     setError(null);
    30
    31     const formData = new FormData();
    32     formData.append('file', file);
    33
    34     try {
    35       const response = await fetch('/api/image-information', {
    36         method: 'POST',
    37         body: formData,
    38       });
    39
    40       if (!response.ok) {
    41         const errorData = await response.json();
    42         throw new Error(errorData.error || 'Something went wrong while fetching image information.');
    43       }
    44
    45       const result = await response.json();
    46       setImageInfo(result.info);
    47
    48     } catch (err: any) {
    49       setError(err.message);
    50     } finally {
    51       setIsProcessing(false);
    52     }
    53   };
    54
    55   // Helper to format file size
    56   const formatBytes = (bytes: number, decimals = 2) => {
    57     if (bytes === 0) return '0 Bytes';
    58     const k = 1024;
    59     const dm = decimals < 0 ? 0 : decimals;
    60     const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    61     const i = Math.floor(Math.log(bytes) / Math.log(k));
    62     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    63   };
    64
    65   return (
    66     <div className="bg-gray-50 min-h-screen flex flex-col">
    67       <header className="bg-white shadow-sm">
    68         <div className="container mx-auto px-4 py-6 flex justify-between items-center">
    69           <Link href="/" className="text-3xl font-bold text-gray-800">editcompressimage.com</Link>
    70           <nav>
    71             <Link href="/" className="text-blue-600 hover:underline">Back to Tools</Link>
    72           </nav>
    73         </div>
    74       </header>
    75
    76       <main className="flex-grow container mx-auto px-4 py-8">
    77         <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
    78           <div className="text-center mb-6">
    79             <h1 className="text-4xl font-bold text-gray-800">Image Information</h1>
    80             <p className="text-gray-600 mt-2">Get detailed information about your image file.</p>
    81           </div>
    82
    83           {/* Ad Placeholder */}
    84           <div className="ad-placeholder my-6"><p>Google Ad Banner (728x90)</p></div>
    85
    86           <form onSubmit={handleSubmit}>
    87             <div className="mb-6">
    88               <label htmlFor="file-upload" className="block text-lg font-medium text-gray-700 mb-2">Upload Image</label>
    89               <input
    90                 id="file-upload"
    91                 name="file-upload"
    92                 type="file"
    93                 accept="image/*"
    94                 onChange={handleFileChange}
    95                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50
       file:text-blue-700 hover:file:bg-blue-100"
    96               />
    97             </div>
    98
    99             <div className="text-center">
   100               <button
   101                 type="submit"
   102                 disabled={isProcessing || !file}
   103                 className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors
       duration-300"
   104               >
   105                 {isProcessing ? 'Fetching Info...' : 'Get Image Info'}
   106               </button>
   107             </div>
   108           </form>
   109
   110           {error && <p className="text-red-500 text-center mt-4">{error}</p>}
   111
   112           {imageInfo && (
   113             <div className="mt-8 p-6 bg-gray-100 rounded-lg border border-gray-200">
   114               <h2 className="text-2xl font-bold text-gray-800 mb-4">Details:</h2>
   115               <ul className="list-disc list-inside space-y-2 text-gray-700">
   116                 <li><strong>File Name:</strong> {imageInfo.name}</li>
   117                 <li><strong>File Type:</strong> {imageInfo.type}</li>
   118                 <li><strong>File Size:</strong> {formatBytes(imageInfo.size)}</li>
   119                 {imageInfo.width && <li><strong>Dimensions:</strong> {imageInfo.width}px x {imageInfo.height}px</li>}
   120                 {imageInfo.format && <li><strong>Format:</strong> {imageInfo.format}</li>}
   121                 {imageInfo.channels && <li><strong>Channels:</strong> {imageInfo.channels}</li>}
   122                 {imageInfo.space && <li><strong>Color Space:</strong> {imageInfo.space}</li>}
   123                 {imageInfo.density && <li><strong>Density (DPI/PPI):</strong> {imageInfo.density}</li>}
   124                 {imageInfo.hasAlpha && <li><strong>Has Alpha Channel:</strong> {imageInfo.hasAlpha ? 'Yes' : 'No'}</li>}
   125                 {imageInfo.isProgressive && <li><strong>Is Progressive:</strong> {imageInfo.isProgressive ? 'Yes' : 'No'}</li>}
   126               </ul>
   127             </div>
   128           )}
   129         </div>
   130       </main>
   131
   132       <footer className="bg-white mt-12 py-6">
   133         <div className="container mx-auto px-4 text-center text-gray-600">
   134           <p>&copy; {new Date().getFullYear()} editcompressimage.com. All rights reserved.</p>
   135           <div className="mt-4">
   136             <Link href="/privacy-policy" className="text-blue-600 hover:underline mx-2">Privacy Policy</Link>
   137             <Link href="/terms-and-conditions" className="text-blue-600 hover:underline mx-2">Terms and Conditions</Link>
   138             <a href="mailto:support@editcompressimage.com" className="text-blue-600 hover:underline mx-2">Contact Support</a>
   139           </div>
   140         </div>
   141       </footer>
   142     </div>
   143   );
   144 }