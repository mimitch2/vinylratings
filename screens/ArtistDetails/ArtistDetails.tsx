import React, { useState } from 'react';
import { View, Image, Pressable, StatusBar } from 'react-native';
import { useQuery } from '@apollo/client';
import {
    VRText,
    VRImageModal,
    VRContainer,
    VRSegmented,
    VRIcon,
    VRLoading
} from 'components';
import { GET_ARTIST } from './artistQueries';
import { HEIGHT, WIDTH } from 'constants/index';
import { ArtistDetail } from 'types';

type ArtistDetailResponse = {
    getArtist: ArtistDetail;
};

type Params = {
    id: string;
    coverImage: string;
};

type Route = {
    params: Params;
};

const ArtistDetails = ({ route }: { route: Route }) => {
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const {
        params: { id, coverImage }
    } = route;

    const { data, loading, error } = useQuery<ArtistDetailResponse>(
        GET_ARTIST,
        {
            variables: {
                id: +id
            }
        }
    );

    if (!data?.getArtist || loading) {
        return null;
    }

    const { images, name, profile, members } = data.getArtist;

    const membersCopy = members && [...members];
    const sortedMembers =
        membersCopy &&
        membersCopy.sort((a: any, b: any) => b.active - a.active);

    const segmentedData = [
        {
            header: 'Members',
            component: (
                <View style={{ paddingBottom: 20 }}>
                    {sortedMembers ? (
                        sortedMembers.map((member) => {
                            return (
                                <View
                                    key={member.id}
                                    style={{
                                        flexDirection: 'row',
                                        marginBottom: 6
                                    }}
                                >
                                    {member?.thumbnail_url ? (
                                        <Image
                                            source={{
                                                uri: member.thumbnail_url
                                            }}
                                            style={{
                                                width: 60,
                                                height: 60,
                                                marginRight: 6
                                            }}
                                        />
                                    ) : (
                                        <VRIcon
                                            type="home"
                                            size="xlg"
                                            styleOverride={{
                                                width: 60,
                                                height: 60,
                                                paddingTop: 2,
                                                paddingLeft: 2
                                                // marginRight: 6
                                            }}
                                        />
                                    )}
                                    <View>
                                        <VRText fontType="h4">
                                            {member.name}
                                        </VRText>
                                        <VRText>
                                            Active: {`${member.active}`}
                                        </VRText>
                                    </View>
                                </View>
                            );
                        })
                    ) : (
                        <VRText>No member information</VRText>
                    )}
                </View>
            )
        },
        {
            header: 'Profile',
            component: (
                <>
                    {profile ? (
                        <VRText styleOverride={{ paddingBottom: 20 }}>
                            {/* {`${template(profile)}`} */}
                            {profile}
                        </VRText>
                    ) : (
                        <VRText>No profile information</VRText>
                    )}
                </>
            )
        }
    ];

    if (loading) {
        return <VRLoading />;
    }

    return (
        <>
            <Pressable
                onPress={() => {
                    setImageModalOpen(true);
                    StatusBar.setHidden(true);
                }}
            >
                {images?.length ? (
                    <Image
                        source={{ uri: coverImage }}
                        style={{ width: WIDTH, height: HEIGHT / 4 }}
                    />
                ) : (
                    <View style={{ alignItems: 'center' }}>
                        <VRIcon type="users" size="xxxlg" />
                    </View>
                )}
            </Pressable>
            <VRContainer
                startAnimation={!!data.getArtist || !!error}
                refreshing={loading}
            >
                {images?.length ? (
                    <VRImageModal
                        images={images}
                        modalOpen={imageModalOpen}
                        setModalOpen={setImageModalOpen}
                    />
                ) : null}
                <VRText fontType="h2">{name}</VRText>
                <VRSegmented components={segmentedData} />
            </VRContainer>
        </>
    );
};

export default ArtistDetails;
