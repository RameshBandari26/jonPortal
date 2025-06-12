import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const BASE_URL = 'http://192.168.168.231:5000/api'; // Replace with your local IP

const AccountSettingsScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [emailOTP, setEmailOTP] = useState('');
  const [phoneOTP, setPhoneOTP] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate fetching from backend
    const fetchUser = async () => {
      const dummy = {
        email: 'rameshbandari926@gmail.com',
        phone: '8897252685',
        emailVerified: true,
        phoneVerified: true,
      };
      setEmail(dummy.email);
      setPhone(dummy.phone);
      setEmailVerified(dummy.emailVerified);
      setPhoneVerified(dummy.phoneVerified);
    };
    fetchUser();
  }, []);

  const sendOtp = async (type) => {
    setLoading(true);
    const res = await fetch(`${BASE_URL}/send-${type}-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [type]: type === 'email' ? email : phone }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) Alert.alert('OTP Sent', `Check your ${type} for the OTP`);
    else Alert.alert('Error', data.message);
  };

  const verifyOtp = async (type) => {
    const otp = type === 'email' ? emailOTP : phoneOTP;
    const res = await fetch(`${BASE_URL}/verify-${type}-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [type]: type === 'email' ? email : phone, otp }),
    });
    const data = await res.json();
    if (data.success) {
      if (type === 'email') setEmailVerified(true);
      else setPhoneVerified(true);
      setEditingField(null);
      Alert.alert('Verified', `${type} successfully verified`);
    } else Alert.alert('Invalid OTP', data.message);
  };

  const renderField = (label, value, verified, onChange, fieldType) => (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.subtext}>
        {fieldType === 'email'
          ? "Recruiters will reach you on this email"
          : "Recruiters may reach out to you regarding jobs on this number"}
      </Text>

      {editingField === fieldType ? (
        <>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            keyboardType={fieldType === 'phone' ? 'phone-pad' : 'email-address'}
          />
          <View style={styles.row}>
            <TextInput
              placeholder="Enter OTP"
              style={[styles.input, { flex: 1, marginRight: 10 }]}
              value={fieldType === 'email' ? emailOTP : phoneOTP}
              onChangeText={fieldType === 'email' ? setEmailOTP : setPhoneOTP}
              keyboardType="number-pad"
            />
            <TouchableOpacity style={styles.verifyBtn} onPress={() => verifyOtp(fieldType)}>
              <Text style={styles.verifyText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.row}>
          <Text style={styles.infoText}>{value}</Text>
          <TouchableOpacity onPress={() => {
            setEditingField(fieldType);
            if (!verified) sendOtp(fieldType);
          }}>
            <Icon name="edit-2" size={18} color="#666" style={styles.editIcon} />
          </TouchableOpacity>
          {verified && <Icon name="check-circle" size={22} color="green" style={styles.verifiedIcon} />}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} />
      </TouchableOpacity>

      <Text style={styles.heading}>Account</Text>
      {loading ? <ActivityIndicator size="large" color="#007bff" /> : (
        <>
          {renderField('Email', email, emailVerified, setEmail, 'email')}
          {renderField('Mobile Number', phone, phoneVerified, setPhone, 'phone')}

          <TouchableOpacity style={styles.passwordRow}>
            <Text style={styles.label}>Password</Text>
            <Text style={styles.linkText}>Change password</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default AccountSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24, fontWeight: 'bold', marginVertical: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    padding: 15,
    marginBottom: 16,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtext: {
    color: '#777',
    fontSize: 13,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 16,
  },
  editIcon: {
    marginLeft: 10,
  },
  verifiedIcon: {
    marginLeft: 10,
  },
  verifyBtn: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  verifyText: {
    color: 'white',
    fontWeight: 'bold',
  },
  passwordRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
