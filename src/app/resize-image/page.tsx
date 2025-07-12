
     1 'use client';
     2
     3 import { useState } from 'react';
     4 import Link from 'next/link';
     5
     6 export default function ResizeImagePage() {
     7   const [file, setFile] = useState<File | null>(null);
     8   const [width, setWidth] = useState<number | string>('');
     9   const [height, setHeight] = useState<number | string>('');
    10   const [isResizing, setIsResizing] = useState(false);
    11   const [error, setError] = useState<string | null>(null);
    12
    13   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    14     if (e.target.files && e.target.files[0]) {
    15       setFile(e.target.files[0]);
    16       setError(null);
    17     }
    18   };
    19
    20   const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    21     const value = e.target.value;
    22     setWidth(value === '' ? '' : Number(value));
    23   };
    24
    25   const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    26     const value = e.target.value;
    27     setHeight(value === '' ? '' : Number(value));
    28   };
    29
    30   const handleSubmit = async (e: React.FormEvent) => {
    31     e.preventDefault();
    32     if (!file) {
    33       setError('Please select an image to resize.');
    34       return;
    35     }
    36
    37     if (typeof width === 'string' || typeof height === 'string' || (width < 1 && height < 1)) {
    38         setError('Width and height must be positive numbers.');
    39         return;
    40     }
    41
    42     setIsResizing(true);
    43     setError(null);
    44
    45     const formData = new FormData();
    46     formData.append('file', file);
    47     formData.append('width', String(width));
    48     formData.append('height', String(height));
    49
    50     try {
    51       const response = await fetch('/api/resize-image', {
    52         method: 'POST',
    53         body: formData,
    54       });
    55
    56       if (!response.ok) {
    57         const errorData = await response.json();
    58         throw new Error(errorData.error || 'Something went wrong during resizing.');
    59       }
    60
    61       const result = await response.json();
    62       window.location.href = `/download?filename=${result.filename}`;
    63
    64     } catch (err: any) {
    65       setError(err.message);
    66     } finally {
    67       setIsResizing(false);
    68     }
    69   };
    70
    71   return (
    72     <div className="bg-gray-50 min-h-screen flex flex-col">
    73       <header className="bg-white shadow-sm">
    74         <div className="container mx-auto px-4 py-6 flex justify-between items-center">
    75           <Link href="/" className="text-3xl font-bold text-gray-800">editcompressimage.com</Link>
    76           <nav>
    77             <Link href="/" className="text-blue-600 hover:underline">Back to Tools</Link>
    78           </nav>
    79         </div>
    80       </header>
    81
    82       <main className="flex-grow container mx-auto px-4 py-8">
    83         <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
    84           <div className="text-center mb-6">
    85             <h1 className="text-4xl font-bold text-gray-800">Resize Image</h1>
    86             <p className="text-gray-600 mt-2">Change the dimensions of your images by pixels.</p>
    87           </div>
    88
    89           {/* Ad Placeholder */}
    90           <div className="ad-placeholder my-6"><p>Google Ad Banner (728x90)</p></div>
    91
    92           <form onSubmit={handleSubmit}>
    93             <div className="mb-6">
    94               <label htmlFor="file-upload" className="block text-lg font-medium text-gray-700 mb-2">Upload Image</label>
    95               <input
    96                 id="file-upload"
    97                 name="file-upload"
    98                 type="file"
    99                 accept="image/*"
   100                 onChange={handleFileChange}
   101                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50
       file:text-blue-700 hover:file:bg-blue-100"
   102               />
   103             </div>
   104
   105             <div className="mb-6 flex space-x-4">
   106               <div className="flex-1">
   107                 <label htmlFor="width" className="block text-lg font-medium text-gray-700 mb-2">Width (pixels)</label>
   108                 <input
   109                   type="number"
   110                   id="width"
   111                   name="width"
   112                   value={width}
   113                   onChange={handleWidthChange}
   114                   placeholder="e.g., 800"
   115                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
   116                 />
   117               </div>
   118               <div className="flex-1">
   119                 <label htmlFor="height" className="block text-lg font-medium text-gray-700 mb-2">Height (pixels)</label>
   120                 <input
   121                   type="number"
   122                   id="height"
   123                   name="height"
   124                   value={height}
   125                   onChange={handleHeightChange}
   126                   placeholder="e.g., 600"
   127                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
   128                 />
   129               </div>
   130             </div>
   131             <p className="text-sm text-gray-500 mb-4">Enter either width or height to maintain aspect ratio, or both for specific dimensions.</p>
   132
   133             <div className="text-center">
   134               <button
   135                 type="submit"
   136                 disabled={isResizing || !file || (!width && !height)}
   137                 className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors
       duration-300"
   138               >
   139                 {isResizing ? 'Resizing...' : 'Resize Image'}
   140               </button>
   141             </div>
   142           </form>
   143
   144           {error && <p className="text-red-500 text-center mt-4">{error}</p>}
   145         </div>
   146       </main>
   147
   148       <footer className="bg-white mt-12 py-6">
   149         <div className="container mx-auto px-4 text-center text-gray-600">
   150           <p>&copy; {new Date().getFullYear()} editcompressimage.com. All rights reserved.</p>
   151           <div className="mt-4">
   152             <Link href="/privacy-policy" className="text-blue-600 hover:underline mx-2">Privacy Policy</Link>
   153             <Link href="/terms-and-conditions" className="text-blue-600 hover:underline mx-2">Terms and Conditions</Link>
   154             <a href="mailto:support@editcompressimage.com" className="text-blue-600 hover:underline mx-2">Contact Support</a>
   155           </div>
   156         </div>
   157       </footer>
   158     </div>
   159   );
   160 }