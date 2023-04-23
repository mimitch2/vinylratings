import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { PRESSED_OR_DISABLED_OPACITY } from 'constants/index';
import {
    VRIcon,
    VRText,
    VRTag,
    VRListIndicator,
    VRPressable
} from 'components';
import { Vinyl } from 'svgs';
import { ArtistSearch, TextCategory, VoidFuncNoParams } from 'types';

const VRArtistCard = ({
    artist,
    onPress,
    disabled = false
}: {
    artist: ArtistSearch;
    onPress: VoidFuncNoParams;
    disabled?: boolean;
}) => {
    const { thumb, title, user_data } = artist;

    return (
        <VRPressable
            trackID="artist_card-press"
            onPress={onPress}
            disabled={disabled}
            styleOverride={[
                styles.container,
                {
                    opacity: disabled ? PRESSED_OR_DISABLED_OPACITY : 1
                }
            ]}
        >
            <Layout style={styles.innerContainer}>
                <Layout style={styles.leftArea}>
                    {thumb ? (
                        <Image
                            source={{
                                uri: thumb
                            }}
                            style={styles.image}
                        />
                    ) : (
                        <Layout style={styles.image} testID="image-default">
                            <Vinyl />
                        </Layout>
                    )}
                    <Layout style={styles.title}>
                        <Layout
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%'
                            }}
                        >
                            <Layout>
                                <VRText category={TextCategory.h3}>
                                    {title}
                                </VRText>
                                <Layout style={styles.tags}>
                                    <VRTag tag={'Artist'} size="sm" />
                                </Layout>
                            </Layout>
                            <VRListIndicator userData={user_data ?? null} />
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
            <View style={styles.iconContainer}>
                <VRIcon type="chevronRight" />
            </View>
        </VRPressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginBottom: 5,
        // borderBottomColor: colors.textFaded,
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
