import * as React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Main from './Navigations/Main';
import Auth from './Navigations/Auth';
import {useColorScheme} from 'nativewind';

function App() {
  const [isLogin, setIsLogin] = React.useState(false);
  const scheme = useColorScheme();

  return (
    <NavigationContainer
      theme={scheme.colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {isLogin ? <Main /> : <Auth />}
    </NavigationContainer>
  );
}

export default App;

// 44:45
