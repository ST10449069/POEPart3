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

interface PopularItem {
  id: string;
  name: string;
  image: any;
  price: string;
  restaurant: string;
  rating: number;
  discount?: string;
  type?: string;
  time?: string;
}

interface PopularItemsProps {
  items: PopularItem[];
  onItemPress: (item: PopularItem) => void;
  title?: string;
  showSeeAll?: boolean;
  onSeeAllPress?: () => void;
}

const PopularItems: React.FC<PopularItemsProps> = ({
  items,
  onItemPress,
  title = 'Popular Items',
  showSeeAll = true,
  onSeeAllPress,
}) => {
  const renderPopularItem = ({ item }: { item: PopularItem }) => (
    <TouchableOpacity
      style={styles.popularItemCard}
      onPress={() => onItemPress(item)}
    >
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.popularItemImage} />
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
        </View>
      </View>
      <View style={styles.popularItemInfo}>
        <Text style={styles.popularItemName}>{item.name}</Text>
        <Text style={styles.popularItemRestaurant}>{item.restaurant}</Text>
        <View style={styles.popularItemMeta}>
          <Text style={styles.popularItemPrice}>{item.price}</Text>
          {item.time && (
            <Text style={styles.popularItemTime}>{item.time}</Text>
          )}
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
      <FlatList
        data={items}
        renderItem={renderPopularItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.popularList}
      />
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
  popularList: {
    paddingHorizontal: 20,
  },
  popularItemCard: {
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
  imageContainer: {
    position: 'relative',
  },
  popularItemImage: {
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
  popularItemInfo: {
    padding: 12,
  },
  popularItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  popularItemRestaurant: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  popularItemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A3302D',
  },
  popularItemTime: {
    fontSize: 14,
    color: '#666',
  },
});

export default PopularItems; 