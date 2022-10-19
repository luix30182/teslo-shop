import Head from 'next/head';
import React, { FC } from 'react';
import { Navbar } from '../ui';

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: React.ReactNode;
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {imageFullUrl && <meta name="og:iamge" content={imageFullUrl} />}
      </Head>
      <Navbar />
      <main
        style={{
          margin: '80px auto',
          maxWidth: '1440px',
          padding: '0 30px'
        }}
      >
        {children}
      </main>
      <footer></footer>
    </>
  );
};
