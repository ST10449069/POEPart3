import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

interface Restaurant {
  id: string;
  name: string;
  image: any;
  rating: number;
  time: string;
  type: string;
  discount?: string;
}

interface RestaurantListProps {
  restaurants: Restaurant[];
  onRestaurantPress: (restaurant: Restaurant) => void;
  title?: string;
  showSeeAll?: boolean;
  onSeeAllPress?: () => void;
  horizontal?: boolean;
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  onRestaurantPress,
  title = 'Nearby Restaurants',
  showSeeAll = true,
  onSeeAllPress,
  horizontal = false,
}) => {
  const renderRestaurantItem = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity
      style={horizontal ? styles.restaurantCardHorizontal : styles.restaurantCard}
      onPress={() => onRestaurantPress(item)}
    >
      <Image 
        source={item.image} 
        style={horizontal ? styles.restaurantImageHorizontal : styles.restaurantImage} 
      />
      {item.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      )}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>⭐ {item.rating}</Text>
      </View>
      <View style={horizontal ? styles.restaurantInfoHorizontal : styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantType}>{item.type}</Text>
        <View style={styles.restaurantMeta}>
          <Text style={styles.restaurantTime}>{item.time}</Text>
          <Text style={styles.restaurantDot}>•</Text>
          <Text style={styles.restaurantDelivery}>Free Delivery</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {showSeeAll && (
          <TouchableOpacity onPress={onSeeAllPress}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {horizontal ? (
        <FlatList
          data={restaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.restaurantListHorizontal}
        />
      ) : (
        <FlatList
          data={restaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.restaurantList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#A3302D',
    fontWeight: '600',
  },
  restaurantList: {
    paddingHorizontal: 20,
  },
  restaurantListHorizontal: {
    paddingHorizontal: 20,
  },
  restaurantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantCardHorizontal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 15,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  restaurantImageHorizontal: {
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
  ratingContainer: {
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
  restaurantInfo: {
    padding: 15,
  },
  restaurantInfoHorizontal: {
    padding: 12,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  restaurantType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantTime: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  restaurantDot: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 8,
  },
  restaurantDelivery: {
    fontSize: 14,
    color: '#666',
  },
});

export default RestaurantList;