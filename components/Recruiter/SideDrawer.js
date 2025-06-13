import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');

const SideDrawer = ({ animation, closeDrawer }) => {
  const navigation = useNavigation();

  const handleNavigate = (screen, skipClose = false) => {
    navigation.navigate(screen);
    if (!skipClose && closeDrawer) {
      closeDrawer();
    }
  };

  return (
    <Animated.View style={[styles.drawer, { transform: [{ translateX: animation }] }]}>
      <View style={styles.drawerContent}>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>John Doe</Text>
        </View>

        {/* Menu Items */}
        <TouchableOpacity onPress={() => handleNavigate('RecruiterHomePage')}>
          <Text style={styles.item}>Home</Text>
        </TouchableOpacity>

        <Text style={styles.item}>Profile</Text>
        <Text style={styles.item}>Interviews</Text>
        <Text style={styles.item}>Settings</Text>

        <TouchableOpacity
          onPress={() => handleNavigate('RoleSelect', true)}  // ✅ skip closing drawer
          style={styles.logoutRow}
        >
          <Text style={styles.item}>Logout</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: '#fff',
    zIndex: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  drawerContent: {
    padding: 20,
    paddingTop: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  item: {
    fontSize: 18,
    marginVertical: 15,
    color: '#333',
  },
  logoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 18,
    color: '#333',
  },
});

export default SideDrawer;
