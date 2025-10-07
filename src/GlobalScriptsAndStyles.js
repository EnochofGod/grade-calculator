const GlobalScriptsAndStyles = () => (
  <>
    {/* Tailwind CSS Script Tag - MUST be included for styling */}
    <script src="https://cdn.tailwindcss.com"></script>
    <style dangerouslySetInnerHTML={{ __html: `
      /* Sets default font */
      body { font-family: 'Inter', sans-serif; }
      /* Print mode specific styles for a clean PDF/paper output */
      @media print {
        /* Hide everything except the report card container */
        .print-mode > div:first-child > div:first-child { 
             display: none; /* Hides the PageLayout's outer div (header/buttons) */
        } 
        /* Reset container styles for printing */
        .print-mode .report-card-container {
          box-shadow: none !important;
          border-width: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
          width: 100% !important;
        }
        .print-mode .max-w-4xl { max-width: 100% !important; }
        .print-mode .report-card-container * {
          background: white !important;
          color: black !important;
        }
        /* Hide all print buttons */
        .print\\:hidden { display: none !important; }

        /* Ensure main content is visible */
        .print-mode > div:first-child { 
            display: block !important;
        }
        .print-mode .max-w-4xl {
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
        }
        /* Enforce B&W for Minimalist Print template */
        .border-gray-900 * {
            border-color: #333 !important;
        }
      }
    `}} />
  </>
);
export default GlobalScriptsAndStyles;