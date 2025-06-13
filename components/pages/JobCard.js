import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const JobCard = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { job } = route.params;

  const handleApplyJob = async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await fetch(`http://192.168.168.231:5000/api/jobs/${job._id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Applied to the job!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
      } else {
        Alert.alert('Error', result.message || 'Application failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Network error');
    }
  };

  const [alreadyApplied, setAlreadyApplied] = React.useState(false);

React.useEffect(() => {
  const checkIfApplied = async () => {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`http://192.168.168.231:5000/api/jobs/${job._id}/is-applied`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) {
      setAlreadyApplied(data.applied);
    }
  };
  checkIfApplied();
}, []);


  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <TouchableOpacity>
          <MaterialIcons name="bookmark-border" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.companyContainer}>
        {job.companyLogo ? (
          <Image source={{ uri: job.companyLogo }} style={styles.companyLogo} />
        ) : (
          <MaterialIcons name="business" size={60} color="#6C63FF" />
        )}
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.companyName}>{job.companyName}</Text>
          <Text style={styles.jobTitle}>{job.jobTitle}</Text>
        </View>
      </View>

      <View style={styles.tagsContainer}>
        <Text style={styles.tag}>{job.jobType}</Text>
        {job.remote && <Text style={styles.tag}>Remote Working</Text>}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <MaterialIcons name="attach-money" size={20} color="#6C63FF" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.infoTitle}>Salary</Text>
            <Text style={styles.infoValue}>{job.salary} LPA</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <MaterialIcons name="location-on" size={20} color="#6C63FF" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.infoTitle}>Location</Text>
            <Text style={styles.infoValue}>{job.location}</Text>
          </View>
        </View>

        {job.experience && (
          <View style={styles.infoItem}>
            <MaterialIcons name="work-outline" size={20} color="#6C63FF" />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.infoTitle}>Experience</Text>
              <Text style={styles.infoValue}>{job.experience}</Text>
            </View>
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>Job Description</Text>
      <Text style={styles.description}>{job.description}</Text>

      {job.skills && job.skills.length > 0 && (
        <View style={styles.bulletList}>
          {job.skills.map((skill, idx) => (
            <View key={idx} style={styles.bulletItem}>
              <MaterialIcons name="check-circle" size={16} color="#6C63FF" />
              <Text style={styles.bulletText}>{skill}</Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity
  style={[
    styles.applyButton,
    alreadyApplied && { backgroundColor: '#aaa' },
  ]}
  onPress={handleApplyJob}
  disabled={alreadyApplied}
>
  <Text style={styles.applyButtonText}>
    {alreadyApplied ? 'APPLIED' : 'APPLY JOB'}
  </Text>
</TouchableOpacity>

    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  companyName: {
    fontSize: 14,
    color: '#555',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  tag: {
    backgroundColor: '#eee',
    color: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  infoContainer: {
    marginVertical: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  infoTitle: {
    fontSize: 12,
    color: '#555',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 8,
  },
  bulletList: {
    marginVertical: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  bulletText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobCard;
