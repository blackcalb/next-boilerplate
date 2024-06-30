import React from 'react';

interface ContentWrapperProps {
  children: React.ReactNode;
}

export const ContentWrapper = ({ children }: Readonly<ContentWrapperProps>) => {
  return (
    <div className="mx-auto w-full max-w-screen-xl p-4 xl:p-10">{children}</div>
  );
};
