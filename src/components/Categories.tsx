import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Category {
  id: string;
  name: string;
  image: any;
}

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryPress: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  categories,
  selectedCategory,
  onCategoryPress,
}) => {
  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.name && styles.selectedCategory,
      ]}
      onPress={() => onCategoryPress(item.name)}
    >
      <View style={styles.categoryImageContainer}>
        <Image source={item.image} style={styles.categoryImage} />
      </View>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.name && styles.selectedCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    minWidth: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCategory: {
    backgroundColor: '#A3302D',
  },
  categoryImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
});

export default Categories;