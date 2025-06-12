import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
export function EditEmploymentDetailsScreen({ route, navigation }) {
  const { experiences, location, ctc } = route.params;
  const [company, setCompany] = useState(experiences);
  const [calendar, setCalendar] = useState('');
  const [jobTitle, setJobTitle] = useState(location);
  const [currentSalary, setCurrentSalary] = useState(ctc);

  const handleSave = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Company</Text>
      <TextInput style={styles.input} value={company} onChangeText={setCompany} />

      <Text style={styles.label}>Calendar</Text>
      <TextInput style={styles.input} value={calendar} onChangeText={setCalendar} />

      <Text style={styles.label}>Job Title</Text>
      <TextInput style={styles.input} value={jobTitle} onChangeText={setJobTitle} />

      <Text style={styles.label}>Current Salary</Text>
      <TextInput style={styles.input} value={currentSalary} onChangeText={setCurrentSalary} />

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
  },
});
