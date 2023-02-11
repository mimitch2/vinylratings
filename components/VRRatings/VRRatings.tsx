import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { VRText, VRRatingsStars, VRModal, VRButton, VRIcon } from 'components';
import { Theme, ThemeColors, RATING_CATEGORIES } from 'constants/index';
import { DiscogsRating, VinylRatingsRelease } from 'types';
import { getRatingValues, toUpperFirst } from 'helpers';

const RatingRow = ({
    label,
    average,
    count
}: {
    label: string;
    average: number;
    colors: ThemeColors;
    count?: number;
}) => {
    return (
        <View style={styles.row}>
            <VRText fontWeight="bold">{label}</VRText>
            <View
                style={{
                    width: '48%',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <VRRatingsStars average={average} />
                {count ? (
                    <VRText>{` ${
                        getRatingValues({
                            average
                        }).preciseAverage
                    }(${count})`}</VRText>
                ) : null}
            </View>
        </View>
    );
};

const VRRatings = ({
    discogsRating,
    vinylRatingsRelease,
    setDiscogsReviewsModalOpen
}: {
    discogsRating: DiscogsRating;
    vinylRatingsRelease: VinylRatingsRelease;
    setDiscogsReviewsModalOpen: (value: boolean) => void;
}) => {
    const { colors }: Theme = useTheme();
    const [ratingsModalOpen, setRatingsModalOpen] = useState(false);

    const { count, average: discogsAverage } = discogsRating;
    const {
        clarityAvg,
        currentUserRating,
        flatnessAvg,
        quietnessAvg,
        ratingAvg,
        ratingsCount,
        vinylRatings
    } = vinylRatingsRelease ?? {
        currentUserRating: null,
        clarityAvg: 0,
        flatnessAvg: 0,
        quietnessAvg: 0,
        ratingAvg: 0,
        ratingsCount: 0,
        vinylRatings: null
    };

    const ROWS = [
        {
            label: 'Combined rating:',
            average:
                (ratingAvg * ratingsCount + discogsAverage * count) /
                (ratingsCount + count),
            total: ratingsCount + count
        },
        { label: 'Discogs rating:', average: discogsAverage, total: count },
        {
            label: 'VinylRatings overall:',
            average: ratingAvg,
            total: ratingsCount
        },
        {
            label: 'VinylRatings clarity:',
            average: clarityAvg,
            total: ratingsCount
        },

        {
            label: 'VinylRatings quietness:',
            average: quietnessAvg,
            total: ratingsCount
        },
        {
            label: 'VinylRatings flatness:',
            average: flatnessAvg,
            total: ratingsCount
        }
    ];

    return (
        <>
            {ROWS.map(({ label, average, total }) => {
                return (
                    <RatingRow
                        key={label}
                        label={label}
                        colors={colors}
                        average={average}
                        count={total}
                    />
                );
            })}
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    justifyContent: 'space-between'
                }}
            >
                <VRButton
                    trackID="release_screen-open_ratings_modal"
                    title="See all ratings"
                    onPress={() => setRatingsModalOpen(true)}
                    containerStyle={{ marginRight: 5 }}
                    variant="tertiary"
                    stacked={false}
                />
                <VRButton
                    trackID="release_screen-open_ratings_modal"
                    title="Discogs reviews"
                    onPress={() => setDiscogsReviewsModalOpen(true)}
                    containerStyle={{ marginLeft: 5 }}
                    variant="tertiary"
                    stacked={false}
                />
            </View>
            <VRModal
                title="Ratings"
                modalOpen={ratingsModalOpen}
                setModalOpen={setRatingsModalOpen}
            >
                <View style={{ width: '100%', paddingHorizontal: 20 }}>
                    {vinylRatings?.map((rating) => {
                        return (
                            <View
                                key={rating._id}
                                style={{
                                    paddingVertical: 15,
                                    borderBottomColor: colors.primaryFaded,
                                    borderBottomWidth: 1
                                }}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    {rating.user.avatarUrl ? (
                                        <Image
                                            source={{
                                                uri: rating.user.avatarUrl
                                            }}
                                            style={{
                                                height: 30,
                                                width: 30,
                                                borderRadius: 15
                                            }}
                                        />
                                    ) : (
                                        <VRIcon type="home" />
                                    )}

                                    <View
                                        style={{
                                            marginLeft: 6,
                                            marginBottom: 10
                                        }}
                                    >
                                        <VRText fontWeight="bold" size={24}>
                                            {rating.user.username}
                                        </VRText>
                                        <VRText fontStyle="italic">
                                            {new Date(
                                                +rating.createdAt
                                            ).toLocaleDateString()}
                                        </VRText>
                                    </View>
                                </View>

                                <RatingRow
                                    label="Average:"
                                    colors={colors}
                                    average={+rating.rating}
                                />
                                {RATING_CATEGORIES.map((key) => {
                                    return (
                                        <RatingRow
                                            key={key}
                                            label={`${toUpperFirst(key)}:`}
                                            colors={colors}
                                            average={+rating[key]}
                                        />
                                    );
                                })}
                                <VRText fontWeight="bold">Notes:</VRText>
                                <VRText>{rating.notes}</VRText>
                            </View>
                        );
                    })}
                </View>
            </VRModal>
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default VRRatings;
