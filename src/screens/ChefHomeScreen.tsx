import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useMenu } from '../context/MenuContext';

type ChefHomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChefHome'>;

interface Props {
  navigation: ChefHomeScreenNavigationProp;
}

const ChefHomeScreen: React.FC<Props> = ({ navigation }) => {
  const { menuItems } = useMenu();

  // Calculate statistics
  const totalItems = menuItems.length;
  const startersCount = menuItems.filter(item => item.course === 'Starters').length;
  const mainsCount = menuItems.filter(item => item.course === 'Mains').length;
  const dessertsCount = menuItems.filter(item => item.course === 'Desserts').length;
  const appetizerCount = menuItems.filter(item => item.course === 'Appetizer').length;
  const horsdoeuvresCount = menuItems.filter(item => item.course === 'Hors D-Oeuvres').length;
  const amuseboucheCount = menuItems.filter(item => item.course === 'Amuse-Bouche').length;
  const soupCount = menuItems.filter(item => item.course === 'Soup').length;
  const saladCount = menuItems.filter(item => item.course === 'Salad').length;
  const sorbetCount = menuItems.filter(item => item.course === 'Sorbet').length;
  const proseccoCount = menuItems.filter(item => item.course === 'Prosecco').length;

  // Calculate average prices by course
  const calculateAveragePrice = (course: string) => {
    const courseItems = menuItems.filter(item => item.course === course);
    if (courseItems.length === 0) return 0;
    const total = courseItems.reduce((sum, item) => sum + item.price, 0);
    return total / courseItems.length;
  };

  const avgStartersPrice = calculateAveragePrice('Starters');
  const avgMainsPrice = calculateAveragePrice('Mains');
  const avgDessertsPrice = calculateAveragePrice('Desserts');
  const avgAppetizerPrice = calculateAveragePrice('Appetizer')
  const avgHorsDOeuvresPrice = calculateAveragePrice('Hors D-Oeuvres');
  const avgAmuseBouchePrice = calculateAveragePrice('Amuse-Bouche');
  const avgSoupPrice = calculateAveragePrice('Soup');
  const avgSaladPrice = calculateAveragePrice('Salad');
  const avgSorbetPrice = calculateAveragePrice('Sorbet');
  const avgProseccoPrice = calculateAveragePrice('Prosecco');
  const avgOverallPrice = totalItems > 0 ? menuItems.reduce((sum, item) => sum + item.price, 0) / totalItems : 0;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#A3302D" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('ProfileSelect')}
        >
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chef Dashboard</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Statistics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu Statistics</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{totalItems}</Text>
              <Text style={styles.statLabel}>Total Items</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{startersCount}</Text>
              <Text style={styles.statLabel}>Starters</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{mainsCount}</Text>
              <Text style={styles.statLabel}>Mains</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{dessertsCount}</Text>
              <Text style={styles.statLabel}>Desserts</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{appetizerCount}</Text>
              <Text style={styles.statLabel}>Appetizer</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{horsdoeuvresCount}</Text>
              <Text style={styles.statLabel}>Hors D-Oeuvres</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{amuseboucheCount}</Text>
              <Text style={styles.statLabel}>Amuse-Bouche</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{soupCount}</Text>
              <Text style={styles.statLabel}>Soup</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{saladCount}</Text>
              <Text style={styles.statLabel}>Salad</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{sorbetCount}</Text>
              <Text style={styles.statLabel}>Sorbet</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{proseccoCount}</Text>
              <Text style={styles.statLabel}>Prosecco</Text>
            </View>
          </View>
        </View>

        {/* Average Prices Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Average Prices</Text>
          <View style={styles.priceStatsContainer}>
            <View style={styles.priceStatCard}>
              <Text style={styles.priceStatLabel}>Overall Average</Text>
              <Text style={styles.priceStatValue}>
                R{avgOverallPrice.toFixed(2)}
              </Text>
            </View>
            <View style={styles.priceDetails}>
              <View style={styles.priceRow}>
                <Text style={styles.priceCourse}>Starters</Text>
                <Text style={styles.priceValue}>
                  {startersCount > 0 ? `R${avgStartersPrice.toFixed(2)}` : 'N/A'}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceCourse}>Mains</Text>
                <Text style={styles.priceValue}>
                  {mainsCount > 0 ? `R${avgMainsPrice.toFixed(2)}` : 'N/A'}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceCourse}>Desserts</Text>
                <Text style={styles.priceValue}>
                  {dessertsCount > 0 ? `R${avgDessertsPrice.toFixed(2)}` : 'N/A'}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceCourse}>Appetizer</Text>
                <Text style={styles.priceValue}>
                  {appetizerCount > 0 ? `R${avgAppetizerPrice.toFixed(2)}` : 'N/A'}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceCourse}>Hors D'Oeuvres</Text>
                <Text style={styles.priceValue}>
                  {horsdoeuvresCount > 0 ? `R${avgHorsDOeuvresPrice.toFixed(2)}` : 'N/A'}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceCourse}>Amuse-Bouche</Text>
                <Text style={styles.priceValue}>
                  {amuseboucheCount > 0 ? `R${avgAmuseBouchePrice.toFixed(2)}` : 'N/A'}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceCourse}>Soup</Text>
                <Text style={styles.priceValue}>
                  {soupCount > 0 ? `R${avgSoupPrice.toFixed(2)}` : 'N/A'}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceCourse}>Salad</Text>
                <Text style={styles.priceValue}>
                  {saladCount > 0 ? `R${avgSaladPrice.toFixed(2)}` : 'N/A'}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceCourse}>Sorbet</Text>
                <Text style={styles.priceValue}>
                  {sorbetCount > 0 ? `R${avgSorbetPrice.toFixed(2)}` : 'N/A'}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceCourse}>Prosecco</Text>
                <Text style={styles.priceValue}>
                  {proseccoCount > 0 ? `R${avgProseccoPrice.toFixed(2)}` : 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Recent Menu Items Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Menu Items</Text>
          {menuItems.length > 0 ? (
            menuItems.slice(-3).map((item, index) => (
              <View key={item.id} style={styles.menuItem}>
                <View style={styles.menuDetails}>
                  <Text style={styles.menuName}>{item.dishName}</Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                  <View style={styles.menuFooter}>
                    <Text style={styles.menuCourse}>{item.course}</Text>
                    <Text style={styles.menuPrice}>R{item.price.toFixed(2)}</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No menu items added yet.</Text>
          )}
        </View>

        {/* Action Buttons Section */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('AddMenuItem')}
          >
            <Text style={styles.actionButtonText}>Add New Menu Item</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A3302D',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  priceStatsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceStatCard: {
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  priceStatLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  priceStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A3302D',
  },
  priceDetails: {
    marginTop: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  priceCourse: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A3302D',
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuDetails: {
    flex: 1,
  },
  menuName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  menuDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  menuFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuCourse: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A3302D',
  },
  menuPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A3302D',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginVertical: 20,
  },
  actionButtons: {
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#A3302D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#A3302D',
  },
  secondaryButtonText: {
    color: '#A3302D',
  },
});

export default ChefHomeScreen;