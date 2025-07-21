import React from 'react';

// Definisikan tipe untuk props komponen
interface RenderHTMLProps {
  htmlString: string;
  className?: string; // Opsional, untuk menambahkan class dari luar
}

/**
 * Komponen untuk merender string HTML secara aman di React.
 * Komponen ini menggunakan dangerouslySetInnerHTML.
 * Pastikan htmlString yang dimasukkan sudah dibersihkan (sanitized) di backend.
 *
 * @param {RenderHTMLProps} props - Props komponen.
 * @returns {JSX.Element}
 */
const RenderHTML: React.FC<RenderHTMLProps> = ({ htmlString, className }) => {
  // Buat objek yang dibutuhkan oleh dangerouslySetInnerHTML
  const createMarkup = () => {
    return { __html: htmlString };
  };

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={createMarkup()}
    />
  );
};

export default RenderHTML;
