import React from 'react';

const Footer = () => (
  <footer className="h-14 flex justify-center items-center gap-4 text-sm p-4 mt-6">
    <div>
      Geri Bildirim:
      <a
        href="mailto:yardimyeri.info@gmail.com"
        target="_blank"
        rel="noreferrer"
        className="underline text-[#0d6efd]"
      >
        Mail Gönder
      </a>
    </div>
    <div> © 2023 YARDIMYERİ.COM</div>
  </footer>
);

export default Footer;
