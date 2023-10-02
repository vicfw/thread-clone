import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootStackScreenProps} from '../../types';
import {MyButton} from '../components/ui/Button/Button';
// import {loadUser, loginUser} from '../../redux/actions/userAction';
// import {useDispatch, useSelector} from 'react-redux';

const LoginScreen = ({navigation}: RootStackScreenProps<'Login'>) => {
  // const {error, isAuthenticated} = useSelector((state: any) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const dispatch = useDispatch();
  const submitHandler = (e: any) => {
    // loginUser(email, password)(dispatch);
  };

  // useEffect(() => {
  //   if (error) {
  //     if (Platform.OS === 'android') {
  //       ToastAndroid.show(
  //         'Email and password not matching!',
  //         ToastAndroid.LONG,
  //       );
  //     } else {
  //       Alert.alert('Email and password not matching!');
  //     }
  //   }
  //   if (isAuthenticated) {
  //     loadUser()(dispatch);
  //     if (Platform.OS === 'android') {
  //       ToastAndroid.show('Login successful!', ToastAndroid.LONG);
  //     } else {
  //       Alert.alert('Login successful!');
  //     }
  //   }
  // }, [isAuthenticated, error]);

  return (
    <View className="flex-[1] items-center justify-center">
      <View className="w-[70%]">
        <Text className="text-[25px] font-[600] text-center text-black">
          Login
        </Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          placeholderTextColor={'#000'}
          onChangeText={text => setEmail(text)}
          cursorColor="#000"
          className="w-full p-1 border border-[#00000072] px-2 my-1 text-black rounded-lg"
        />
        <TextInput
          placeholder="Enter your password"
          className="w-full p-1 border border-[#00000072] px-2 my-1 text-black rounded-lg"
          cursorColor="#000"
          value={password}
          placeholderTextColor={'#000'}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <MyButton variant="primary" onPress={submitHandler} className="mt-2">
          Login
        </MyButton>
        <Text
          className="pt-3 text-black"
          onPress={() => navigation.navigate('Signup')}>
          Don't have any account? <Text>Sign up</Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
