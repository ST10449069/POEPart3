import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

interface HeaderProps {
  userName: string;
  profileImage: any;
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onSearchSubmit: () => void;
  onProfilePress: () => void;
  greeting?: string;
}

const Header: React.FC<HeaderProps> = ({
  userName,
  profileImage,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onProfilePress,
  greeting = 'Good morning!',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for food, restaurants..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={onSearchChange}
          onSubmitEditing={onSearchSubmit}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={onSearchSubmit}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A3302D',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    padding: 5,
  },
  searchButtonText: {
    fontSize: 18,
    color: '#666',
  },
});

export default Header;