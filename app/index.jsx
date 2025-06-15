// app/onboarding.jsx

import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // If using Expo Router
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Import your constants - ADJUST THIS PATH if your theme.js is elsewhere
import { COLORS, SIZES } from '../constants/ThemeColors';

const { width } = Dimensions.get('window');

// Data for your onboarding slides
const slides = [
  {
    id: '1',
    imageTop: require('../assets/images/Onboarding1.png'),
    mainTitle: {
      part1: 'Track',
      part2: 'Inventory',
      part3: 'With Ease.',
    },
    description: 'Manage your seeds, livestock, and feeds; all in one place',
  },
  {
    id: '2',
    imageTop: require('../assets/images/Onboarding2.png'),
    mainTitle: {
      part1: 'Log Harvests',
      part2: 'Fast And',
      part3: 'Accurately.',
    },
    description: 'Record every harvest, monitor yields, and track productivity over time.',
  },
  {
    id: '3',
    imageTop: require('../assets/images/Onboarding3.png'),
    mainTitle: {
      part1: 'Set Smart',
      part2: 'Alert,',
      part3: 'Stay Informed.',
    },
    description: 'Get notified when stocks run low or when it’s time to act; no surprises.',
  },
];

// Individual Onboarding Slide Component
const OnboardingItem = ({ item }) => {
  // Using the actual images you provided
  const farmventoryLogo = require('../assets/images/farmventory-logo.png'); // Assuming this path

  if (item.id === '1') {
    return (
      <View style={styles.slide}>
        <View style={styles.topImageWrapper}>
          <Image source={item.imageTop} style={styles.topImage} resizeMode="cover" />
        </View>

        <View style={styles.textSection}>
          <Text style={styles.mainTitle}>
            {typeof item.mainTitle === 'object' ? (
              <>
                <Text style={styles.bold}>{item.mainTitle.part1}</Text>{'\n'}
                <Text>{item.mainTitle.part2}</Text>{'\n'}
                <Text style={styles.bold}>{item.mainTitle.part3}</Text>
              </>
            ) : (
              item.mainTitle?.split('\n').map((line, index) => (
                <Text key={index}>
                  {line}
                  {'\n'}
                </Text>
              ))
            )}
          </Text>

          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  } else if (item.id === '2') {
    return (
      <View style={styles.slide}>
        <View style={styles.topImageWrapper}>
          <Image source={item.imageTop} style={styles.topImage} resizeMode="cover" />
        </View>

        <View style={styles.textSection}>
          <Text style={styles.mainTitle}>
            {typeof item.mainTitle === 'object' ? (
              <>
                <Text style={styles.bold}>{item.mainTitle.part1}</Text>{'\n'}
                <Text>{item.mainTitle.part2}</Text>{'\n'}
                <Text style={styles.bold}>{item.mainTitle.part3}</Text>
              </>
            ) : (
              item.mainTitle?.split('\n').map((line, index) => (
                <Text key={index}>
                  {line}
                  {'\n'}
                </Text>
              ))
            )}
          </Text>

          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  } else if (item.id === '3') {
    return (
      <View style={styles.slide}>
        <View style={styles.topImageWrapper}>
          <Image source={item.imageTop} style={styles.topImage} resizeMode="cover" />
        </View>

        <View style={styles.textSection}>
          <Text style={styles.mainTitle}>
            {typeof item.mainTitle === 'object' ? (
              <>
                <Text style={styles.bold}>{item.mainTitle.part1}</Text>{'\n'}
                <Text>{item.mainTitle.part2}</Text>{'\n'}
                <Text style={styles.bold}>{item.mainTitle.part3}</Text>
              </>
            ) : (
              item.mainTitle?.split('\n').map((line, index) => (
                <Text key={index}>
                  {line}
                  {'\n'}
                </Text>
              ))
            )}
          </Text>

          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  }
  return null;
};


const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/login'); // Example: navigate to login screen
    }
  };

  const handleSkip = () => {
    router.replace('/login'); // Example: skip to login screen
  };

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(newIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ flexGrow: 1 }}
      />

      <View style={styles.footer}>
        {/* Dots Indicator */}
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index && styles.currentIndicator,
              ]}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          {currentIndex < slides.length - 1 ? (
            <>
              <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipButtonText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <FontAwesome5 name="arrow-right" size={SIZES.xxl} color={COLORS.white} />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.getStartedButton} onPress={handleNext}>
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  slide: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + SIZES.padding : SIZES.padding,
    paddingBottom: SIZES.padding,
    justifyContent: 'space-between',
  },
  topImageWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',

  },
  // --- Slide Specific Styles ---
  topImage: {
    width: width - (SIZES.padding * 3),
    height: width * 0.85,
    borderRadius: SIZES.radius + 7,
    overflow: 'hidden',
    alignSelf: 'flex-end',
    marginTop: 50,
  },

  // --- Common Text Section Styles ---
  textSection: {
    width: '100%',
    flex: 0.7,
    justifyContent: 'flex-start',
    marginLeft: 50,
  },
  mainTitle: {
    fontSize: SIZES.h1 + 5, 
    color: COLORS.darkGray, 
    textAlign: 'left',
    marginBottom: 6, 
    marginTop: -30,
  },
  bold: {
    fontFamily: 'PoppinsExtraBold',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 23, 
    color: COLORS.primary, 
    textAlign: 'left',
    padding: 20,
    marginTop: -20,
    marginLeft: -20,
  },

  // --- Footer Styles ---
  footer: {
    paddingHorizontal: SIZES.padding, 
    paddingVertical: 60, 
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: SIZES.padding, 
  },
  indicator: {
    width: SIZES.base, 
    height: SIZES.base, 
    borderRadius: SIZES.base / 2, 
    backgroundColor: COLORS.lightGray, 
    marginHorizontal: SIZES.base / 2, 
  },
  currentIndicator: {
    backgroundColor: COLORS.primary, 
    width: SIZES.base * 2, 
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  skipButton: {
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.large, 
    borderRadius: SIZES.radius, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonText: {
    color: COLORS.gray, 
    fontSize: SIZES.large, 
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: COLORS.primary, 
    borderRadius: SIZES.large * 2,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedButton: {
    backgroundColor: COLORS.primary, 
    borderRadius: SIZES.radius, 
    paddingVertical: SIZES.medium, 
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  getStartedButtonText: {
    color: COLORS.white, 
    fontSize: SIZES.large, 
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;