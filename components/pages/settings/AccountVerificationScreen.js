import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.30.231:5000/api'; // 🔁 Updated to correct backend IP

const AccountSettingsScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.warn('No token found in AsyncStorage');
          setLoading(false);
          return;
        }

        const response = await fetch(`${BASE_URL}/users/userdata`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // ✅ JWT sent correctly
          },
        });

        const data = await response.json();
        console.log('Fetched user data:', data);

        if (response.ok) {
          setEmail(data.email || '');
          setPhone(data.mobileNumber || '');
          setEmailVerified(data.emailVerified || false);
          setMobileVerified(data.mobileVerified || false);
        } else {
          console.warn('Failed to fetch user:', data.message);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const renderField = (label, value, verified, fieldType) => (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.subtext}>
        {fieldType === 'email'
          ? 'Recruiters will reach you on this email'
          : 'Recruiters may reach out to you regarding jobs on this number'}
      </Text>
      <View style={styles.row}>
        <Text style={styles.infoText}>{value}</Text>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            navigation.navigate('EditEmailMobileVerify', {
              type: fieldType,
              currentValue: value,
              verified: verified,
            });
          }}>
          {verified ? (
            <View style={styles.verifyWrapper}>
              
            <Icon name="edit-2" size={18} color="#666" style={styles.editIcon} />
            <TouchableOpacity><Icon name="check-circle" size={22} color="green" /></TouchableOpacity>
            
            </View>
          ) : (
            <View style={styles.verifyWrapper}>
              <Text style={styles.verifyText}>Verify</Text>
              <Icon name="arrow-right" size={16} color="#007bff" />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <View style={styles.hr} />
        <Text style={styles.heading}>Account</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <>
            {renderField('Email', email, emailVerified, 'email')}
            {renderField('Mobile Number', phone, mobileVerified, 'phone')}

            <TouchableOpacity style={styles.passwordRow}>
              <Text style={styles.label}>Password</Text>
              <Text style={styles.linkText}>Change password</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AccountSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  hr: {
  height: 1,
  backgroundColor: '#f5f5f5',
  width: '100%',
  marginTop: 20,
},
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 16,
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
  editIcon: {
    marginRight: 8,
    paddingRight: 10,
    color: '#666',

  },
  verifyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifyText: {
    color: '#007bff',
    fontWeight: 'bold',
    marginRight: 4,
  },
});
