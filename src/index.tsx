import React from 'react';
import { NativeModules, Platform, NativeEventEmitter } from 'react-native';

const PreventScreenshotAndroid = NativeModules.PreventScreenshot;

/**
 * A function that prevents the user from taking a screenshot.
 *
 * @return {Promise<boolean>} A promise that resolves to a boolean value.
 */
export async function forbid() {
  if (Platform.OS === 'ios') {
    return true;
  }
  try {
    const res = await PreventScreenshotAndroid.forbid();
    return !!res;
  } catch (error) {
    return false;
  }
}

/**
 * A function that allows the user to take a screenshot.
 *
 * @return {Promise<boolean>} A promise that resolves to a boolean value.
 */
export async function allow() {
  if (Platform.OS === 'ios') {
    return true;
  }
  try {
    const res = await PreventScreenshotAndroid.allow();
    return !!res;
  } catch (error) {
    return false;
  }
}

export const useScreenshotDeterrent = (warning: () => void) => {
  const [enabled, setEnabled] = React.useState<boolean>(false);

  const screenshotDetect = NativeModules.ScreenshotDetect;
  const detectorEventEmitter = React.useMemo(
    () => new NativeEventEmitter(screenshotDetect),
    [screenshotDetect]
  );

  const commonAddScreenshotListener = React.useCallback(
    (listener: () => void): any => {
      const eventSubscription = detectorEventEmitter.addListener(
        'UIApplicationUserDidTakeScreenshotNotification',
        () => listener()
      );

      return eventSubscription.remove;
    },
    [detectorEventEmitter]
  );

  const addScreenshotListener = React.useCallback(
    (listener: () => void): any => {
      const unsubscribe = commonAddScreenshotListener(listener);
      return unsubscribe;
    },
    [commonAddScreenshotListener]
  );

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      return;
    }

    const userDidScreenshot = () => {
      if (enabled) {
        warning();
      }
    };

    const unsubscribe = addScreenshotListener(userDidScreenshot);
    return () => {
      unsubscribe();
    };
  }, [addScreenshotListener, enabled, warning]);

  return [setEnabled];
};
