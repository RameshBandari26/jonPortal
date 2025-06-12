import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function UpdateProfileScreen({ navigation }) {
  const [name, setName] = useState('John Doe');
  const [graduation, setGraduation] = useState('B.Tech CSE');
  const [gender, setGender] = useState('Male');
  const [location, setLocation] = useState('Hyderabad');
  const [email, setEmail] = useState('john@example.com');
  const [phone, setPhone] = useState('9876543210');
  const [experiences, setExperiences] = useState('2 Years');
  const [ctc, setCtc] = useState('5 LPA');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Update Profile</Text>

      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
        style={styles.avatar}
      />
      <TouchableOpacity style={styles.uploadBtn}>
        <Text style={styles.uploadText}>Change Profile Picture</Text>
      </TouchableOpacity>

      {/* Basic Details Card */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Edit Basic Details', {
          experiences,
          location,
          ctc,
        })}
      >
        <Text style={styles.sectionTitle}>Basic Details</Text>
        <Text style={styles.previewText}>Experiences: {experiences}</Text>
        <Text style={styles.previewText}>Location: {location}</Text>
        <Text style={styles.previewText}>CTC: {ctc}</Text>
      </TouchableOpacity>
       <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Edit Professional Details', {
          experiences,
          location,
          ctc,
        })}
      >
        <Text style={styles.sectionTitle}>Professional </Text>
        <Text style={styles.previewText}>Current industry : {experiences}</Text>
        <Text style={styles.previewText}>Dept: {location}</Text>
        <Text style={styles.previewText}>Designation: {ctc}</Text>
      </TouchableOpacity>
       <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Edit Employment Details', {
          experiences,
          location,
          ctc,
        })}
      >
        <Text style={styles.sectionTitle}>Employment </Text>
        <Text style={styles.previewText}>Is this current company: {experiences}</Text>
        <Text style={styles.previewText}>Add calander for company: {experiences}</Text>
        <Text style={styles.previewText}>Job title: {location}</Text>
        <Text style={styles.previewText}>Current salary: -fixed pay -fixed +pay{ctc}</Text>
      </TouchableOpacity>
       <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Edit Skills Details', {
          experiences,
          location,
          ctc,
        })}
      >
        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.previewText}>Experiences: {experiences}</Text>
        <Text style={styles.previewText}>Location: {location}</Text>
        <Text style={styles.previewText}>CTC: {ctc}</Text>
      </TouchableOpacity>
      
       <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Edit Roles and responsibilities Details', {
          experiences,
          location,
          ctc,
        })}
      >
        <Text style={styles.sectionTitle}>Roles and responsibilities</Text>
        <Text style={styles.previewText}>Experiences: {experiences}</Text>
        <Text style={styles.previewText}>Location: {location}</Text>
        <Text style={styles.previewText}>CTC: {ctc}</Text>
      </TouchableOpacity>
       <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Edit Education Details', {
          experiences,
          location,
          ctc,
        })}
      >
        <Text style={styles.sectionTitle}>Education</Text>
        <Text style={styles.previewText}>Experiences: {experiences}</Text>
        <Text style={styles.previewText}>Location: {location}</Text>
        <Text style={styles.previewText}>CTC: {ctc}</Text>
      </TouchableOpacity>
       <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Edit Personal Details', {
          experiences,
          location,
          ctc,
        })}
      >
        <Text style={styles.sectionTitle}>Personal details</Text>
        <Text style={styles.previewText}>Address: {experiences}</Text>
        <Text style={styles.previewText}>Disable: {location}</Text>
        <Text style={styles.previewText}>Languages: {ctc}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  uploadBtn: {
    marginBottom: 20,
  },
  uploadText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    marginVertical: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  previewText: {
    color: '#555',
    fontSize: 14,
    marginTop: 4,
  },
});
