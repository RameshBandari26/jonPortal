import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function EditBasicDetailsScreen({ route, navigation }) {
  const { name: initName, graduation: initGrad, gender: initGender, location: initLocation } = route.params;

  const [name, setName] = useState(initName);
  const [graduation, setGraduation] = useState(initGrad);
  const [gender, setGender] = useState(initGender);
  const [location, setLocation] = useState(initLocation);

  const handleSave = () => {
    // Optionally pass data back using navigation.goBack() or event emit
    alert("Basic details saved!");
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Edit Basic Details</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Graduation</Text>
      <TextInput style={styles.input} value={graduation} onChangeText={setGraduation} />

      <Text style={styles.label}>Gender</Text>
      <TextInput style={styles.input} value={gender} onChangeText={setGender} />

      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 10,
  },
  saveBtn: {
    marginTop: 20,
    backgroundColor: '#0066ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
