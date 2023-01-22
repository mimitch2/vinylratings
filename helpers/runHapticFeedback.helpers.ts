import ReactNativeHapticFeedback, {
    HapticFeedbackTypes
} from 'react-native-haptic-feedback';

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
};

export const runHapticFeedback = (
    level: HapticFeedbackTypes = 'impactMedium'
) => {
    ReactNativeHapticFeedback.trigger(level, options);
};
