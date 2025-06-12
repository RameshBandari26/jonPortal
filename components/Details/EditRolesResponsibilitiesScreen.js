import { Button } from 'react-native-elements';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
export function EditRolesResponsibilitiesScreen({ route, navigation }) {
  const { experiences, location, ctc } = route.params;
  const [roles, setRoles] = useState(`${experiences}, ${location}, ${ctc}`);

  const handleSave = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Roles & Responsibilities</Text>
      <TextInput style={styles.input} value={roles} onChangeText={setRoles} multiline />

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
