
    1 import Link from 'next/link';
    2 import type { Metadata } from 'next';
    3
    4 export const metadata: Metadata = {
    5   title: 'Privacy Policy - EditCompressImage.com',
    6   description: 'Read the Privacy Policy for EditCompressImage.com to understand how we handle your data and protect your privacy when you use our free online image tools.',
    7 };
    8
    9 export default function PrivacyPolicyPage() {
   10   return (
   11     <div className="bg-gray-50 min-h-screen flex flex-col">
   12       <header className="bg-white shadow-sm">
   13         <div className="container mx-auto px-4 py-6 flex justify-between items-center">
   14           <Link href="/" className="text-3xl font-bold text-gray-800">editcompressimage.com</Link>
   15           <nav>
   16             <Link href="/" className="text-blue-600 hover:underline">Back to Tools</Link>
   17           </nav>
   18         </div>
   19       </header>
   20
   21       <main className="flex-grow container mx-auto px-4 py-8">
   22         <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
   23           <h1 className="text-3xl font-bold mb-4">Privacy Policy for EditCompressImage.com</h1>
   24           <p className="text-sm text-gray-500 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>
   25
   26           <div className="space-y-4 text-gray-700">
   27             <p>
   28               Welcome to EditCompressImage.com. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information when
      you visit our website.
   29             </p>
   30
   31             <h2 className="text-2xl font-semibold pt-4">1. Information We Collect</h2>
   32             <p>
   33               <strong>Uploaded Files:</strong> We temporarily store the images you upload to perform the requested service (e.g., compression, resizing). We do not access, view,
      or share your files with any third parties.
   34             </p>
   35             <p>
   36               <strong>Usage Data:</strong> We may collect non-personal information about your visit, such as the pages you view and the tools you use. This helps us improve our
      website and services. This data is anonymous and not linked to you personally.
   37             </p>
   38
   39             <h2 className="text-2xl font-semibold pt-4">2. How We Use Your Information</h2>
   40             <p>
   41               The primary use of your uploaded files is to provide the image processing service you requested. The files are processed automatically by our servers.
   42             </p>
   43
   44             <h2 className="text-2xl font-semibold pt-4">3. Data Retention and Deletion</h2>
   45             <p>
   46               <strong>We respect your data.</strong> All uploaded images and their processed versions are automatically and permanently deleted from our servers after a short
      period (typically 1-2 hours) to ensure your privacy. We do not keep backups of your files.
   47             </p>
   48
   49             <h2 className="text-2xl font-semibold pt-4">4. Third-Party Services (Google AdSense)</h2>
   50             <p>
   51               We use Google AdSense to display ads on our website. Google may use cookies or web beacons to collect data in the ad serving process. This is used to show relevant
      ads based on your prior visits to this and other websites.
   52             </p>
   53             <p>
   54               You can opt out of personalized advertising by visiting Google's <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"
      className="text-blue-600 hover:underline">Ads Settings</a>.
   55             </p>
   56
   57             <h2 className="text-2xl font-semibold pt-4">5. Security</h2>
   58             <p>
   59               We use secure protocols (HTTPS) to protect data transmitted to and from our website. While we take reasonable measures to protect your information, no method of
      transmission over the Internet is 100% secure.
   60             </p>
   61
   62             <h2 className="text-2xl font-semibold pt-4">6. Changes to This Privacy Policy</h2>
   63             <p>
   64               We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
   65             </p>
   66
   67             <h2 className="text-2xl font-semibold pt-4">7. Contact Us</h2>
   68             <p>
   69               If you have any questions or concerns about this Privacy Policy, please contact us at:
   70               <a href="mailto:support@editcompressimage.com" className="text-blue-600 hover:underline ml-2">support@editcompressimage.com</a>
   71             </p>
   72           </div>
   73         </div>
   74       </main>
   75
   76       <footer className="bg-white mt-12 py-6">
   77         <div className="container mx-auto px-4 text-center text-gray-600">
   78           <p>&copy; {new Date().getFullYear()} editcompressimage.com. All rights reserved.</p>
   79           <div className="mt-4">
   80             <Link href="/privacy-policy" className="text-blue-600 hover:underline mx-2">Privacy Policy</Link>
   81             <Link href="/terms-and-conditions" className="text-blue-600 hover:underline mx-2">Terms and Conditions</Link>
   82             <a href="mailto:support@editcompressimage.com" className="text-blue-600 hover:underline mx-2">Contact Support</a>
   83           </div>
   84         </div>
   85       </footer>
   86     </div>
   87   );
   88 }
