

     1 'use client';
     2
     3 import { useState } from 'react';
     4 import Link from 'next/link';
     5
     6 export default function CropImagePage() {
     7   const [file, setFile] = useState<File | null>(null);
     8   const [x, setX] = useState<number | string>('');
     9   const [y, setY] = useState<number | string>('');
    10   const [width, setWidth] = useState<number | string>('');
    11   const [height, setHeight] = useState<number | string>('');
    12   const [isCropping, setIsCropping] = useState(false);
    13   const [error, setError] = useState<string | null>(null);
    14
    15   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    16     if (e.target.files && e.target.files[0]) {
    17       setFile(e.target.files[0]);
    18       setError(null);
    19     }
    20   };
    21
    22   const handleCoordinateChange = (setter: React.Dispatch<React.SetStateAction<number | string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    23     const value = e.target.value;
    24     setter(value === '' ? '' : Number(value));
    25   };
    26
    27   const handleSubmit = async (e: React.FormEvent) => {
    28     e.preventDefault();
    29     if (!file) {
    30       setError('Please select an image to crop.');
    31       return;
    32     }
    33
    34     if (typeof x !== 'number' || typeof y !== 'number' || typeof width !== 'number' || typeof height !== 'number' ||
    35         x < 0 || y < 0 || width <= 0 || height <= 0) {
    36       setError('Please enter valid positive numbers for all crop coordinates (x, y, width, height).');
    37       return;
    38     }
    39
    40     setIsCropping(true);
    41     setError(null);
    42
    43     const formData = new FormData();
    44     formData.append('file', file);
    45     formData.append('x', String(x));
    46     formData.append('y', String(y));
    47     formData.append('width', String(width));
    48     formData.append('height', String(height));
    49
    50     try {
    51       const response = await fetch('/api/crop-image', {
    52         method: 'POST',
    53         body: formData,
    54       });
    55
    56       if (!response.ok) {
    57         const errorData = await response.json();
    58         throw new Error(errorData.error || 'Something went wrong during cropping.');
    59       }
    60
    61       const result = await response.json();
    62       window.location.href = `/download?filename=${result.filename}`;
    63
    64     } catch (err: any) {
    65       setError(err.message);
    66     } finally {
    67       setIsCropping(false);
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
    85             <h1 className="text-4xl font-bold text-gray-800">Crop Image</h1>
    86             <p className="text-gray-600 mt-2">Crop your images by specifying the area to keep.</p>
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
   105             <div className="mb-6">
   106               <p className="text-sm text-gray-500 mb-2">
   107                 For a real-world application, an interactive visual cropper (e.g., using a library like `react-image-crop`) would be integrated here.
   108                 For now, please manually enter the crop coordinates.
   109               </p>
   110               <div className="grid grid-cols-2 gap-4">
   111                 <div>
   112                   <label htmlFor="x-coord" className="block text-sm font-medium text-gray-700">X (pixels from left)</label>
   113                   <input
   114                     type="number"
   115                     id="x-coord"
   116                     name="x-coord"
   117                     value={x}
   118                     onChange={handleCoordinateChange(setX)}
   119                     placeholder="0"
   120                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
   121                   />
   122                 </div>
   123                 <div>
   124                   <label htmlFor="y-coord" className="block text-sm font-medium text-gray-700">Y (pixels from top)</label>
   125                   <input
   126                     type="number"
   127                     id="y-coord"
   128                     name="y-coord"
   129                     value={y}
   130                     onChange={handleCoordinateChange(setY)}
   131                     placeholder="0"
   132                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
   133                   />
   134                 </div>
   135                 <div>
   136                   <label htmlFor="crop-width" className="block text-sm font-medium text-gray-700">Width (pixels)</label>
   137                   <input
   138                     type="number"
   139                     id="crop-width"
   140                     name="crop-width"
   141                     value={width}
   142                     onChange={handleCoordinateChange(setWidth)}
   143                     placeholder="e.g., 300"
   144                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
   145                   />
   146                 </div>
   147                 <div>
   148                   <label htmlFor="crop-height" className="block text-sm font-medium text-gray-700">Height (pixels)</label>
   149                   <input
   150                     type="number"
   151                     id="crop-height"
   152                     name="crop-height"
   153                     value={height}
   154                     onChange={handleCoordinateChange(setHeight)}
   155                     placeholder="e.g., 200"
   156                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
   157                   />
   158                 </div>
   159               </div>
   160             </div>
   161
   162             <div className="text-center">
   163               <button
   164                 type="submit"
   165                 disabled={isCropping || !file || !x || !y || !width || !height}
   166                 className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors
       duration-300"
   167               >
   168                 {isCropping ? 'Cropping...' : 'Crop Image'}
   169               </button>
   170             </div>
   171           </form>
   172
   173           {error && <p className="text-red-500 text-center mt-4">{error}</p>}
   174         </div>
   175       </main>
   176
   177       <footer className="bg-white mt-12 py-6">
   178         <div className="container mx-auto px-4 text-center text-gray-600">
   179           <p>&copy; {new Date().getFullYear()} editcompressimage.com. All rights reserved.</p>
   180           <div className="mt-4">
   181             <Link href="/privacy-policy" className="text-blue-600 hover:underline mx-2">Privacy Policy</Link>
   182             <Link href="/terms-and-conditions" className="text-blue-600 hover:underline mx-2">Terms and Conditions</Link>
   183             <a href="mailto:support@editcompressimage.com" className="text-blue-600 hover:underline mx-2">Contact Support</a>
   184           </div>
   185         </div>
   186       </footer>
   187     </div>
   188   );
   189 }
