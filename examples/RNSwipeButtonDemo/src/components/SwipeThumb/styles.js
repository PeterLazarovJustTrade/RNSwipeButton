import { StyleSheet } from 'react-native';

const borderWidth = 3;
const maxContainerHeight = 100;
const Styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    alignSelf: 'flex-start',
    borderRadius: maxContainerHeight / 2,
    borderRightWidth: 0,
    borderWidth,
  },
  containerRTL: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    borderRadius: maxContainerHeight / 2,
    borderLeftWidth: 0,
    borderWidth,
  },
  icon: {
    alignItems: 'center',
    borderRadius: maxContainerHeight / 2,
    justifyContent: 'center',
  },
});

export default Styles;
