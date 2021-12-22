import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import Toast from '../components/global/Toast';
import { useEffect, useRef, useState } from 'react';
import { ToastContext } from '../utils';
import { useFirebaseAuthSetup, FirebaseAuthContext } from '../hooks/useFirebaseAuth';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [toastText, setToastText] = useState('');

  const clearToast = () => {
    setToastText('');
    clearTimeout(timeout.current);
  };

  const timeout = useRef<number>();
  useEffect(() => {
    if (!!toastText) {
      timeout.current = window.setTimeout(clearToast, 5000);
    }
  }, [toastText]);

  const fbAuth = useFirebaseAuthSetup();

  return <QueryClientProvider client={queryClient}>
    <FirebaseAuthContext.Provider value={fbAuth}>
      <ToastContext.Provider value={{ showToast: setToastText }}>
        <Component {...pageProps} />
        {!!toastText && <Toast text={toastText} onClick={clearToast} />}
      </ToastContext.Provider>
    </FirebaseAuthContext.Provider>
  </QueryClientProvider>
}

export default MyApp
