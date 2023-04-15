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
import { DiscogsImage } from 'types';
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
            <View style={styles.title}>
                <View>
                    <VRText fontWeight="bold" size={28}>
                        {title}
                    </VRText>
                    <VRText fontStyle="italic" size={20}>
                        {artist}
                    </VRText>
                </View>
                <View>
                    <VRListIndicator
                        userData={{
                            in_collection: isInCollection,
                            in_wantlist: inWantList
                        }}
                        size="lg"
                    />
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: 15
                }}
            >
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
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    }
});

export default VRReleaseInfoCommon;
