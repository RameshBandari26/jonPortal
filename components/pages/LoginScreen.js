// import { useNavigation, useRoute } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const BASE_URL = 'http://192.168.30.231:5000/api/auth';

// const LoginScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [role, setRole] = useState(null);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');

//   useEffect(() => {
//     if (route.params?.role) {
//       setRole(route.params.role);
//     }
//   }, [route.params]);

// const handleLogin = async () => {
//   if (!email || !password) {
//     Alert.alert('Error', 'Please enter both email and password');
//     return;
//   }

//   try {
//     const res = await fetch(`${BASE_URL}/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password, role }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       Alert.alert('Success', 'Login successful');

//       // Redirect based on user role
//       if (role === 'employer') {
//         navigation.navigate('RecruiterHomePage');
//       } else {
//         navigation.navigate('Drawer', { screen: 'HomePage', role });
//       }
//     } else {
//       Alert.alert('Login Failed', data.message || 'Invalid credentials');
//     }
//   } catch (err) {
//     Alert.alert('Error', 'Network error, try again');
//   }
// };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign In</Text>
//       <Text style={styles.subtitle}>
//         Please sign in to your {role === 'employer' ? 'employer' : 'job seeker'} account
//       </Text>

//       <TextInput
//         placeholder="Email"
//         style={styles.input}
//         placeholderTextColor="#666"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <View style={styles.passwordContainer}>
//         <TextInput
//           placeholder="Password"
//           secureTextEntry={!passwordVisible}
//           style={styles.passwordInput}
//           placeholderTextColor="#666"
//           value={password}
//           onChangeText={setPassword}
//         />
//         <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
//           <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="#888" />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//         <Text style={styles.loginText}>LOGIN</Text>
//       </TouchableOpacity>

//       <Text style={styles.forgotPassword}>
//         Forgot your password? <Text style={styles.reset}>Reset here</Text>
//       </Text>

//       <Text style={styles.or}>- - - Or sign in with - - -</Text>

//       <View style={styles.socialRow}>
//         <TouchableOpacity style={styles.socialButton}>
//           <Icon name="google" size={20} color="#DB4437" />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         style={styles.createAccountButton}
//         onPress={() => navigation.navigate('Register', { role })}
//       >
//         <Text style={styles.createAccountText}>CREATE ACCOUNT</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#FFFFFF' },
//   title: { fontSize: 26, fontWeight: 'bold', marginTop: 30, color: '#3A17CC' },
//   subtitle: { color: '#555', marginBottom: 20, marginTop: 30 },
//   input: {
//     height: 50, borderWidth: 1, borderColor: '#CCC', borderRadius: 25,
//     paddingHorizontal: 20, marginBottom: 15, color: '#000', backgroundColor: '#F9F9F9', marginTop: 15,
//   },
//   passwordContainer: {
//     height: 50, flexDirection: 'row', alignItems: 'center',
//     borderWidth: 1, borderColor: '#CCC', borderRadius: 25,
//     paddingHorizontal: 20, backgroundColor: '#F9F9F9', marginBottom: 15,
//   },
//   passwordInput: { flex: 1, color: '#000' },
//   loginButton: {
//     backgroundColor: '#8A2BE2', padding: 15, borderRadius: 30,
//     alignItems: 'center', marginBottom: 10,
//   },
//   loginText: { color: '#FFF', fontWeight: 'bold' },
//   forgotPassword: { textAlign: 'center', marginBottom: 10, color: '#0000EE' },
//   reset: { color: '#0000EE' },
//   or: { textAlign: 'center', marginVertical: 10, color: '#AAA' },
//   socialRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
//   socialButton: {
//     backgroundColor: '#F0F0F0', padding: 15, borderRadius: 30,
//     width: 100, alignItems: 'center',
//   },
//   createAccountButton: {
//     backgroundColor: '#D6A8E9', padding: 15, borderRadius: 30,
//     alignItems: 'center',
//   },
//   createAccountText: { color: '#8A2BE2', fontWeight: 'bold' },
// });

// export default LoginScreen;


import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BASE_URL = 'http://192.168.30.231:5000/api/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [role, setRole] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (route.params?.role) {
      setRole(route.params.role);
    }
  }, [route.params]);

const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please enter both email and password');
    return;
  }

  setLoading(true); // ✅ Start loading

  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password, role }),
    });

    const data = await res.json();
    console.log('Login response:', data);

    if (res.ok && data.token && data.user?.id) {
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('userId', data.user.id);

      Alert.alert('Success', 'Login successful');

      if (role === 'employer') {
        navigation.navigate('RecruiterHomePage');
      } else {
        navigation.navigate('Drawer', { screen: 'HomePage', role });
      }
    } else {
      Alert.alert('Login Failed', data.message || 'Invalid credentials');
    }
  } catch (err) {
    console.error('Login error:', err);
    Alert.alert('Error', 'Network error, try again');
  } finally {
    setLoading(false); // ✅ Stop loading
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>
        Please sign in to your {role === 'employer' ? 'employer' : 'job seeker'} account
      </Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
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
          <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
  <Text style={styles.loginText}>{loading ? 'Logging in...' : 'LOGIN'}</Text>
</TouchableOpacity>

      <Text style={styles.forgotPassword}>
        Forgot your password? <Text style={styles.reset}>Reset here</Text>
      </Text>

      <Text style={styles.or}>- - - Or sign in with - - -</Text>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="google" size={20} color="#DB4437" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => navigation.navigate('Register', { role })}
      >
        <Text style={styles.createAccountText}>CREATE ACCOUNT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFFFFF' },
  title: { fontSize: 26, fontWeight: 'bold', marginTop: 30, color: '#3A17CC' },
  subtitle: { color: '#555', marginBottom: 20, marginTop: 30 },
  input: {
    height: 50, borderWidth: 1, borderColor: '#CCC', borderRadius: 25,
    paddingHorizontal: 20, marginBottom: 15, color: '#000', backgroundColor: '#F9F9F9', marginTop: 15,
  },
  passwordContainer: {
    height: 50, flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#CCC', borderRadius: 25,
    paddingHorizontal: 20, backgroundColor: '#F9F9F9', marginBottom: 15,
  },
  passwordInput: { flex: 1, color: '#000' },
  loginButton: {
    backgroundColor: '#8A2BE2', padding: 15, borderRadius: 30,
    alignItems: 'center', marginBottom: 10,
  },
  loginText: { color: '#FFF', fontWeight: 'bold' },
  forgotPassword: { textAlign: 'center', marginBottom: 10, color: '#0000EE' },
  reset: { color: '#0000EE' },
  or: { textAlign: 'center', marginVertical: 10, color: '#AAA' },
  socialRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  socialButton: {
    backgroundColor: '#F0F0F0', padding: 15, borderRadius: 30,
    width: 100, alignItems: 'center',
  },
  createAccountButton: {
    backgroundColor: '#D6A8E9', padding: 15, borderRadius: 30,
    alignItems: 'center',
  },
  createAccountText: { color: '#8A2BE2', fontWeight: 'bold' },
});

export default LoginScreen;
