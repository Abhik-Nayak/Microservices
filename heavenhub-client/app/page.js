'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      router.push('/auth/signup');
    }
  }, [user, router]);

  if (!user) return null; // Or a loading spinner

  return (
    <div>Welcome to the protected page!</div>
  );
};

export default Page;
