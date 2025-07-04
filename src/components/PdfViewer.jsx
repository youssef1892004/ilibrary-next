// src/components/PdfViewer.jsx
"use client";

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// تحديد مسار worker لـ pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


export default function PdfViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1); // ابدأ دائمًا من الصفحة الأولى
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="border shadow-lg">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>

      <div className="flex items-center justify-center mt-4 space-x-4">
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
          className="px-4 py-2 bg-gray-600 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
          className="px-4 py-2 bg-gray-600 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}