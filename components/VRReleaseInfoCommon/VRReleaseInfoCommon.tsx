import React, { useState } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';

import { WIDTH } from 'constants/index';
import {
    VRImageModal,
    VRListIndicator,
    VRTag,
    VRText,
    VRPressable
} from 'components';
import { DiscogsImage, TextCategory } from 'types';
import { Vinyl } from 'svgs';

const IMAGE_STYLE = {
    width: WIDTH,
    height: WIDTH
};

const VRReleaseInfoCommon = ({
    images,
    tags,
    isInCollection,
    inWantList,
    title,
    artist,
    releasedDate
}: {
    images: DiscogsImage[];
    tags: string[];
    isInCollection: boolean;
    inWantList: boolean;
    title: string;
    artist: string;
    releasedDate: string;
}) => {
    const [imageModalOpen, setImageModalOpen] = useState(false);

    return (
        <>
            <View style={styles.upperContainer}>
                <VRPressable
                    trackID="release_info_common_image_modal--open"
                    onPress={() => {
                        setImageModalOpen(true);
                        StatusBar.setHidden(true);
                    }}
                >
                    <View>
                        {images?.length ? (
                            <View>
                                <Image
                                    style={IMAGE_STYLE}
                                    source={{
                                        uri: images[0].resource_url
                                    }}
                                />
                            </View>
                        ) : (
                            <View style={IMAGE_STYLE}>
                                <Vinyl />
                            </View>
                        )}
                    </View>
                </VRPressable>
                {images && images.length ? (
                    <VRImageModal
                        images={images}
                        modalOpen={imageModalOpen}
                        setModalOpen={setImageModalOpen}
                    />
                ) : null}
            </View>
            <View>
                <View style={styles.title}>
                    <VRText fontWeight="bold" category={TextCategory.h4}>
                        {title}
                    </VRText>
                    <VRListIndicator
                        userData={{
                            in_collection: isInCollection,
                            in_wantlist: inWantList
                        }}
                        size="lg"
                    />
                </View>
                <VRText fontStyle="italic" category={TextCategory.s1}>
                    {artist}
                </VRText>
            </View>
            <View style={styles.tags}>
                {tags.map((tag) => (
                    <VRTag key={tag} tag={tag} size="lg" />
                ))}
            </View>
            <VRText
                styleOverride={{ paddingVertical: 5 }}
            >{`Released: ${releasedDate}`}</VRText>
        </>
    );
};

const styles = StyleSheet.create({
    upperContainer: {
        left: -20,
        top: -20
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 15
    }
});

export default VRReleaseInfoCommon;
