import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { VRText, VRModal, VRIcon, VRPressable, VRButton, VRInput } from '../';
import { Theme } from '../../constants';
import { RatingPayload, PayloadKeys } from '../../types';
import { generateArrayOfNumbers, toUpperFirst } from '../../helpers';
import { RATING_CATEGORIES } from '../../constants';

const DEFAULT_RATINGS = {
    clarity: 0,
    flatness: 0,
    quietness: 0,
    notes: ''
};

const Stars = ({
    handleInput,
    ratings
}: {
    handleInput: (key: PayloadKeys, value: number | string) => void;
    ratings: RatingPayload;
}) => {
    const { colors }: Theme = useTheme();

    return (
        <>
            {RATING_CATEGORIES.map((category) => {
                return (
                    <View
                        style={styles.container}
                        key={category}
                        testID={'stars-category'}
                    >
                        <VRText size={20}>{`${toUpperFirst(
                            category
                        )}: `}</VRText>

                        <View style={styles.stars}>
                            {generateArrayOfNumbers({ length: 5 }).map(
                                (inputRating) => {
                                    return (
                                        <VRPressable
                                            key={inputRating}
                                            onPress={() =>
                                                handleInput(
                                                    category,
                                                    inputRating
                                                )
                                            }
                                            trackID={`rate_modal-rate_${category}`}
                                        >
                                            <VRIcon
                                                styleOverride={{
                                                    paddingHorizontal: 4
                                                }}
                                                type={
                                                    ratings[category] >=
                                                    inputRating
                                                        ? 'starFull'
                                                        : 'starEmpty'
                                                }
                                                color={colors.primary}
                                                size="md"
                                                testID={`star-${category}-${inputRating}`}
                                            />
                                        </VRPressable>
                                    );
                                }
                            )}
                        </View>
                    </View>
                );
            })}
        </>
    );
};

const VRRateModal = ({
    onPress,
    modalOpen,
    setModalOpen,
    subTitle = '1'
}: {
    onPress: (value: RatingPayload) => void;
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    subTitle?: string;
}) => {
    const [ratings, setRatings] = useState<RatingPayload>(DEFAULT_RATINGS);

    const handleInput = (key: PayloadKeys, value: number | string) => {
        setRatings((prevState) => {
            return {
                ...prevState,
                [key]: value
            };
        });
    };

    const handleModalClose = (value: boolean = false) => {
        setModalOpen(value);
        setRatings(DEFAULT_RATINGS);
    };

    const handleSubmit = () => {
        onPress(ratings);
        handleModalClose();
    };

    return (
        <VRModal
            modalOpen={modalOpen}
            setModalOpen={handleModalClose}
            title="Rate Release"
            subTitle={subTitle}
        >
            <View
                style={{
                    padding: 20,
                    width: '100%',
                    flex: 1,
                    justifyContent: 'space-between'
                }}
            >
                <View>
                    <Stars handleInput={handleInput} ratings={ratings} />
                    <VRInput
                        value={ratings.notes}
                        handleTextChange={(value) =>
                            setRatings((prevState) => {
                                return {
                                    ...prevState,
                                    notes: value
                                };
                            })
                        }
                        multiline
                        styleOverride={{ height: 110 }}
                        containerStyleOverride={{ marginTop: 10 }}
                        label="Notes:"
                        labelSize={20}
                        showLength
                    />
                </View>
                <View>
                    <VRButton
                        containerStyle={{ marginBottom: 10 }}
                        title="Cancel"
                        onPress={handleModalClose}
                        trackID="rate_modal-cancel"
                        variant="tertiary"
                        testID="cancel"
                    />
                    <VRButton
                        containerStyle={{ marginBottom: 40 }}
                        title="Submit"
                        onPress={handleSubmit}
                        trackID="rate_modal-submit"
                        disabled={Object.values(ratings).some(
                            (rating) => rating !== '' && !rating
                        )}
                        testID="submit"
                    />
                </View>
            </View>
        </VRModal>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    stars: { flexDirection: 'row' }
});

export default VRRateModal;
