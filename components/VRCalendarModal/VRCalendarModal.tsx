import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Animated, Pressable } from 'react-native';
import { Calendar, Layout } from '@ui-kitten/components';
import { BlurView } from 'expo-blur';

import { VRButton } from 'components';
import { WIDTH, HEIGHT } from 'constants/index';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const ANIMATED_DURATION = 250;
const SLIDE_START = -400;

const VRCalendarModal = ({
    onDatePress,
    date,
    modalOpen,
    setModalOpen
}: {
    onDatePress: (value: string) => void;
    date: Date;
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
}) => {
    const [hasBeenToggled, setHasBeenToggled] = useState(false);
    const [renderBlurView, setRenderBlurView] = useState(false);

    const slide = useRef(new Animated.Value(SLIDE_START)).current;
    const blur = useRef(new Animated.Value(0)).current;

    const handleModalToggle = useCallback(
        (isOpening: boolean) => {
            if (isOpening) {
                setRenderBlurView(true);
            } else {
                // wait for animation to finish before removing blur view
                setTimeout(() => {
                    setRenderBlurView(false);
                }, ANIMATED_DURATION);
            }

            Animated.parallel([
                Animated.timing(blur, {
                    toValue: isOpening ? 20 : 0,
                    duration: ANIMATED_DURATION,
                    useNativeDriver: false
                }),
                Animated.timing(slide, {
                    toValue: isOpening ? 50 : SLIDE_START,
                    duration: ANIMATED_DURATION,
                    useNativeDriver: false
                })
            ]).start();
        },
        [blur, slide]
    );

    useEffect(() => {
        if (modalOpen) {
            setHasBeenToggled(true);
            handleModalToggle(true);
        } else if (!modalOpen && hasBeenToggled) {
            handleModalToggle(false);
        }
    }, [modalOpen, handleModalToggle, hasBeenToggled]);

    return (
        <>
            <Animated.View
                style={{
                    zIndex: 2,
                    position: 'absolute',
                    bottom: slide,
                    width: WIDTH
                }}
            >
                {renderBlurView && (
                    <AnimatedBlurView
                        intensity={blur}
                        style={{
                            height: HEIGHT,
                            width: WIDTH
                        }}
                    >
                        <Pressable
                            onPress={() => {
                                setModalOpen(false);
                            }}
                            style={{
                                height: '100%',
                                width: '100%'
                            }}
                        />
                    </AnimatedBlurView>
                )}

                <Layout>
                    <Calendar
                        onSelect={(pickedDate) => {
                            onDatePress(pickedDate.toLocaleDateString());
                            setModalOpen(false);
                        }}
                        date={date}
                        max={new Date()}
                        style={{
                            width: '100%'
                        }}
                    />
                </Layout>

                <Layout style={{ padding: 20 }}>
                    <VRButton
                        title="Remove Date"
                        onPress={() => {
                            onDatePress('');
                            setModalOpen(false);
                        }}
                        trackID="calendar-modal-reset-button"
                        variant="primary"
                        size="small"
                    />
                </Layout>
            </Animated.View>
        </>
    );
};

export default VRCalendarModal;
