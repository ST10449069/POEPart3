import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Splash: undefined;
  ProfileSelect: undefined;
  ChefLogin: undefined;
  Client1Login: undefined;
  Client2Login: undefined;
  ChefHome: undefined;
  Client1Home: undefined;
  Client2Home: undefined;
};

type ProfileSelectScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileSelect'>;

const ProfileSelectScreen: React.FC = () => {
  const navigation = useNavigation<ProfileSelectScreenNavigationProp>();

  const profiles = [
    {
      id: 'chef',
      name: 'Chef Account',
      description: 'Manage recipes, orders, and kitchen operations',
      image: require('../assets/chef.jpg'),
      screen: 'ChefLogin' as keyof RootStackParamList
    },
    {
      id: 'client1',
      name: 'Client 1',
      description: 'Browse menus and support Chef Chris',
      image: require('../assets/client.png'),
      screen: 'Client1Login' as keyof RootStackParamList
    },
    {
      id: 'client2',
      name: 'Client 2',
      description: 'Browse menus and support Chef Chris',
      image: require('../assets/client2.png'),
      screen: 'Client2Login' as keyof RootStackParamList
    }
  ];

  const handleProfileSelect = (profileScreen: keyof RootStackParamList) => {
    navigation.navigate(profileScreen);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#A3302D" barStyle="light-content" />
      <Text style={styles.title}>Select Profile</Text>
      <ScrollView contentContainerStyle={styles.profilesContainer}>
        {profiles.map((profile) => (
          <TouchableOpacity
            key={profile.id}
            style={styles.profileCard}
            onPress={() => handleProfileSelect(profile.screen)}
          >
            <Image source={profile.image} style={styles.profileImage} />
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileDescription}>{profile.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#A3302D',
  },
  profilesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  profileDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default ProfileSelectScreen;