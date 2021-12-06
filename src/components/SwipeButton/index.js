import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Text, View, AccessibilityInfo} from 'react-native';

// Components
import SwipeThumb from '../../components/SwipeThumb';

// Styles
import styles from './styles';

// Constants
import {
  DISABLED_RAIL_BACKGROUND_COLOR,
  DISABLED_THUMB_ICON_BACKGROUND_COLOR,
  DISABLED_THUMB_ICON_BORDER_COLOR,
  RAIL_BACKGROUND_COLOR,
  RAIL_BORDER_COLOR,
  RAIL_FILL_BACKGROUND_COLOR,
  RAIL_FILL_BORDER_COLOR,
  SWIPE_SUCCESS_THRESHOLD,
  THUMB_ICON_BACKGROUND_COLOR,
  THUMB_ICON_BORDER_COLOR,
  TITLE_COLOR,
} from '../../constants';

const SwipeButton = props => {
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  const [isUnmounting, setIsUnmounting] = useState(false);

  /**
   * Retrieve layoutWidth to set maximum swipeable area.
   * Correct layout width will be received only after first render but we need it before render.
   * So render SwipeThumb only if layoutWidth > 0
   */
  const onLayoutContainer = async e => {
    if (isUnmounting || layoutWidth) {
      return;
    }
    setLayoutWidth(e.nativeEvent.layout.width);
  };

  useEffect(() => {
    const handleScreenReaderToggled = isEnabled => {
      if (isUnmounting || screenReaderEnabled === isEnabled) {
        return;
      }
      setScreenReaderEnabled(isEnabled);
    };
    setIsUnmounting(false);
    const eventEmitter = AccessibilityInfo.addEventListener(
      'change',
      handleScreenReaderToggled,
    );

    AccessibilityInfo.isScreenReaderEnabled().then(isEnabled => {
      if (isUnmounting) {
        return;
      }
      setScreenReaderEnabled(isEnabled);
    });

    return () => {
      setIsUnmounting(true);
      eventEmitter.remove();
    };
  }, [isUnmounting, screenReaderEnabled]);

  const {
    containerStyles,
    containerPadding,
    disabled,
    disabledRailBackgroundColor,
    disabledThumbIconBackgroundColor,
    disabledThumbIconBorderColor,
    disableResetOnTap,
    enableReverseSwipe,
    forceReset,
    height,
    onSwipeFail,
    onSwipeStart,
    onSwipeSuccess,
    railBackgroundColor,
    railBorderColor,
    railBorderWidth,
    railFillBackgroundColor,
    railFillBorderColor,
    railFillBorderWidth,
    railStyles,
    resetAfterSuccessAnimDelay,
    resetAfterSuccessAnimDuration,
    shouldResetAfterSuccess,
    swipeSuccessThreshold,
    thumbIconBackgroundColor,
    thumbIconBorderColor,
    thumbIconBorderWidth,
    thumbIconComponent,
    thumbIconImageSource,
    thumbIconStyles,
    thumbIconWidth,
    title,
    titleColor,
    titleFontSize,
    titleMaxFontScale,
    titleMargin,
    titleStyles,
    LeftEndTemplate,
    RightEndTemplate,
    width,
    containerTestID,
    thumbTestID,
  } = props;
  return (
    <View
      testID={containerTestID || "SwipeButton.Container"}
      style={{
        ...styles.container,
        ...containerStyles,
        backgroundColor: disabled
          ? disabledRailBackgroundColor
          : railBackgroundColor,
        borderColor: railBorderColor,
        borderWidth: railBorderWidth,
        padding: containerPadding,
        ...(width ? {width} : {}),
      }}
      onLayout={onLayoutContainer}>
      <View style={styles.content}>
        {LeftEndTemplate && (
          <View style={styles.centeredView}>{LeftEndTemplate}</View>
        )}
        <Text
          maxFontSizeMultiplier={titleMaxFontScale}
          ellipsizeMode={'tail'}
          numberOfLines={1}
          importantForAccessibility={
            screenReaderEnabled ? 'no-hide-descendants' : ''
          }
          style={{
            color: titleColor,
            fontSize: titleFontSize,
            ...titleStyles,
            margin: titleMargin,
          }}>
          {title}
        </Text>
        {RightEndTemplate && (
          <View style={styles.centeredView}>{RightEndTemplate}</View>
        )}
      </View>
      {layoutWidth > 0 && (
        <SwipeThumb
          testID={thumbTestID}
          disabled={disabled}
          disabledThumbIconBackgroundColor={disabledThumbIconBackgroundColor}
          disabledThumbIconBorderColor={disabledThumbIconBorderColor}
          disableResetOnTap={disableResetOnTap}
          enableReverseSwipe={enableReverseSwipe}
          forceReset={forceReset}
          containerPadding={containerPadding}
          layoutWidth={layoutWidth}
          onSwipeFail={onSwipeFail}
          onSwipeStart={onSwipeStart}
          onSwipeSuccess={onSwipeSuccess}
          railFillBackgroundColor={railFillBackgroundColor}
          railFillBorderColor={railFillBorderColor}
          railFillBorderWidth={railFillBorderWidth}
          railStyles={railStyles}
          resetAfterSuccessAnimDelay={resetAfterSuccessAnimDelay}
          resetAfterSuccessAnimDuration={resetAfterSuccessAnimDuration}
          screenReaderEnabled={screenReaderEnabled}
          shouldResetAfterSuccess={shouldResetAfterSuccess}
          swipeSuccessThreshold={swipeSuccessThreshold}
          thumbIconBackgroundColor={thumbIconBackgroundColor}
          thumbIconBorderColor={thumbIconBorderColor}
          thumbIconBorderWidth={thumbIconBorderWidth}
          thumbIconComponent={thumbIconComponent}
          thumbIconHeight={height}
          thumbIconImageSource={thumbIconImageSource}
          thumbIconStyles={thumbIconStyles}
          thumbIconWidth={thumbIconWidth}
          title={title}
        />
      )}
    </View>
  );
};

