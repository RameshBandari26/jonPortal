import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const BASE_URL = 'http://192.168.168.231:5000/api';

const EditEmailMobileVerify = ({ route, navigation }) => {
  const { type, currentValue } = route.params;
  const [value, setValue] = useState(currentValue);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const inputRefs = useRef([]);
  const interval = useRef(null);

  const formattedTime = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`;

  useEffect(() => {
    return () => clearInterval(interval.current);
  }, []);

  const startTimer = () => {
    setTimer(180); // 3 minutes
    interval.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/send-${type}-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [type]: value }),
      });
      const data = await res.json();
      if (data.success) {
        Alert.alert('OTP Sent', `OTP sent to your ${type}`);
        startTimer();
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error');
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      return Alert.alert('Invalid OTP', 'Please enter all 6 digits.');
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/verify-${type}-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [type]: value, otp: fullOtp }),
      });
      const data = await res.json();
      if (data.success) {
        Alert.alert('Verified', `${type} successfully verified`);
        navigation.goBack();
      } else {
        Alert.alert('Invalid OTP', data.message || 'Verification failed');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error');
    }
    setLoading(false);
  };

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 20 }}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.label}>Edit {type === 'email' ? 'Email' : 'Mobile Number'}</Text>

      <View style={styles.rowInput}>
        <TextInput
          style={styles.inputInline}
          value={value}
          onChangeText={setValue}
          placeholder={type === 'email' ? 'Enter new email' : 'Enter new phone number'}
          keyboardType={type === 'email' ? 'email-address' : 'phone-pad'}
        />
        <TouchableOpacity onPress={sendOtp} style={styles.otpButton} disabled={loading || timer > 0}>
          <Text style={styles.otpButtonText}>{loading ? '...' : timer > 0 ? formattedTime : 'Send OTP'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleOtpChange(text, index)}
            ref={ref => (inputRefs.current[index] = ref)}
          />
        ))}
      </View>

      {timer > 0 && <Text style={styles.timerText}>OTP expires in {formattedTime}</Text>}

      <TouchableOpacity onPress={verifyOtp} style={styles.button} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditEmailMobileVerify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  rowInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputInline: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginRight: 8,
  },
  otpButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  otpButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  otpInput: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
  },
  timerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4444',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
