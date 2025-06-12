import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';  

const LoginScreen = () => {
  const navigation = useNavigation();  

  const [selectedRole, setSelectedRole] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Please sign in to your registered account</Text>
{/* 
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setSelectedRole('jobSeeker')}
          activeOpacity={0.7}
        >
          <View style={[styles.radioCircle, selectedRole === 'jobSeeker' && styles.selectedRadio]} />
          <Text style={styles.radioLabel}>Job Seekers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setSelectedRole('employer')}
          activeOpacity={0.7}
        >
          <View style={[styles.radioCircle, selectedRole === 'employer' && styles.selectedRadio]} />
          <Text style={styles.radioLabel}>Employers/Recruiters</Text>
        </TouchableOpacity>
      </View> */}

      <TextInput
        placeholder="Username"
        style={styles.input}
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          style={styles.passwordInput}
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            name={passwordVisible ? 'eye' : 'eye-slash'}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
  style={styles.loginButton}
  onPress={() => navigation.navigate('Drawer', { screen: 'HomePage' })}

>
  <Text style={styles.loginText}>LOGIN</Text>
</TouchableOpacity>


      <Text style={styles.forgotPassword}>
        Forgot your password? <Text style={styles.reset}>Reset here</Text>
      </Text>

      <Text style={styles.or}>- - - - - - - - - Or sign in with - - - - - - - - -</Text>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="google" size={20} color="#DB4437" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => navigation.navigate('Register')} // ✅ Navigation works now
      >
        <Text style={styles.createAccountText}>CREATE ACCOUNT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 30,
    color: '#3A17CC',
  },
  subtitle: {
    color: '#555',
    marginBottom: 20,
    marginTop: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    color: '#000',
    backgroundColor: '#F9F9F9',
    marginTop: 15,
  },
  passwordContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#F9F9F9',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#8A2BE2',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  forgotPassword: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#0000EE',
  },
  reset: {
    color: '#0000EE',
  },
  or: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#AAA',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 30,
    width: 100,
    alignItems: 'center',
  },
  createAccountButton: {
    backgroundColor: '#D6A8E9',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  createAccountText: {
    color: '#8A2BE2',
    fontWeight: 'bold',
  },
});


export default LoginScreen;
