import React, { useState } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { Layout } from '@ui-kitten/components';

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
        <Layout style={styles.container}>
            <Layout style={styles.upperContainer}>
                <VRPressable
                    trackID="release_info_common_image_modal--open"
                    onPress={() => {
                        setImageModalOpen(true);
                        StatusBar.setHidden(true);
                    }}
                >
                    <Layout>
                        {images?.length ? (
                            <Layout>
                                <Image
                                    style={IMAGE_STYLE}
                                    source={{
                                        uri: images[0].resource_url
                                    }}
                                />
                            </Layout>
                        ) : (
                            <Layout style={IMAGE_STYLE}>
                                <Vinyl />
                            </Layout>
                        )}
                    </Layout>
                </VRPressable>
                {images && images.length ? (
                    <VRImageModal
                        images={images}
                        modalOpen={imageModalOpen}
                        setModalOpen={setImageModalOpen}
                    />
                ) : null}
            </Layout>
            <Layout>
                <Layout style={styles.title}>
                    <VRText fontType="h4">{title}</VRText>
                    <VRListIndicator
                        userData={{
                            in_collection: isInCollection,
                            in_wantlist: inWantList
                        }}
                        size="lg"
                    />
                </Layout>
                <VRText fontType="italic">{artist}</VRText>
            </Layout>
            <Layout style={styles.tags}>
                {tags.map((tag) => (
                    <VRTag key={tag} tag={tag} size="lg" />
                ))}
            </Layout>
            <VRText>{`Released: ${releasedDate}`}</VRText>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
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
