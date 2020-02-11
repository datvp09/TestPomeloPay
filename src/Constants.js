import {Platform, Dimensions} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

const {height, width} = Dimensions.get('window');
const isiOS = Platform.OS === 'ios';
const isIpX = isIphoneX(); // X, XS, XR
const isSmallScreen = height < 650;
const isBigScreen = isiOS ? height > 800 : height > 730;
const intenseBlue = '#1365AF';
const refundIcon = require('./assets/images/iconBack.png');

export {
  height,
  width,
  isiOS,
  isIpX,
  isSmallScreen,
  isBigScreen,
  intenseBlue,
  refundIcon,
};
