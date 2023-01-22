import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useRoute, useTheme } from '@react-navigation/native';

import { Theme, ThemeColors } from '../../constants';
import { Releases, VoidFuncNoParams } from '../../types';
import {
    VRIcon,
    VRText,
    VRTag,
    VRListIndicator,
    VRRatingsStars,
    VRPressable
} from '../';
import { Vinyl } from '../../svgs';

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
    const { colors }: Theme = useTheme();
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
            user_data
        }
    } = release;

    const [releaseStyle] = releaseStyles;

    const cardTags = useMemo(() => {
        const targetTags = isSearch
            ? [country || 'Unknown', year || 'Unknown']
            : tags;

        let wantListTags = null;

        if (isWantList) {
            wantListTags = [releaseStyle, ...tags];
        }

        return wantListTags ?? targetTags;
    }, [releaseStyle, isWantList, country, isSearch, year, tags]);

    return (
        <VRPressable
            trackID="release_card-press"
            onPress={onPress}
            disabled={disabled}
            styleOverride={[
                styles(colors).container,
                {
                    opacity: disabled ? 0.6 : 1
                }
            ]}
        >
            <View style={styles(colors).innerContainer}>
                <View style={styles(colors).leftArea}>
                    {thumb ? (
                        <Image
                            source={{
                                uri: thumb
                            }}
                            style={styles(colors).image}
                        />
                    ) : (
                        <View
                            style={styles(colors).image}
                            testID="image-default"
                        >
                            <Vinyl />
                        </View>
                    )}
                    <View style={styles(colors).title}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%'
                            }}
                        >
                            <VRText fontWeight="bold" size={20}>
                                {artist ?? artists[0]?.name ?? 'Unknown'}
                            </VRText>

                            <VRListIndicator userData={user_data ?? null} />
                        </View>
                        <VRText
                            size={14}
                            fontStyle="italic"
                            numberOfLines={1}
                            styleOverride={{ paddingRight: 5 }}
                        >
                            {title}
                        </VRText>
                        <VRRatingsStars
                            average={release?.rating ?? 0}
                            size="sm"
                        />
                    </View>
                </View>
                <View style={styles(colors).tags}>
                    {cardTags.map((tag, idx) => (
                        <VRTag key={`${tag}-${idx}`} tag={tag} size="sm" />
                    ))}
                </View>
            </View>
            <View style={styles(colors).iconContainer}>
                <VRIcon type="chevronRight" />
            </View>
        </VRPressable>
    );
};

const styles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            paddingVertical: 10,
            marginBottom: 5,
            borderBottomColor: colors.textFaded,
            borderBottomWidth: 0.5
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
