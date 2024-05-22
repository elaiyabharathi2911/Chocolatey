import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Pressable} from 'react-native';
import IMAGES from '../../asset/image';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { PutAuthToken } from '../../services/AsyncStorage';
import { DispatchActionType, useAppBaseContext } from '../../context/AppBaseContext';

const LoginPage = ({navigation}) => {
  const {state, dispatch} = useAppBaseContext();
GoogleSignin.configure({
  androidClientId:
    '826926305013-k8ah49g75ls5jbkjvsaebgd73ccrofts.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  offlineAccess: true,
  webClientId:
    '826926305013-odnmlbp2fk3t8q4cossba8gdb2tki6mm.apps.googleusercontent.com',
});

const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};
const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await GoogleLogin();
      console.log('object', response);
      const {idToken, user} = response;
      PutAuthToken(idToken);
      if (idToken) {
        
        
        dispatch({ type: DispatchActionType.LogedInUser });
        const resp = await authAPI.validateToken({
          token: idToken,
          email: user.email,
        });
        await handlePostLoginData(resp.data);
      
      }
      console.log("first",response?.data)
    } catch (apiError) {
      setError(
        apiError?.response?.data?.error?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  async function handleGoogleLogout() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Perform additional cleanup and logout operations.
    } catch (error) {
      console.log('Google Sign-Out Error: ', error);
    }
  }

  return (
    <View style={styles.rootContainer}>
     <Text style={styles.title}>Chocolatey App</Text>
      <TouchableOpacity
        style={styles.container}

        onPress={handleGoogleLogin}>
        <Image source={IMAGES.google} style={styles.logoStyle} />
        <Text>Signin with google</Text>
      </TouchableOpacity>
      <Pressable onPress={handleGoogleLogout}>
        <Text>Sign out</Text>
      </Pressable>
    </View>

  );
};

export default LoginPage;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff',
   justifyContent: 'center',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:"center"
  },
  container: {
    borderRadius: 4,
    borderWidth: 1,
    marginHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoStyle: {
    width: 40,
    height: 40,
  },
});
