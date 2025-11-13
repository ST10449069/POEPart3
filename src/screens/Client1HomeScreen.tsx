import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');

type Client1HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Client1Home'>;

interface Props {
  navigation: Client1HomeScreenNavigationProp;
}

interface Course {
  id: string;
  name: string;
  image: any;
  rating: number;
  type: string;
  price: string;
  description: string;
  discount?: string;
}

interface Category {
  id: string;
  name: string;
  image: any;
}

const BasicHeader = ({ 
  userName, 
  profileImage, 
  searchQuery, 
  onSearchChange, 
  onSearchSubmit, 
  onProfilePress,
  onBackPress 
}: any) => (
  <View style={headerStyles.container}>
    <View style={headerStyles.topRow}>
      <TouchableOpacity onPress={onBackPress} style={headerStyles.backButton}>
        <Text style={headerStyles.backButtonText}>←</Text>
      </TouchableOpacity>
      <View style={headerStyles.welcomeSection}>
        <Text style={headerStyles.welcomeText}>Welcome back,</Text>
        <Text style={headerStyles.userName}>{userName}</Text>
      </View>
      <TouchableOpacity onPress={onProfilePress} style={headerStyles.profileButton}>
        <Image source={profileImage} style={headerStyles.profileImage} />
      </TouchableOpacity>
    </View>
    <View style={headerStyles.searchContainer}>
      <TextInput
        style={headerStyles.searchInput}
        placeholder="Search for courses..."
        value={searchQuery}
        onChangeText={onSearchChange}
        onSubmitEditing={onSearchSubmit}
      />
      <TouchableOpacity onPress={onSearchSubmit} style={headerStyles.searchButton}>
        <Text style={headerStyles.searchButtonText}>🔍</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const BasicCategories = ({ categories, selectedCategory, onCategoryPress }: any) => (
  <FlatList
    data={categories}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={[
          categoryStyles.item,
          selectedCategory === item.name && categoryStyles.selectedItem,
        ]}
        onPress={() => onCategoryPress(item.name)}
      >
        <Image source={item.image} style={categoryStyles.image} />
        <Text style={[
          categoryStyles.text,
          selectedCategory === item.name && categoryStyles.selectedText,
        ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    )}
    contentContainerStyle={categoryStyles.list}
  />
);

// Basic PopularItems Component
const BasicPopularItems = ({ items, onItemPress, title, onSeeAllPress }: any) => (
  <View style={popularStyles.container}>
    <View style={popularStyles.header}>
      <Text style={popularStyles.title}>{title}</Text>
      <TouchableOpacity onPress={onSeeAllPress}>
        <Text style={popularStyles.seeAll}>See All</Text>
      </TouchableOpacity>
    </View>
    <FlatList
      data={items}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={popularStyles.card} onPress={() => onItemPress(item)}>
          <Image source={item.image} style={popularStyles.image} />
          {item.discount && (
            <View style={popularStyles.discountBadge}>
              <Text style={popularStyles.discountText}>{item.discount}</Text>
            </View>
          )}
          <View style={popularStyles.rating}>
            <Text style={popularStyles.ratingText}>⭐ {item.rating}</Text>
          </View>
          <View style={popularStyles.info}>
            <Text style={popularStyles.name}>{item.name}</Text>
            <Text style={popularStyles.type}>{item.restaurant}</Text>
            <Text style={popularStyles.price}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={popularStyles.list}
    />
  </View>
);

// Basic RestaurantList Component
const BasicRestaurantList = ({ restaurants, onRestaurantPress, title, showSeeAll }: any) => (
  <View style={restaurantStyles.container}>
    <View style={restaurantStyles.header}>
      <Text style={restaurantStyles.title}>{title}</Text>
      {showSeeAll && (
        <TouchableOpacity>
          <Text style={restaurantStyles.seeAll}>See All</Text>
        </TouchableOpacity>
      )}
    </View>
    <View style={restaurantStyles.grid}>
      {restaurants.map((item: Course) => (
        <TouchableOpacity 
          key={item.id} 
          style={restaurantStyles.card} 
          onPress={() => onRestaurantPress(item)}
        >
          <Image source={item.image} style={restaurantStyles.image} />
          {item.discount && (
            <View style={restaurantStyles.discountBadge}>
              <Text style={restaurantStyles.discountText}>{item.discount}</Text>
            </View>
          )}
          <View style={restaurantStyles.rating}>
            <Text style={restaurantStyles.ratingText}>⭐ {item.rating}</Text>
          </View>
          <View style={restaurantStyles.info}>
            <Text style={restaurantStyles.name}>{item.name}</Text>
            <Text style={restaurantStyles.type}>{item.type}</Text>
            <Text style={restaurantStyles.description} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={restaurantStyles.price}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const Client1HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  // Categories data
  const categories: Category[] = [
    { id: '1', name: 'All', image: require('../assets/dish4.jpg') },
    { id: '2', name: 'Starters', image: require('../assets/courses/french-onion-soup.jpg') },
    { id: '3', name: 'Mains', image: require('../assets/courses/grilled-salmon.jpg') },
    { id: '4', name: 'Desserts', image: require('../assets/courses/tiramisu.jpg') },
    { id: '5', name: 'Appetizer', image: require('../assets/courses/appetiser2.jpg') },
    { id: '6', name: 'Hors D-Oeuvres', image: require('../assets/courses/hors2.jpg') },
    { id: '7', name: 'Amuse-Bouche', image: require('../assets/courses/amuse2.jpg') },
    { id: '8', name: 'Soup', image: require('../assets/courses/soup1.jpeg') },
    { id: '9', name: 'Salad', image: require('../assets/courses/salad.jpg') },
    { id: '10', name: 'Sorbet', image: require('../assets/courses/sorbet2.jpeg') },
    { id: '11', name: 'Prosecco', image: require('../assets/courses/prosecco.jpg') },
  ];

  const courses: Course[] = [
     {
      id: '1',
      name: 'French Onion Soup',
      image: require('../assets/courses/french-onion-soup.jpg'),
      rating: 4.6,
      type: 'Starters',
      price: 'R89.99',
      description: 'Classic French soup with caramelized onions and cheese',
      discount: '15% OFF',
    },
    {
      id: '2',
      name: 'Caprese Salad',
      image: require('../assets/courses/caprese-salad.jpg'),
      rating: 4.4,
      type: 'Starters',
      price: 'R75.50',
      description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze',
    },
    {
      id: '3',
      name: 'Beef Carpaccio',
      image: require('../assets/courses/beef-carpaccio.jpg'),
      rating: 4.7,
      type: 'Starters',
      price: 'R120.00',
      description: 'Thinly sliced raw beef with arugula and parmesan',
    },
    {
      id: '4',
      name: 'Grilled Salmon',
      image: require('../assets/courses/grilled-salmon.jpg'),
      rating: 4.8,
      type: 'Mains',
      price: 'R185.00',
      description: 'Atlantic salmon with lemon butter sauce and vegetables',
      discount: '10% OFF',
    },
    {
      id: '5',
      name: 'Beef Wellington',
      image: require('../assets/courses/beef-wellington.jpg'),
      rating: 4.9,
      type: 'Mains',
      price: 'R245.00',
      description: 'Premium beef tenderloin in puff pastry with mushroom duxelles',
    },
    {
      id: '6',
      name: 'Vegetable Risotto',
      image: require('../assets/courses/vegetable-risotto.jpg'),
      rating: 4.5,
      type: 'Mains',
      price: 'R95.00',
      description: 'Creamy arborio rice with fresh seasonal vegetables',
    },
    {
      id: '7',
      name: 'Chicken Parmesan',
      image: require('../assets/courses/chicken-parmesan.jpeg'),
      rating: 4.6,
      type: 'Mains',
      price: 'R135.00',
      description: 'Breaded chicken topped with tomato sauce and melted cheese',
    },
    {
      id: '8',
      name: 'Mushroom Risotto',
      image: require('../assets/courses/mushroom-risotto.jpeg'),
      rating: 4.4,
      type: 'Mains',
      price: 'R110.00',
      description: 'Creamy risotto with wild mushrooms and parmesan',
    },
    {
      id: '9',
      name: 'Tiramisu',
      image: require('../assets/courses/tiramisu.jpg'),
      rating: 4.8,
      type: 'Desserts',
      price: 'R65.00',
      description: 'Classic Italian dessert with coffee-soaked ladyfingers',
      discount: '20% OFF',
    },
    {
      id: '10',
      name: 'Chocolate Lava Cake',
      image: require('../assets/courses/chocolate-lava-cake.jpeg'),
      rating: 4.7,
      type: 'Desserts',
      price: 'R75.00',
      description: 'Warm chocolate cake with molten center and vanilla ice cream',
    },
    {
      id: '11',
      name: 'Crème Brûlée',
      image: require('../assets/courses/creme-brulee.jpg'),
      rating: 4.6,
      type: 'Desserts',
      price: 'R70.00',
      description: 'Rich custard topped with caramelized sugar',
    },
    {
      id: '12',
      name: 'New York Cheesecake',
      image: require('../assets/courses/cheesecake.jpg'),
      rating: 4.5,
      type: 'Desserts',
      price: 'R68.00',
      description: 'Creamy cheesecake with berry compote',
    },
    {
      id: '13',
      name: 'Goat cheese crostini with fig-olive tapenade',
      image: require('../assets/courses/hors1.jpg'),
      rating: 4.6,
      type: 'Hors D-Oeuvres',
      price: 'R95.00',
      description: 'Crispy crostini topped with creamy goat cheese and sweet fig-olive tapenade',
    },
    {
      id: '14',
      name: 'Zucchini fritters',
      image: require('../assets/courses/hors2.jpg'),
      rating: 4.3,
      type: 'Hors D-Oeuvres',
      price: 'R78.00',
      description: 'Golden fried zucchini fritters with fresh herbs and dipping sauce',
    },
    {
      id: '15',
      name: 'Pea soup served in a shot glass or espresso cup',
      image: require('../assets/courses/amuse2.jpg'),
      rating: 4.4,
      type: 'Amuse-Bouche',
      price: 'R65.00',
     description: 'Creamy pea soup elegantly served in shot glasses with mint garnish',
    },
    {
      id: '16',
      name: 'Sweet potato chips with goat cheese and caviar',
      image: require('../assets/courses/amuse1.jpg'),
      rating: 4.7,
      type: 'Amuse-Bouche',
      price: 'R120.00',
      description: 'Crispy sweet potato chips topped with goat cheese and premium caviar',
      discount: '10% OFF',
    },
    {
      id: '17',
      name: 'Sorbet',
      image: require('../assets/courses/sorbet.jpg'),
      rating: 4.5,
      type: 'Sorbet',
      price: 'R55.00',
      description: 'Refreshing fruit sorbet - choose from different flavors',
    },
    {
      id: '18',
      name: 'Prosecco',
      image: require('../assets/courses/prosecco2.jpg'),
      rating: 4.8,
      type: 'Prosecco',
      price: 'R85.00',
      description: 'Italian sparkling wine - perfect for celebrations and special occasions',
    },
    {
      id: '19',
      name: 'Mushrooms stuffed with Pecorino Romano, garlic, and bread crumbs',
      image: require('../assets/courses/appetiser1.jpg'),
      rating: 4.6,
      type: 'Appetizer',
      price: 'R88.00',
      description: 'Button mushrooms stuffed with Pecorino Romano, garlic, and herb bread crumbs',
    },
    {
      id: '20',
      name: 'Candied carrots with honey, cumin, and paprika',
      image: require('../assets/courses/appetiser2.jpg'),
      rating: 4.4,
      type: 'Appetizer',
      price: 'R62.00',
      description: 'Sweet glazed carrots with honey, warm cumin, and smoked paprika',
    },
    {
      id: '21',
      name: 'Melon and basil gazpacho',
      image: require('../assets/courses/soup1.jpeg'),
      rating: 4.5,
      type: 'Soup',
      price: 'R72.00',
      description: 'Chilled melon soup with fresh basil and cucumber',
    },
    { 
      id: '22',
      name: 'Pumpkin sage bisque',
      image: require('../assets/courses/soup.jpg'),
      rating: 4.7,
      type: 'Soup',
      price: 'R82.00',
      description: 'Creamy pumpkin soup with fresh sage and croutons',
      discount: '15% OFF',
    },
    {
      id: '23',
      name: 'Greek salad with olives, lettuce, red onions, and feta cheese',
      image: require('../assets/courses/salad2.jpg'),
      rating: 4.5,
      type: 'Salad',
      price: 'R75.00',
      description: 'Fresh Greek salad with kalamata olives, crisp lettuce, red onions, and creamy feta cheese',
    },
    {
      id: '24',
      name: 'Garden salad with lettuce, tomatoes, onions, and tart vinaigrette',
      image: require('../assets/courses/salad.jpg'),
      rating: 4.3,
      type: 'Salad',
      price: 'R65.00',
      description: 'Classic garden salad with mixed lettuce, cherry tomatoes, red onions, and tangy vinaigrette',
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      Alert.alert('Search', `Searching for: ${searchQuery}`);
    }
  };

  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(course => course.type === selectedCategory);

  const popularCourses = courses.filter(course => course.rating >= 4.6);

  const handleCoursePress = (course: Course) => {
    (navigation as any).navigate('CourseDetail', { course });
  };

  const handleProfilePress = () => {
    (navigation as any).navigate('Profile');
  };

  const handleSeeAllPress = () => {
    (navigation as any).navigate('AllCourses');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A3302D" />
        <Text style={styles.loadingText}>Loading delicious courses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#A3302D" barStyle="light-content" />
      
      <BasicHeader
        userName="Tshepo"
        profileImage={require('../assets/Tshepo.jpg')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
        onProfilePress={handleProfilePress}
        onBackPress={handleBackPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Categories</Text>
          <BasicCategories
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryPress={setSelectedCategory}
          />
        </View>

        {/* Popular Courses Section */}
        <BasicPopularItems
          items={popularCourses.map(course => ({
            ...course,
            restaurant: 'Chef Special',
          }))}
          onItemPress={handleCoursePress}
          title="Popular Courses"
          onSeeAllPress={handleSeeAllPress}
        />

        {/* All Courses Section */}
        <BasicRestaurantList
          restaurants={filteredCourses}
          onRestaurantPress={handleCoursePress}
          title={`${selectedCategory === 'All' ? 'All' : selectedCategory} Courses`}
          showSeeAll={false}
        />
      </ScrollView>
    </View>
  );
};

// Main styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
});

// Header styles
const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: '#A3302D',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 20,
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
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 2, 
    borderColor: '#FFFFFF', 
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25, 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
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
  },
});

// Categories styles
const categoryStyles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
  },
  item: {
    alignItems: 'center',
    marginRight: 15,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    minWidth: 70,
  },
  selectedItem: {
    backgroundColor: '#A3302D',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  selectedText: {
    color: '#FFFFFF',
  },
});

// Popular items styles
const popularStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#A3302D',
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 15,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#A3302D',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rating: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A3302D',
  },
});

// Restaurant list styles
const restaurantStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#A3302D',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    width: (width - 50) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#A3302D',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rating: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  type: {
    fontSize: 12,
    color: '#A3302D',
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    color: '#666',
    marginBottom: 8,
    lineHeight: 14,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A3302D',
  },
});

export default Client1HomeScreen;