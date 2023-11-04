import { ReactNode, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { useAuthUser, useToggle } from '@app/hooks';

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const { pathname, push } = useRouter();
  const [isReady, setIsReady] = useToggle(false);
  const { isLoading, data } = useAuthUser();

  useEffect(() => {
    1;
    if (!isLoading) {
      if (!data && !pathname.startsWith('/auth')) {
        push('/auth/login').then(() => {
          setIsReady(true);
        });
      } else {
        setIsReady(true);
      }
    }
  }, [pathname, isLoading]);

  // wait for app to load the auth state
  if (isLoading || !isReady) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="w-16 h-16 border-4 rounded-full">
          Loading............
        </div>
      </div>
    );
  }
  return children as JSX.Element;
};
