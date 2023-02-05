import * as Haptics from 'expo-haptics';

export const runHapticFeedback = (
    level: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Heavy
) => {
    Haptics.impactAsync(level);
};
