import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PostJobs = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    jobTitle: 'Frontend Developer',
    companyName: '',
    companyLogo: '',
    salary: '',
    experienceType: 'Fresher',
    experienceMin: '',
    experienceMax: '',
    location: 'Remote',
    description: '',
    jobType: 'Full-time',
    recruiterEmail: '',
    openings: '', // New field added
  });

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState('');

  const skillsList = ['React', 'React Native', 'JavaScript', 'TypeScript', 'Node.js', 'Redux'];

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 600,
      quality: 0.8,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          handleChange('companyLogo', uri);
        }
      }
    });
  };

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

 const handleSubmit = async () => {
  const experience =
    form.experienceType === 'Experienced'
      ? `${form.experienceMin}-${form.experienceMax} years`
      : 'Fresher';

  try {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId'); // ✅ keep this only
    console.log('userId   hIIIIIIIIIIIII:', userId);

    if (!token || !userId) {
      Alert.alert('Error', 'Authentication error — please log in again.');
      return;
    }

    const jobData = {
      jobTitle: form.jobTitle,
      companyName: form.companyName,
      companyLogo: form.companyLogo || '',
      salary: form.salary,
      experience,
      location: form.location,
      description: form.description,
      jobType: form.jobType,
      remote: form.location === 'Remote',
      skills: selectedSkills,
      recruiterEmail: form.recruiterEmail,
      openings: Number(form.openings),
      applicants: [],
      postedBy: userId, // ✅ This will now be valid
    };

    const response = await fetch('http://192.168.30.231:5000/api/jobs/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobData),
    });

    const result = await response.json();

    if (response.ok) {
      Alert.alert('Success', 'Job post submitted successfully');
      navigation.navigate('RecruiterHomePage');
    } else {
      Alert.alert('Error', result.message || 'Error posting job');
    }
  } catch (err) {
    console.error('❌ Network / fetch error →', err);
    Alert.alert('Error', 'Error submitting job post');
  }
};



  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('RecruiterHomePage')}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.heading}>Post a Job</Text>
      </View>

      {/* Job Title */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Job Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Frontend Developer"
          value={form.jobTitle}
          onChangeText={(text) => handleChange('jobTitle', text)}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Company Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Company Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Infosys"
          value={form.companyName}
          onChangeText={(text) => handleChange('companyName', text)}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Company Logo */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Company Logo (Optional)</Text>
        {form.companyLogo ? (
          <View style={{ marginBottom: 8 }}>
            <Image source={{ uri: form.companyLogo }} style={{ width: 100, height: 100, borderRadius: 8 }} />
          </View>
        ) : null}
        <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
          <Text style={styles.uploadButtonText}>
            {form.companyLogo ? 'Change Logo' : 'Upload Logo'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Salary */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Salary</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., ₹6-12 LPA"
          value={form.salary}
          onChangeText={(text) => handleChange('salary', text)}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Openings */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Number of Openings</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 5"
          keyboardType="numeric"
          value={form.openings}
          onChangeText={(text) => handleChange('openings', text)}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Experience */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Experience</Text>
        <View style={styles.radioRow}>
          {['Fresher', 'Experienced'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.radioOption, form.experienceType === type && styles.radioSelected]}
              onPress={() => handleChange('experienceType', type)}
            >
              <Text style={[styles.radioText, form.experienceType === type && styles.radioTextSelected]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {form.experienceType === 'Experienced' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Min Years"
              keyboardType="numeric"
              value={form.experienceMin}
              onChangeText={(text) => handleChange('experienceMin', text)}
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              placeholder="Max Years"
              keyboardType="numeric"
              value={form.experienceMax}
              onChangeText={(text) => handleChange('experienceMax', text)}
              placeholderTextColor="#aaa"
            />
          </>
        )}
      </View>

      {/* Location */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Job Location</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.location}
            onValueChange={(value) => handleChange('location', value)}
            style={styles.picker}
            dropdownIconColor="#000"
          >
            {['Remote', 'Hyderabad', 'Bangalore', 'Chennai', 'Mumbai'].map((loc) => (
              <Picker.Item key={loc} label={loc} value={loc} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Job Type */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Job Type</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.jobType}
            onValueChange={(value) => handleChange('jobType', value)}
            style={styles.picker}
            dropdownIconColor="#000"
          >
            {['Full-time', 'Part-time', 'Internship', 'Contract'].map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Description */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Job Description</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          placeholder="Describe the job role and responsibilities"
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Skills */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Required Skills</Text>
        <View style={styles.skillInputRow}>
          <TextInput
            style={[styles.input, { flex: 1, color: 'black' }]}
            placeholder="Add a new skill"
            placeholderTextColor="#aaa"
            value={customSkill}
            onChangeText={setCustomSkill}
          />
          <TouchableOpacity
            style={[styles.addButton, customSkill.trim() ? styles.addButtonActive : styles.addButtonInactive]}
            onPress={() => {
              const trimmed = customSkill.trim();
              if (trimmed && !selectedSkills.includes(trimmed)) {
                setSelectedSkills((prev) => [...prev, trimmed]);
                setCustomSkill('');
              }
            }}
            disabled={!customSkill.trim()}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.skillsContainer}>
          {[...skillsList, ...selectedSkills.filter((s) => !skillsList.includes(s))].map((skill) => (
            <TouchableOpacity
              key={skill}
              style={[styles.skillItem, selectedSkills.includes(skill) && styles.skillItemSelected]}
              onPress={() => toggleSkill(skill)}
            >
              <Text style={[styles.skillText, selectedSkills.includes(skill) && styles.skillTextSelected]}>
                {skill}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recruiter Email */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Recruiter Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.recruiterEmail}
          onChangeText={(text) => handleChange('recruiterEmail', text)}
          placeholderTextColor="#aaa"
        />
      </View>

      <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
        <Text style={styles.postButtonText}>Post Job</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  container: { padding: 10, backgroundColor: '#FFFFFF' },
  heading: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 16, color: '#333', alignItems: 'center' },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 14, marginBottom: 4, color: '#222', fontWeight: '500' },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginTop: 4,
    color: 'black',
  },
  picker: { backgroundColor: '#fff', color: 'black' },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  skillInputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  addButton: { backgroundColor: '#5A1EFF', paddingHorizontal: 12, paddingVertical: 8, marginLeft: 8, borderRadius: 4 },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  addButtonActive: { backgroundColor: '#5A1EFF' },
  addButtonInactive: { backgroundColor: '#aaa' },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 4, columnGap: 4 },
  skillItem: { paddingVertical: 4, paddingHorizontal: 8, backgroundColor: '#eee', borderRadius: 20, marginRight: 4, marginBottom: 4 },
  skillItemSelected: { backgroundColor: '#5A1EFF' },
  skillText: { color: '#333' },
  skillTextSelected: { color: '#fff', fontWeight: 'bold' },
  postButton: { backgroundColor: '#5A1EFF', paddingVertical: 14, borderRadius: 6, marginTop: 20, alignItems: 'center' },
  postButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  radioRow: { flexDirection: 'row', gap: 10, marginVertical: 6 },
  radioOption: { paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: '#888', borderRadius: 20 },
  radioSelected: { backgroundColor: '#5A1EFF' },
  radioText: { color: '#333' },
  radioTextSelected: { color: '#fff', fontWeight: 'bold' },
  uploadButton: {
    backgroundColor: '#5A1EFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PostJobs;
