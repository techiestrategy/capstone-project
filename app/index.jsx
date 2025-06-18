// app/onboarding.jsx

import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { COLORS, SIZES } from '../constants/ThemeColors';

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

const OnboardingItem = ({ item }) => {
  return (
    <View style={styles.slide}>
      <View style={styles.topImageWrapper}>
        <Image source={item.imageTop} style={styles.topImage} resizeMode="contain" />
      </View>

      <View style={styles.textSection}>
        <Text style={styles.mainTitle}>
          <Text style={styles.bold}>{item.mainTitle.part1}</Text>{'\n'}
          <Text>{item.mainTitle.part2}</Text>{'\n'}
          <Text style={styles.bold}>{item.mainTitle.part3}</Text>
        </Text>

        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = () => {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/login');
    }
  };

  const handleSkip = () => {
    router.replace('/login');
  };

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(newIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
             
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
      </ScrollView>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? SIZES.padding * 2 : SIZES.padding,
  },
topImageWrapper: {
  width: SIZES.width * 0.99,
  height: SIZES.height * 0.5,
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  position: 'relative',
},

topImage: {
  position: 'absolute',
  right: 0,
  width: SIZES.width * 0.9,
  height: '100%',
  resizeMode: 'contain',
},


  textSection: {
    width: '100%',
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding * 0.5,
  },
  mainTitle: {
    fontSize: SIZES.h1,
    color: COLORS.darkGray,
    textAlign: 'left',
    marginBottom: SIZES.base,
    lineHeight: SIZES.h1 * 1.2,
  },
  bold: {
    fontFamily: 'PoppinsExtraBold',
    fontWeight: 'bold',
  },
  description: {
    fontSize: SIZES.medium + 2,
    color: COLORS.primary,
    textAlign: 'left',
    marginTop: SIZES.base,
  },
  footer: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding * 1.5,
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
    width: width * 0.14,
    height: width * 0.14,
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
