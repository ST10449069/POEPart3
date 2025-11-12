import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MenuItem, Course, COURSES } from '../types';
import { useMenu } from '../context/MenuContext';

type FilterByCourseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FilterByCourse'>;

interface Props {
  navigation: FilterByCourseScreenNavigationProp;
}

const FilterByCourseScreen: React.FC<Props> = ({ navigation }) => {
  const { menuItems } = useMenu();
  const [selectedCourse, setSelectedCourse] = useState<Course | 'All'>('All');

  const filteredItems = selectedCourse === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.course === selectedCourse);

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <View style={styles.itemContent}>
        <Text style={styles.dishName}>{item.dishName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.itemFooter}>
          <Text style={styles.course}>{item.course}</Text>
          <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#A3302D" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter by Course</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content}>
        {/* Course Filter */}
        <Text style={styles.filterTitle}>Select Course:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCourse === 'All' && styles.selectedFilterButton,
            ]}
            onPress={() => setSelectedCourse('All')}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedCourse === 'All' && styles.selectedFilterButtonText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {COURSES.map(course => (
            <TouchableOpacity
              key={course}
              style={[
                styles.filterButton,
                selectedCourse === course && styles.selectedFilterButton,
              ]}
              onPress={() => setSelectedCourse(course)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedCourse === course && styles.selectedFilterButtonText,
                ]}
              >
                {course}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results Count */}
        <Text style={styles.resultsText}>
          Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
          {selectedCourse !== 'All' && ` in ${selectedCourse}`}
        </Text>

        {/* Menu Items */}
        {filteredItems.length > 0 ? (
          <FlatList
            data={filteredItems}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.emptyText}>
            {selectedCourse === 'All' 
              ? 'No menu items available.' 
              : `No ${selectedCourse.toLowerCase()} available.`}
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#A3302D',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 30,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginRight: 10,
    backgroundColor: 'white',
  },
  selectedFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  selectedFilterButtonText: {
    color: 'white',
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemContent: {
    flex: 1,
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  course: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
    textTransform: 'capitalize',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginVertical: 40,
  },
});

export default FilterByCourseScreen;