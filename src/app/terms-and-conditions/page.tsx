
    1 import Link from 'next/link';
    2 import type { Metadata } from 'next';
    3
    4 export const metadata: Metadata = {
    5   title: 'Terms and Conditions - EditCompressImage.com',
    6   description: 'Read the Terms and Conditions for using the free online image tools on EditCompressImage.com.',
    7 };
    8
    9 export default function TermsAndConditionsPage() {
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
   23           <h1 className="text-3xl font-bold mb-4">Terms and Conditions for EditCompressImage.com</h1>
   24           <p className="text-sm text-gray-500 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>
   25
   26           <div className="space-y-4 text-gray-700">
   27             <p>
   28               Please read these Terms and Conditions ("Terms") carefully before using the https://editcompressimage.com website (the "Service") operated by EditCompressImage.com
      ("us", "we", or "our").
   29             </p>
   30             <p>
   31               Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others
      who access or use the Service.
   32             </p>
   33
   34             <h2 className="text-2xl font-semibold pt-4">1. Description of Service</h2>
   35             <p>
   36               Our Service provides users with a suite of free online tools for editing and converting images. You may use these tools for any personal or commercial purpose,
      provided you comply with these Terms.
   37             </p>
   38
   39             <h2 className="text-2xl font-semibold pt-4">2. User Conduct</h2>
   40             <p>
   41               You agree not to use the Service to upload, process, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar,
      obscene, or otherwise objectionable. You are solely responsible for the content you upload and process through our Service.
   42             </p>
   43             <p>
   44               We do not claim ownership of the files you upload. You retain all rights to your content.
   45             </p>
   46
   47             <h2 className="text-2xl font-semibold pt-4">3. Disclaimer of Warranties</h2>
   48             <p>
   49               The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranty that the Service will meet your requirements, be uninterrupted, timely, secure,
      or error-free. Any use of the Service is done at your own discretion and risk.
   50             </p>
   51
   52             <h2 className="text-2xl font-semibold pt-4">4. Limitation of Liability</h2>
   53             <p>
   54               In no event shall EditCompressImage.com be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or the inability
      to use the Service.
   55             </p>
   56
   57             <h2 className="text-2xl font-semibold pt-4">5. File Deletion Policy</h2>
   58             <p>
   59               To protect your privacy, all files uploaded to our Service, along with their processed results, are automatically and permanently deleted from our servers within a
      few hours. We do not store your files long-term.
   60             </p>
   61
   62             <h2 className="text-2xl font-semibold pt-4">6. Changes to Terms</h2>
   63             <p>
   64               We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of changes by updating the "Last Updated" date
      on this page.
   65             </p>
   66
   67             <h2 className="text-2xl font-semibold pt-4">7. Contact Us</h2>
   68             <p>
   69               If you have any questions about these Terms, please contact us at:
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