import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react';
import CustomAlert from '../CustomAlert';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


import Icon from 'react-native-vector-icons/Ionicons';
import { signIn } from '../../const/Signin';
import { WEB_CLIENT_ID,IOS_CLIENT_ID } from '../../const/key';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
  iosClientId: 'IOS_CLIENT_ID', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isExperienced, setIsExperienced] = useState(true);
  const [checked, setChecked] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const handleRegister = async () => {
    try {
      const res = await fetch('http://192.168.168.231:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          password,
          mobileNumber,
          isExperienced,
          wantsEmailUpdates: checked,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlertTitle('Success');
        setAlertMessage(data.message);
        setAlertType('success');
        setAlertVisible(true);
      } else {
        setAlertTitle('Error');
        setAlertMessage(data.message || 'Registration failed');
        setAlertType('error');
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertTitle('Error');
      setAlertMessage('Something went wrong. Please try again.');
      setAlertType('error');
      setAlertVisible(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        {/* Logo */}{/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backButton}>
              <Icon name="arrow-back" size={24} color="#000" />
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Talent96</Text>
        </View>

        <View style={styles.separatorLine} />
        {/* Form Title */}
        <Text style={styles.heading}>Create your profile</Text>
        <Text style={styles.subheading}>please fill the Registration form below</Text>

        {/* Form Fields */}
        <Text style={styles.label}>Full name</Text>
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#888"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />

        <Text style={styles.label}>Email ID</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="(Minimum 6 Characters)"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        {/* Google Login Separator */}
        <Text style={styles.separator}> ------------  or  ----------- </Text>
        <TouchableOpacity style={styles.googleButton}>
          {/* <Icon name="logo-google" size={24} color="#4169E1" style={{ marginRight: 10 }} />
                    <Text style={styles.googleButtonText}>Google</Text> */}
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            disabled={false}
          />

        </TouchableOpacity>

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          placeholder="+91 Enter your mobile number"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          style={styles.input}
        />

        {/* Work Status */}
        <Text style={styles.label}>Work Status</Text>
        <View style={styles.statusContainer}>
          <TouchableOpacity
            style={[styles.statusButton, isExperienced && styles.selectedStatus]}
            onPress={() => setIsExperienced(true)}
          >
            <Text>I'm experienced</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusButton, !isExperienced && styles.selectedStatus]}
            onPress={() => setIsExperienced(false)}
          >
            <Text style={{ textAlign: 'center' }}>
              I'm fresher{'\n'}(Eager to Contribute)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Checkbox */}
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={checked}
            onValueChange={setChecked}
            tintColors={{ true: '#3CB371', false: '#bbb' }}
          />
          <Text style={styles.checkboxLabel}>Send important updates via email</Text>
        </View>

        <Text style={styles.terms}>
          By clicking Register, you agree to the Terms and Conditions & Privacy Policy of Talent96
        </Text>

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register Now</Text>
        </TouchableOpacity>

        {/* Custom Alert */}
        <CustomAlert
          visible={alertVisible}
          title={alertTitle}
          message={alertMessage}
          type={alertType}
          onClose={() => {
            setAlertVisible(false);
            if (alertType === 'success') {
              navigation.navigate('Login');
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subheading: {
    marginBottom: 10,
    color: '#666',
  },
  label: {
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  separator: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#666',
  },
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: '#fff',
    marginBottom: 1,
  },
  googleIcon: {
    width: 30,
    height: 30,
    marginRight: 2,
  },
  googleButtonText: {
    fontWeight: '600',
    color: '#4169E1',
    fontSize: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  statusButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  selectedStatus: {
    borderColor: '#6200ee',
    backgroundColor: '#e6ddff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: '#6200ee',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  terms: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
  },
});
