import '@app/styles/global.css';
import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { AuthProvider } from '@app/contexts';

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  requiresAuth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  if (Component.requiresAuth) {
    return (
      <>
        <NextUIProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              {getLayout(<Component {...pageProps} />)}
              {process.env.NODE_ENV != 'production' && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
            </AuthProvider>
          </QueryClientProvider>
        </NextUIProvider>
      </>
    );
  } else {
    return (
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
          {process.env.NODE_ENV != 'production' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </NextUIProvider>
    );
  }
};

export default App;
