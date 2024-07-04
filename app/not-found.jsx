import { Suspense } from 'react';

const Custom404 = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      </div>
    </Suspense>
  );
};

export default Custom404;
