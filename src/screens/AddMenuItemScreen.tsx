import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MenuItem, Course, COURSES } from '../types';
import { useMenu } from '../context/MenuContext';

type AddMenuItemScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddMenuItem'>;

interface Props {
  navigation: AddMenuItemScreenNavigationProp;
}

const AddMenuItemScreen: React.FC<Props> = ({ navigation }) => {
  const { menuItems, addMenuItem, removeMenuItem } = useMenu();
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course>('Starters');
  const [price, setPrice] = useState('');

  const handleAddMenuItem = () => {
    if (!dishName.trim()) {
      Alert.alert('Error', 'Please enter a dish name');
      return;
    }
    
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }
    
    if (!price.trim()) {
      Alert.alert('Error', 'Please enter a price');
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert('Error', 'Please enter a valid price greater than 0');
      return;
    }

    addMenuItem({
      dishName: dishName.trim(),
      description: description.trim(),
      course: selectedCourse,
      price: priceValue,
    });

    setDishName('');
    setDescription('');
    setPrice('');
    setSelectedCourse('Starters');

    Alert.alert('Success', 'Menu item added successfully!');
  };

  const handleRemoveMenuItem = (id: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeMenuItem(id),
        },
      ]
    );
  };

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
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveMenuItem(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Add Menu Items</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Dish Name"
            placeholderTextColor="#999"
            value={dishName}
            onChangeText={setDishName}
            returnKeyType="next"
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Select Course:</Text>
          <View style={styles.courseContainer}>
            {COURSES.map(course => (
              <TouchableOpacity
                key={course}
                style={[
                  styles.courseButton,
                  selectedCourse === course && styles.selectedCourseButton,
                ]}
                onPress={() => setSelectedCourse(course)}
              >
                <Text
                  style={[
                    styles.courseButtonText,
                    selectedCourse === course && styles.selectedCourseButtonText,
                  ]}
                >
                  {course}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Price"
            placeholderTextColor="#999"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            returnKeyType="done"
          />

          <TouchableOpacity 
            style={[
              styles.addButton, 
              (!dishName.trim() || !description.trim() || !price.trim()) && styles.addButtonDisabled
            ]} 
            onPress={handleAddMenuItem}
            disabled={!dishName.trim() || !description.trim() || !price.trim()}
          >
            <Text style={styles.addButtonText}>Add to Menu</Text>
          </TouchableOpacity>
        </View>

        {/* Current Menu Items */}
        <Text style={styles.sectionTitle}>
          Current Menu Items ({menuItems.length})
        </Text>
        
        {menuItems.length > 0 ? (
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.flatListContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items added yet</Text>
            <Text style={styles.emptySubtext}>Add your first menu item above</Text>
          </View>
        )}

        {/* Navigation Buttons */}
        <View style={styles.navButtons}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('ChefHome')}
          >
            <Text style={styles.navButtonText}>View Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.guestButton]}
            onPress={() => navigation.navigate('FilterByCourse')}
          >
            <Text style={styles.navButtonText}>Guest View</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  courseButton: {
    flex: 1,
    minWidth: '30%',
    padding: 12,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedCourseButton: {
    backgroundColor: '#007AFF',
  },
  courseButtonText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 12,
  },
  selectedCourseButtonText: {
    color: 'white',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  flatListContent: {
    paddingBottom: 10,
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemContent: {
    flex: 1,
    marginRight: 10,
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
  removeButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 6,
    minWidth: 70,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  emptySubtext: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
  },
  navButtons: {
    marginTop: 20,
    marginBottom: 30,
  },
  navButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  guestButton: {
    backgroundColor: '#34C759',
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddMenuItemScreen;