import {useColorScheme} from 'react-native';

export const useThemeV = () => {
  const theme = useColorScheme();

  return {
    forTailwind: {
      default: theme === 'dark' ? 'white' : 'black',
    },
    textPrimary: {
      main: theme === 'dark' ? '#fff' : '#000',
    },
  };
};
