
     1 'use client';
     2
     3 import { useState } from 'react';
     4 import Link from 'next/link';
     5
     6 export default function EditImagePage() {
     7   const [file, setFile] = useState<File | null>(null);
     8   const [brightness, setBrightness] = useState<number>(1); // 1 = no change
     9   const [contrast, setContrast] = useState<number>(1);   // 1 = no change
    10   const [saturation, setSaturation] = useState<number>(1); // 1 = no change
    11   const [isEditing, setIsEditing] = useState(false);
    12   const [error, setError] = useState<string | null>(null);
    13
    14   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    15     if (e.target.files && e.target.files[0]) {
    16       setFile(e.target.files[0]);
    17       setError(null);
    18     }
    19   };
    20
    21   const handleSubmit = async (e: React.FormEvent) => {
    22     e.preventDefault();
    23     if (!file) {
    24       setError('Please select an image to edit.');
    25       return;
    26     }
    27
    28     setIsEditing(true);
    29     setError(null);
    30
    31     const formData = new FormData();
    32     formData.append('file', file);
    33     formData.append('brightness', String(brightness));
    34     formData.append('contrast', String(contrast));
    35     formData.append('saturation', String(saturation));
    36
    37     try {
    38       const response = await fetch('/api/edit-image', {
    39         method: 'POST',
    40         body: formData,
    41       });
    42
    43       if (!response.ok) {
    44         const errorData = await response.json();
    45         throw new Error(errorData.error || 'Something went wrong during image editing.');
    46       }
    47
    48       const result = await response.json();
    49       window.location.href = `/download?filename=${result.filename}`;
    50
    51     } catch (err: any) {
    52       setError(err.message);
    53     } finally {
    54       setIsEditing(false);
    55     }
    56   };
    57
    58   return (
    59     <div className="bg-gray-50 min-h-screen flex flex-col">
    60       <header className="bg-white shadow-sm">
    61         <div className="container mx-auto px-4 py-6 flex justify-between items-center">
    62           <Link href="/" className="text-3xl font-bold text-gray-800">editcompressimage.com</Link>
    63           <nav>
    64             <Link href="/" className="text-blue-600 hover:underline">Back to Tools</Link>
    65           </nav>
    66         </div>
    67       </header>
    68
    69       <main className="flex-grow container mx-auto px-4 py-8">
    70         <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
    71           <div className="text-center mb-6">
    72             <h1 className="text-4xl font-bold text-gray-800">Edit Image</h1>
    73             <p className="text-gray-600 mt-2">Adjust brightness, contrast, and saturation of your images.</p>
    74           </div>
    75
    76           {/* Ad Placeholder */}
    77           <div className="ad-placeholder my-6"><p>Google Ad Banner (728x90)</p></div>
    78
    79           <form onSubmit={handleSubmit}>
    80             <div className="mb-6">
    81               <label htmlFor="file-upload" className="block text-lg font-medium text-gray-700 mb-2">Upload Image</label>
    82               <input
    83                 id="file-upload"
    84                 name="file-upload"
    85                 type="file"
    86                 accept="image/*"
    87                 onChange={handleFileChange}
    88                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50
       file:text-blue-700 hover:file:bg-blue-100"
    89               />
    90             </div>
    91
    92             <div className="mb-6">
    93               <label htmlFor="brightness" className="block text-lg font-medium text-gray-700 mb-2">Brightness</label>
    94               <input
    95                 type="range"
    96                 id="brightness"
    97                 name="brightness"
    98                 min="0.5"
    99                 max="2"
   100                 step="0.05"
   101                 value={brightness}
   102                 onChange={(e) => setBrightness(Number(e.target.value))}
   103                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
   104               />
   105               <span className="text-sm text-gray-500">{brightness.toFixed(2)}</span>
   106             </div>
   107
   108             <div className="mb-6">
   109               <label htmlFor="contrast" className="block text-lg font-medium text-gray-700 mb-2">Contrast</label>
   110               <input
   111                 type="range"
   112                 id="contrast"
   113                 name="contrast"
   114                 min="0.5"
   115                 max="2"
   116                 step="0.05"
   117                 value={contrast}
   118                 onChange={(e) => setContrast(Number(e.target.value))}
   119                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
   120               />
   121               <span className="text-sm text-gray-500">{contrast.toFixed(2)}</span>
   122             </div>
   123
   124             <div className="mb-6">
   125               <label htmlFor="saturation" className="block text-lg font-medium text-gray-700 mb-2">Saturation</label>
   126               <input
   127                 type="range"
   128                 id="saturation"
   129                 name="saturation"
   130                 min="0.5"
   131                 max="2"
   132                 step="0.05"
   133                 value={saturation}
   134                 onChange={(e) => setSaturation(Number(e.target.value))}
   135                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
   136               />
   137               <span className="text-sm text-gray-500">{saturation.toFixed(2)}</span>
   138             </div>
   139
   140             <div className="text-center">
   141               <button
   142                 type="submit"
   143                 disabled={isEditing || !file}
   144                 className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors
       duration-300"
   145               >
   146                 {isEditing ? 'Applying Edits...' : 'Apply Edits'}
   147               </button>
   148             </div>
   149           </form>
   150
   151           {error && <p className="text-red-500 text-center mt-4">{error}</p>}
   152         </div>
   153       </main>
   154
   155       <footer className="bg-white mt-12 py-6">
   156         <div className="container mx-auto px-4 text-center text-gray-600">
   157           <p>&copy; {new Date().getFullYear()} editcompressimage.com. All rights reserved.</p>
   158           <div className="mt-4">
   159             <Link href="/privacy-policy" className="text-blue-600 hover:underline mx-2">Privacy Policy</Link>
   160             <Link href="/terms-and-conditions" className="text-blue-600 hover:underline mx-2">Terms and Conditions</Link>
   161             <a href="mailto:support@editcompressimage.com" className="text-blue-600 hover:underline mx-2">Contact Support</a>
   162           </div>
   163         </div>
   164       </footer>
   165     </div>
   166   );
   167 }