
    1 import Link from 'next/link';
    2
    3 const tools = [
    4   { name: 'Compress Image', href: '/compress-image', description: 'Reduce file size of your images without losing quality.' },
    5   { name: 'Convert to JPG', href: '/convert-to-jpg', description: 'Convert PNG, WEBP, and other formats to JPG.' },
    6   { name: 'Convert from JPG', href: '/convert-from-jpg', description: 'Convert JPG images to PNG, WEBP, and other formats.' },
    7   { name: 'Resize Image', href: '/resize-image', description: 'Change the dimensions of your images by pixels or percentage.' },
    8   { name: 'Crop Image', href: '/crop-image', description: 'Cut out a portion of an image with a simple visual tool.' },
    9   { name: 'Edit Image', href: '/edit-image', description: 'Adjust brightness, contrast, and saturation of your images.' },
   10   { name: 'Remove Background', href: '/remove-background', description: 'Automatically remove the background from your images.' },
   11   { name: 'Compress Multiple Images', href: '/compress-multiple-images', description: 'Reduce the file size of multiple images at once.' },
   12   { name: 'Convert Multiple Images', href: '/convert-multiple-images', description: 'Convert multiple images to different formats in one go.' },
   13   // New tools from category 1: Image Filters & Effects
   14   { name: 'Grayscale Image', href: '/grayscale-image', description: 'Convert your images to black and white.' },
   15   { name: 'Sepia Image', href: '/sepia-image', description: 'Apply a vintage sepia tone to your images.' },
   16   { name: 'Blur Image', href: '/blur-image', description: 'Apply a blur effect to your images.' },
   17   { name: 'Sharpen Image', href: '/sharpen-image', description: 'Enhance the details and edges of your images.' },
   18   { name: 'Vignette Effect', href: '/vignette-effect', description: 'Add a darkened border to your images.' },
   19   { name: 'Duotone Effect', href: '/duotone-effect', description: 'Apply a two-color overlay to your images.' },
   20   { name: 'Invert Colors', href: '/invert-colors', description: 'Invert the colors of your images.' },
   21   // New tools from category 2: Transformations
   22   { name: 'Rotate Image', href: '/rotate-image', description: 'Rotate your images by specific degrees.' },
   23   { name: 'Flip Image', href: '/flip-image', description: 'Flip your images horizontally or vertically.' },
   24   { name: 'Mirror Image', href: '/mirror-image', description: 'Create a mirrored reflection of your images.' },
   25   // New tools from category 5: Advanced & Batch Processing
   26   { name: 'Image to Base64', href: '/image-to-base64', description: 'Convert images to Base64 string.' },
   27   { name: 'Base64 to Image', href: '/base64-to-image', description: 'Convert Base64 string back to an image.' },
   28   { name: 'Image Metadata', href: '/image-metadata', description: 'View and edit EXIF data of your images.' },
   29   { name: 'Image Splitter', href: '/image-splitter', description: 'Divide an image into multiple smaller tiles.' },
   30   { name: 'Image Combiner', href: '/image-combiner', description: 'Combine multiple images into one.' },
   31   { name: 'Advanced Optimizer', href: '/advanced-optimizer', description: 'Further optimize images for web performance.' },
   32   // New tools from category 6: Utility Tools
   33   { name: 'Image Color Picker', href: '/image-color-picker', description: 'Pick colors from your image and get HEX/RGB values.' },
   34   { name: 'Image Information', href: '/image-information', description: 'Get detailed information about your image file.' },
   35 ];
   36
   37 export default function Home() {
   38   return (
   39     (<div className="bg-gray-50 min-h-screen">
   40       <header className="bg-white shadow-sm">
   41         <div className="container mx-auto px-4 py-6">
   42           <h1 className="text-3xl font-bold text-gray-800">editcompressimage.com</h1>
   43           <p className="text-gray-600">Your one-stop shop for online image editing.</p>
   44         </div>
   45       </header>
   46
   47       <main className="container mx-auto px-4 py-8">
   48         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
   49           {tools.map((tool) => (
   50             <Link key={tool.href} href={tool.href} className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
   51               <h2 className="text-xl font-semibold text-gray-800 mb-2">{tool.name}</h2>
   52               <p className="text-gray-600">{tool.description}</p>
   53             </Link>
   54           ))}
   55         </div>
   56       </main>
   57
   58       <footer className="bg-white mt-12 py-6">
   59         <div className="container mx-auto px-4 text-center text-gray-600">
   60           <p>&copy; {new Date().getFullYear()} editcompressimage.com. All rights reserved.</p>
   61           <div className="mt-4">
   62             <Link href="/privacy-policy" className="text-blue-600 hover:underline mx-2">Privacy Policy</Link>
   63             <Link href="/terms-and-conditions" className="text-blue-600 hover:underline mx-2">Terms and Conditions</Link>
   64             <a href="mailto:support@editcompressimage.com" className="text-blue-600 hover:underline mx-2">Contact Support</a>
   65           </div>
   66         </div>
   67       </footer>
   68     </div>)
   69   );
   70 }
