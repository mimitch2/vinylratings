import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import fetch from 'cross-fetch';
import { setContext } from '@apollo/client/link/context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const authLink = setContext(async (_, { headers }) => {
  return {
      headers: {
          ...headers,
          authorization: `Bearer {"username":"eyJhbGciOiJIUzI1NiJ9.bWltaXRjaA.cqHFesLmzh1Bw1inSQ2pXg3jbx8Wk3qgRHwNj5UekPM","token":"eyJhbGciOiJIUzI1NiJ9.ZWdZbnpoQ1RkV2tjb3ZTcXRidk50ZXhoWk56TnlhaW94Q09GQ2hLWg.inqF_0Y1TN5zXee0dpppbrwp-5wPGo7rR917xi6mumQ","secret":"eyJhbGciOiJIUzI1NiJ9.cGpxcE9MRExockF4eWJ2ekJiSGJsaWdVbFpIeXJvT0l2amJTR0h1Vw.OLt6TKklMdiqplJhJMTd-K05F0EjfVycOyAI2X_Fs54"}`
      }
  };
});

const httpLink = createHttpLink({
  uri: `http://localhost:8080/graphql`,
  fetch
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});



export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Navigation colorScheme={colorScheme} />
        </ApolloProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
