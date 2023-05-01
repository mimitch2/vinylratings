import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { VRText, VRRatingsStars, VRModal, VRButton, VRIcon } from 'components';
import { RATING_CATEGORIES } from 'constants/index';
import { DiscogsRating, VinylRatingsRelease } from 'types';
import { getRatingValues, toUpperFirst } from 'helpers';

const RatingRow = ({
    label,
    average,
    count
}: {
    label: string;
    average: number;
    count?: number;
}) => {
    return (
        <Layout style={styles.row} testID="rating-row">
            <VRText fontType="bold">{label}</VRText>
            <Layout
                style={{
                    width: '48%',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <VRRatingsStars average={average} />
                {count ? (
                    <Layout style={{ flexDirection: 'row' }}>
                        <VRText styleOverride={{ marginLeft: 4 }}>
                            {
                                getRatingValues({
                                    average
                                }).preciseAverage
                            }
                        </VRText>
                        <VRText>{`(${count})`}</VRText>
                    </Layout>
                ) : null}
            </Layout>
        </Layout>
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
    const [ratingsModalOpen, setRatingsModalOpen] = useState(false);

    const { count, average: discogsAverage } = discogsRating;
    const {
        clarityAvg,
        // currentUserRating,
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
                        average={average}
                        count={total}
                    />
                );
            })}
            <Layout
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
                    variant="basic"
                    size="small"
                    stacked={false}
                />
                <VRButton
                    trackID="release_screen-open_discogs_modal"
                    title="Discogs reviews"
                    onPress={() => setDiscogsReviewsModalOpen(true)}
                    containerStyle={{ marginLeft: 5 }}
                    variant="basic"
                    size="small"
                    stacked={false}
                />
            </Layout>
            <VRModal
                title="Ratings"
                modalOpen={ratingsModalOpen}
                setModalOpen={setRatingsModalOpen}
                testID="ratings-modal"
            >
                <Layout style={{ width: '100%', paddingHorizontal: 20 }}>
                    {vinylRatings?.map((rating) => {
                        return (
                            <Layout
                                key={rating._id}
                                style={{
                                    paddingVertical: 15
                                }}
                            >
                                <Layout style={{ flexDirection: 'row' }}>
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

                                    <Layout
                                        style={{
                                            marginLeft: 6,
                                            marginBottom: 10
                                        }}
                                    >
                                        <VRText fontType="h3">
                                            {rating.user.username}
                                        </VRText>
                                        <VRText fontType="italic">
                                            {new Date(
                                                +rating.createdAt
                                            ).toLocaleDateString()}
                                        </VRText>
                                    </Layout>
                                </Layout>

                                <RatingRow
                                    label="Average:"
                                    average={+rating.rating}
                                />
                                {RATING_CATEGORIES.map((key) => {
                                    return (
                                        <RatingRow
                                            key={key}
                                            label={`${toUpperFirst(key)}:`}
                                            average={+rating[key]}
                                        />
                                    );
                                })}
                                <VRText fontType="bold">Notes:</VRText>
                                <VRText>{rating.notes}</VRText>
                            </Layout>
                        );
                    })}
                </Layout>
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
