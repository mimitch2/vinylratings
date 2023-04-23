import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { PRESSED_OR_DISABLED_OPACITY } from 'constants/index';
import { Releases, VoidFuncNoParams } from 'types';
import {
    VRDivider,
    VRIcon,
    VRListIndicator,
    VRPressable,
    VRRatingsStars,
    VRTag,
    VRText
} from 'components';
import { Vinyl } from 'svgs';

const VRReleaseCard = ({
    artist = null,
    release,
    onPress,
    disabled = false,
    tags = []
}: {
    artist?: string | null;
    release: Releases;
    onPress: VoidFuncNoParams;
    disabled?: boolean;
    tags?: string[];
}) => {
    const { name: routeName } = useRoute();
    const isSearch = routeName === 'Search';
    const isWantList = routeName === 'Want';

    const {
        basic_information: {
            title,
            thumb,
            styles: releaseStyles,
            artists,
            country,
            year,
            user_data,
            type
        }
    } = release;

    const [releaseStyle] = releaseStyles;

    const cardTags = useMemo(() => {
        const targetTags = isSearch
            ? [country || 'Unknown', year || 'Unknown']
            : tags;

        if (isSearch && type === 'master') {
            targetTags.unshift('Master');
        }

        let wantListTags = null;

        if (isWantList) {
            wantListTags = [releaseStyle, ...tags];
        }

        return wantListTags ?? targetTags;
    }, [releaseStyle, isWantList, country, isSearch, year, tags, type]);

    return (
        <>
            <VRPressable
                trackID="release_card-press"
                onPress={onPress}
                disabled={disabled}
                styleOverride={[
                    styles.container,
                    {
                        opacity: disabled ? PRESSED_OR_DISABLED_OPACITY : 1
                    }
                ]}
            >
                <View style={styles.innerContainer}>
                    <View style={styles.leftArea}>
                        {thumb ? (
                            <Image
                                source={{
                                    uri: thumb
                                }}
                                style={styles.image}
                            />
                        ) : (
                            <View style={styles.image} testID="image-default">
                                <Vinyl />
                            </View>
                        )}
                        <View style={styles.title}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%'
                                }}
                            >
                                <VRText
                                    fontType="h6"
                                    numberOfLines={1}
                                    styleOverride={{ paddingRight: 5 }}
                                >
                                    {title}
                                </VRText>

                                <VRListIndicator userData={user_data ?? null} />
                            </View>
                            <VRText fontType="italic">
                                {artist ?? artists[0]?.name ?? 'Unknown'}
                            </VRText>

                            {type !== 'master' ? (
                                <VRRatingsStars
                                    average={release?.rating ?? 0}
                                    size="sm"
                                />
                            ) : null}
                        </View>
                    </View>
                    <View style={styles.tags}>
                        {cardTags.map((tag, idx) => (
                            <VRTag key={`${tag}-${idx}`} tag={tag} size="sm" />
                        ))}
                    </View>
                </View>
                <View style={styles.iconContainer}>
                    <VRIcon type="chevronRight" />
                </View>
            </VRPressable>
            <VRDivider />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 20
    },
    innerContainer: {
        flex: 1
    },
    leftArea: {
        flexDirection: 'row',
        flex: 1
    },
    title: { marginLeft: 10, flexShrink: 1 },
    image: {
        width: 60,
        height: 60,
        borderRadius: 4
    },
    tags: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 10
    },
    iconContainer: {
        justifyContent: 'center'
    }
});

export default React.memo(VRReleaseCard);
