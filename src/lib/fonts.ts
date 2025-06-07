import localFont from 'next/font/local';

// Local font files (fallback)
export const geistSans = localFont({
  src: [
    {
      path: '../../public/fonts/geist-sans-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/geist-sans-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/geist-sans-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geist-sans',
  display: 'swap',
});

export const geistMono = localFont({
  src: [
    {
      path: '../../public/fonts/geist-mono-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/geist-mono-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/geist-mono-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
});
