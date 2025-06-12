import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
export function EditProfessionalDetailsScreen({ route, navigation }) {
  const { experiences, location, ctc } = route.params;
  const [industry, setIndustry] = useState(experiences);
  const [department, setDepartment] = useState(location);
  const [designation, setDesignation] = useState(ctc);

  const handleSave = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Industry</Text>
      <TextInput style={styles.input} value={industry} onChangeText={setIndustry} />

      <Text style={styles.label}>Department</Text>
      <TextInput style={styles.input} value={department} onChangeText={setDepartment} />

      <Text style={styles.label}>Designation</Text>
      <TextInput style={styles.input} value={designation} onChangeText={setDesignation} />

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
