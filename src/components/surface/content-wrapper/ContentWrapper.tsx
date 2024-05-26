import React from 'react';

interface ContentWrapperProps {
  children: React.ReactNode;
}

export const ContentWrapper = ({ children }: Readonly<ContentWrapperProps>) => {
  return <div className="mx-auto w-full max-w-screen-lg">{children}</div>;
};
