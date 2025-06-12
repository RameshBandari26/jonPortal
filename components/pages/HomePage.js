import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HomePage({ navigation }) {
  const recentJobs = [
    {
      id: 1,
      title: 'Junior Software Engineer',
      company: 'Highspeed Studios',
      salary: '$500 - $1,000',
      location: 'Jakarta, Indonesia',
      description: 'Develop and maintain web applications.',
    },
    {
      id: 2,
      title: 'Database Engineer',
      company: 'Lunar Digi Corp.',
      salary: '$500 - $1,000',
      location: 'London, United Kingdom',
      description: 'Manage and optimize large-scale databases.',
    },
    {
      id: 3,
      title: 'Senior Software Engineer',
      company: 'Darkseer Studios',
      salary: '$500 - $1,000',
      location: 'Medan, Indonesia',
      description: 'Lead development teams in agile projects.',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
         {/* <TouchableOpacity onPress={() => navigation.navigate('Sidebar')}>
    <Ionicons name="menu-outline" size={30} color="black" />
  </TouchableOpacity> */}
  <TouchableOpacity onPress={() => navigation.openDrawer()}>
  <Ionicons name="menu-outline" size={30} color="black" />
</TouchableOpacity>



          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.username}>Henry Kanwil</Text>
          </View>

          <View style={styles.avatar}>
                    <TouchableOpacity style={styles.avatarText}>
                      <Ionicons name="notifications-outline" size={24} color="black" style={{ marginRight: 10 }} />

                    </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="gray" />
          <TextInput placeholder="Search job here..." placeholderTextColor="gray" style={styles.searchInput} />
        </View>

        {/* Job Stats */}
        <View style={styles.jobStats}>
          <View style={styles.statCardPurple}>
            <Text style={styles.statLabel}>Jobs Applied</Text>
            <Text style={styles.statValue}>29</Text>
          </View>
          <View style={styles.statCardBlue}>
            <Text style={styles.statLabel}>Total Jobs</Text>
            <Text style={styles.statValue}>100</Text>
          </View>
        </View>

        {/* Status */}
        <View style={styles.statusCard}>
          <View>
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={styles.statValue}>5</Text>
          </View>
          <View>
            <Text style={styles.statLabel}>Declined</Text>
            <Text style={styles.statValue}>6</Text>
          </View>
        </View>

        {/* Recommended Jobs */}
        <Text style={styles.sectionTitle}>Recommended Jobs</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.recommendedCard}>
            <Image
              source={{ uri: 'https://placehold.co/50' }}
              style={styles.jobImage}
            />
            <Text style={styles.jobTitle}>Software Engineer</Text>
            <Text style={styles.jobLocation}>Jakarta, Indonesia</Text>
            <Text style={styles.jobSalary}>$500 - $1,000</Text>
          </View>
        </ScrollView>

        {/* Recent Jobs */}
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Jobs</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>More</Text>
          </TouchableOpacity>
        </View>

        {recentJobs.map((job, index) => (
          <TouchableOpacity
                onPress={() => navigation.navigate('JobDetails', { job })}
              >
          <View style={styles.jobCard} key={index}>
            <Text style={styles.jobTitleBold}>{job.title}</Text>
            <Text style={styles.jobCompany}>{job.company}</Text>
            <Text style={styles.jobSalary}>{job.salary}</Text>
            <Text style={styles.jobLocation}>{job.location}</Text>
  
          </View>
            </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#7c3aed" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="interpreter-mode" size={24} color="gray" />
          <Text style={styles.navText}>Interviews</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble" size={24} color="gray" />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="user" size={24} color="gray" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white',paddingTop:20 },
  scrollContent: { padding: 16, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  greeting: { color: '#6b21a8', fontSize: 16 },
  username: { color: '#6b21a8', fontSize: 20, fontWeight: 'bold' },
  avatar: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#6b21a8', fontWeight: 'bold' },
  searchBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  searchInput: { marginLeft: 10, flex: 1, color: '#000' },
  jobStats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  statCardPurple: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    width: '48%',
    padding: 16,
  },
  statCardBlue: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    width: '48%',
    padding: 16,
  },
  statLabel: { color: 'white', fontSize: 14 },
  statValue: { color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 8 },
  statusCard: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    marginTop: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8 },
  recommendedCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    padding: 16,
    marginRight: 12,
    width: 240,
  },
  jobImage: { width: 48, height: 48, borderRadius: 8 },
  jobTitle: { fontSize: 16, fontWeight: '600', marginTop: 8 },
  jobLocation: { color: 'gray', fontSize: 12 },
  jobSalary: { color: '#7c3aed', fontWeight: '600', marginTop: 4 },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 8,
  },
  linkText: { color: '#7c3aed' },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    padding: 16,
    marginBottom: 12,
  },
  jobTitleBold: { fontWeight: 'bold', fontSize: 16 },
  jobCompany: { color: 'gray', fontSize: 12 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  jobButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  jobButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    elevation: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, color: 'gray' },
  navTextActive: { fontSize: 12, color: '#7c3aed' },
});  

