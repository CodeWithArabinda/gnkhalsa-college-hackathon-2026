import * as pdfjsLib from 'pdfjs-dist';

// Configure CDN worker to avoid Vite worker bundle conflicts
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;

/**
 * Extracts raw text content from an uploaded PDF file in browser memory.
 * @param {File|Blob} file 
 * @returns {Promise<string>} Extracted text string
 */
export async function extractTextFromPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      fullText += strings.join(' ') + '\n';
    }

    return fullText.trim();
  } catch (err) {
    console.warn('pdfjs-dist text extraction warning:', err);
    return '';
  }
}