SwipeButton.defaultProps = {
  containerStyles: {},
  containerPadding: 4,
  disabled: false,
  disabledRailBackgroundColor: DISABLED_RAIL_BACKGROUND_COLOR,
  disabledThumbIconBackgroundColor: DISABLED_THUMB_ICON_BACKGROUND_COLOR,
  disabledThumbIconBorderColor: DISABLED_THUMB_ICON_BORDER_COLOR,
  disableResetOnTap: false,
  height: 50,
  railBackgroundColor: RAIL_BACKGROUND_COLOR,
  railBorderColor: RAIL_BORDER_COLOR,
  railBorderWidth: 1,
  railFillBackgroundColor: RAIL_FILL_BACKGROUND_COLOR,
  railFillBorderColor: RAIL_FILL_BORDER_COLOR,
  railFillBorderWidth: 1,
  swipeSuccessThreshold: SWIPE_SUCCESS_THRESHOLD,
  thumbIconBackgroundColor: THUMB_ICON_BACKGROUND_COLOR,
  thumbIconBorderColor: THUMB_ICON_BORDER_COLOR,
  thumbIconBorderWidth: 1,
  thumbIconStyles: {},
  title: 'Swipe to submit',
  titleColor: TITLE_COLOR,
  titleFontSize: 20,
  titleStyles: {},
  titleMargin: 4,
};

SwipeButton.propTypes = {
  containerStyles: PropTypes.object,
  containerPadding: PropTypes.number,
  disable: PropTypes.bool,
  disabledRailBackgroundColor: PropTypes.string,
  disabledThumbIconBackgroundColor: PropTypes.string,
  disabledThumbIconBorderColor: PropTypes.string,
  disableResetOnTap: PropTypes.bool,
  enableReverseSwipe: PropTypes.bool,
  forceReset: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSwipeFail: PropTypes.func,
  onSwipeStart: PropTypes.func,
  onSwipeSuccess: PropTypes.func,
  railBackgroundColor: PropTypes.string,
  railBorderColor: PropTypes.string,
  railBorderWidth: PropTypes.number,
  railFillBackgroundColor: PropTypes.string,
  railFillBorderColor: PropTypes.string,
  railFillBorderWidth: PropTypes.number,
  railStyles: PropTypes.object,
  resetAfterSuccessAnimDelay: PropTypes.number,
  resetAfterSuccessAnimDuration: PropTypes.number,
  shouldResetAfterSuccess: PropTypes.bool,
  swipeSuccessThreshold: PropTypes.number, // Ex: 70. Swipping 70% will be considered as successful swipe
  thumbIconBackgroundColor: PropTypes.string,
  thumbIconBorderColor: PropTypes.string,
  thumbIconBorderWidth: PropTypes.number,
  thumbIconComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.func,
  ]),
  thumbIconImageSource: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  thumbIconStyles: PropTypes.object,
  thumbIconWidth: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  titleColor: PropTypes.string,
  titleFontSize: PropTypes.number,
  titleMaxFontScale: PropTypes.number,
  titleStyles: PropTypes.object,
  titleMargin: PropTypes.number,
  RightEndTemplate: PropTypes.node,
  LeftEndTemplate: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default SwipeButton;
