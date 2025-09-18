import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { OnboardingSlide as OnboardingSlideType } from '../types/onboarding';
import { CitySkylineIllustration } from './illustrations/CitySkylineIllustration';
import { SnapSendIllustration } from './illustrations/SnapSendIllustration';
import { ReportIssuesIllustration } from './illustrations/ReportIssuesIllustration';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface OnboardingSlideProp {
  slide: OnboardingSlideType;
}

const renderIllustration = (illustration: string) => {
  switch (illustration) {
    case 'city-skyline':
      return <CitySkylineIllustration width={screenWidth * 0.8} height={screenHeight * 0.4} />;
    case 'snap-send':
      return <SnapSendIllustration width={screenWidth * 0.8} height={screenHeight * 0.4} />;
    case 'report-issues':
      return <ReportIssuesIllustration width={screenWidth * 0.8} height={screenHeight * 0.4} />;
    default:
      return <CitySkylineIllustration width={screenWidth * 0.8} height={screenHeight * 0.4} />;
  }
};

export const OnboardingSlide: React.FC<OnboardingSlideProp> = ({ slide }) => {
  return (
    <View style={[styles.container, { backgroundColor: slide.backgroundColor }]}>
      <View style={styles.illustrationContainer}>
        {renderIllustration(slide.illustration)}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  illustrationContainer: {
    height: screenHeight * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 180,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C2C2C',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
});
