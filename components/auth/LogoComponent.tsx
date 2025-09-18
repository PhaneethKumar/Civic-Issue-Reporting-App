import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';

interface LogoComponentProps {
  size?: number;
  showCircle?: boolean;
}

export const LogoComponent: React.FC<LogoComponentProps> = ({ 
  size = 80, 
  showCircle = false 
}) => {
  return (
    <View style={[styles.container, showCircle && styles.circleContainer]}>
      <View style={[styles.logoBox, { width: size, height: size }]}>
        <Svg width={size * 0.4} height={size * 0.4} viewBox="0 0 24 24">
          {/* Government/City building icon */}
          <Path
            d="M12 3L2 12h3v8h14v-8h3L12 3zm0 2.5l6 5.5v7.5h-3v-6H9v6H6V11l6-5.5z"
            fill="#D4AF37"
          />
        </Svg>
        <Text style={styles.logoText}>GOVERNMENT</Text>
        <Text style={styles.logoSubText}>City Solutions</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    backgroundColor: '#E8F4F8',
    borderRadius: 60,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBox: {
    backgroundColor: '#2C5F5F',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  logoText: {
    color: '#D4AF37',
    fontSize: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  logoSubText: {
    color: '#D4AF37',
    fontSize: 6,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
});