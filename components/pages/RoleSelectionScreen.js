import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RoleSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo and App Name */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>J</Text>
        </View>
        <Text style={styles.appName}>Talent96</Text>
        <Text style={styles.appDesc}>Job Portal iOS App</Text>
      </View>

      {/* Subtitle */}
      <Text style={styles.continueAs}>Continue as</Text>
      <Text style={styles.subText}>
        Please select your role to proceed with the app
      </Text>

      {/* Role Selection Cards */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Login', { role: 'jobSeeker' })}
        >
          <View>
            <Text style={styles.cardTitle}>Job Seeker</Text>
            <Text style={styles.cardDesc}>
              Finding a job here has never been easier
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Login', { role: 'employer' })} // ✅ EMPLOYER role
        >
          <View>
            <Text style={styles.cardTitle}>Employer</Text>
            <Text style={styles.cardDesc}>
              Recruit great candidates faster and easier
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RoleSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F8F3FF',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#5A1EFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  appDesc: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
  },
  continueAs: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#000',
  },
  subText: {
    color: '#888',
    fontSize: 14,
    marginBottom: 30,
  },
  cardContainer: {
    gap: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5A1EFF',
  },
  cardDesc: {
    color: '#444',
    fontSize: 12,
    marginTop: 4,
  },
});
