import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DashboardScreen = () => {
  const dashboard = {
    totalListings: 5,
    newCandidates: 10,
    totalCompanies: 3,
    totalApplications: 20,
    jobListings: [
      { title: "React Developer", company: "ABC Corp" },
      { title: "Node.js Engineer", company: "XYZ Ltd" }
    ],
    candidates: [
      { name: "Radha", role: "Frontend Developer" },
      { name: "Sita", role: "Backend Developer" }
    ]
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Admin</Text>

      <View style={styles.cardsContainer}>
        <Card title="Total Listings" value={dashboard.totalListings} icon="briefcase" />
        <Card title="New Candidates" value={dashboard.newCandidates} icon="user-plus" />
        <Card title="Total Companies" value={dashboard.totalCompanies} icon="building" />
        <Card title="Applications" value={dashboard.totalApplications} icon="file-alt" />
      </View>

      <Text style={styles.sectionTitle}>Job Listings</Text>
      {dashboard.jobListings.map((job, index) => (
        <View key={index} style={styles.jobCard}>
          <View>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.jobCompany}>{job.company}</Text>
          </View>
          <Text style={styles.jobStatus}>Open</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Candidates</Text>
      {dashboard.candidates.map((candidate, index) => (
        <View key={index} style={styles.candidateCard}>
          <Text style={styles.candidateName}>{candidate.name}</Text>
          <Text style={styles.candidateRole}>{candidate.role}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const Card = ({ title, value, icon }) => (
  <View style={styles.card}>
    <View style={styles.iconValueRow}>
      <Icon name={icon} size={20} color="#6C63FF" style={{ marginRight: 8 }} />
      <Text style={styles.cardValue}>{value}</Text>
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flex: 1 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    backgroundColor: '#f0f4f8',
    width: '47%',
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center', // center everything inside card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  cardValue: { fontSize: 20, fontWeight: 'bold' },
  cardTitle: { fontSize: 14, color: '#555', textAlign: 'center' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 6
  },
  jobCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobTitle: { fontWeight: 'bold' },
  jobCompany: { color: '#777' },
  jobStatus: { color: 'green', fontWeight: '600' },
  candidateCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  candidateName: { fontWeight: 'bold' },
  candidateRole: { color: '#777' },
});

export default DashboardScreen;
