import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import {
    Theme,
    ThemeColors,
    PRESSED_OR_DISABLED_OPACITY
} from 'constants/index';
import {
    VRIcon,
    VRText,
    VRTag,
    VRListIndicator,
    VRPressable
} from 'components';
import { Vinyl } from 'svgs';
import { ArtistSearch, VoidFuncNoParams } from 'types';

const VRArtistCard = ({
    artist,
    onPress,
    disabled = false
}: {
    artist: ArtistSearch;
    onPress: VoidFuncNoParams;
    disabled?: boolean;
}) => {
    const { colors }: Theme = useTheme();

    const { thumb, title, user_data } = artist;

    return (
        <VRPressable
            trackID="artist_card-press"
            onPress={onPress}
            disabled={disabled}
            styleOverride={[
                styles(colors).container,
                {
                    opacity: disabled ? PRESSED_OR_DISABLED_OPACITY : 1
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
                            <View>
                                <VRText fontWeight="bold" size={22}>
                                    {title}
                                </VRText>
                                <View style={styles(colors).tags}>
                                    <VRTag tag={'Artist'} size="sm" />
                                </View>
                            </View>
                            <VRListIndicator userData={user_data ?? null} />
                        </View>
                    </View>
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
            marginTop: 4
        },
        iconContainer: {
            justifyContent: 'center'
        }
    });

export default VRArtistCard;
