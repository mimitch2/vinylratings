import React from 'react';
import {
    FlatList,
    View,
    ActivityIndicator,
    RefreshControl,
    StyleSheet
} from 'react-native';
import { useTheme } from '@react-navigation/native';

import { Theme } from 'constants/index';
import { VRArtistCard, VRReleaseCard, VRIcon, VRText } from 'components';
import {
    SearchTypes,
    ArtistSearch,
    Nav,
    Releases,
    VoidFuncNoParams
} from 'types';
import { getReleaseTags } from 'helpers';
import { PER_PAGE } from 'hooks';

type NextRoute = 'Release' | 'VersionRelease';

const LoadingMoreSpinner = ({ loadingMore }: { loadingMore: boolean }) => {
    return loadingMore ? (
        <View style={{ marginVertical: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View>
    ) : null;
};

const VRReleasesList = ({
    data,
    loading,
    reloading,
    loadingMore,
    navigation,
    onRefresh,
    onLoadMore,
    innerRef,
    sort,
    artist = null,
    perPage = PER_PAGE,
    inCollection = false,
    inWantList = false,
    isSearch = false,
    isVersions = false,
    nextRoute = 'Release'
}: {
    data: Releases[] | [];
    loading: boolean;
    reloading: boolean;
    loadingMore: boolean;
    navigation: Nav;
    onRefresh: VoidFuncNoParams;
    onLoadMore: VoidFuncNoParams;
    innerRef: React.RefObject<FlatList<any>>;
    sort: string;
    artist?: string | null;
    perPage?: number;
    inCollection?: boolean;
    inWantList?: boolean;
    isSearch?: boolean;
    isVersions?: boolean;
    nextRoute?: NextRoute;
}) => {
    const { colors }: Theme = useTheme();

    const onCardPress = ({ id, userData }: { id: number; userData: any }) => {
        const isInCollection = !!userData?.in_collection;
        const isInWantList = !!userData?.in_wantlist;

        navigation.navigate({
            name: 'Master',
            params: {
                id,
                inCollection: isInCollection ?? inCollection,
                inWantList: isInWantList ?? inWantList,
                isFromVersions: nextRoute === 'VersionRelease'
            }
        });
    };

    const renderArtistCard = ({ item }: { item: ArtistSearch }) => {
        const { id } = item;

        return (
            <VRArtistCard
                artist={item}
                onPress={() => {
                    navigation.navigate({
                        name: 'Artist',
                        params: {
                            id,
                            coverImage: item.cover_image
                        }
                    });
                }}
                disabled={loading || reloading || loadingMore}
            />
        );
    };

    const renderReleaseCard = ({ item }: { item: Releases }) => {
        const hasHeader = item?.header;
        const [genre] = item?.basic_information?.genres ?? 'Unknown';
        const userData = item?.basic_information?.user_data ?? {
            in_collection: inCollection,
            in_wantlist: inWantList
        };

        const tags =
            hasHeader || isSearch
                ? []
                : getReleaseTags({
                      item: item.basic_information,
                      isVersions
                  });

        return hasHeader ? (
            <View
                style={[
                    styles.headerContainer,
                    { backgroundColor: colors.background }
                ]}
            >
                <VRIcon
                    type="music"
                    color={colors.text}
                    size="sm"
                    styleOverride={styles.icon}
                />
                <VRText
                    fontWeight="500"
                    color={colors.text}
                    fontStyle="italic"
                    size={18}
                >
                    {genre}
                </VRText>
            </View>
        ) : (
            <VRReleaseCard
                artist={artist}
                key={item.id}
                onPress={() =>
                    onCardPress({
                        id: +item.id,
                        userData
                    })
                }
                release={item}
                tags={tags}
                disabled={loading || reloading || loadingMore}
            />
        );
    };

    const renderCard = ({ item }) => {
        if (item?.type === SearchTypes.ARTIST) {
            return renderArtistCard({ item });
        }

        return renderReleaseCard({ item });
    };

    const ListFooterComponent = (
        <LoadingMoreSpinner loadingMore={loadingMore} />
    );

    const stickyHeaderIndices: number[] = [];
    const getDataWithHeaders = () =>
        (data as Releases[]).reduce(
            (result: Releases[], release: Releases, idx: number) => {
                const [genre] = release?.basic_information?.genres ?? '';
                const [prevGenre] = result.length
                    ? result[idx - 1 + stickyHeaderIndices.length]
                          .basic_information.genres
                    : '';
                const isHeader = sort === 'genre/artist';

                if (isHeader && genre !== prevGenre) {
                    const headerIdx = !idx ? 0 : result.length;
                    stickyHeaderIndices.push(headerIdx);
                    result.push({ ...release, header: true });
                }

                result.push({ ...release, header: false });

                return result;
            },
            []
        );

    return (
        <FlatList
            ref={innerRef}
            style={{ marginBottom: 60 }}
            showsVerticalScrollIndicator={false}
            data={inWantList ? getDataWithHeaders() : data}
            renderItem={renderCard}
            keyExtractor={(item, idx) => `${item.id}-${idx}`}
            ListFooterComponent={ListFooterComponent}
            refreshing={loadingMore}
            onEndReached={onLoadMore}
            // onEndReachedThreshold={0.5}
            initialNumToRender={perPage}
            removeClippedSubviews
            // scrollEnabled={!loading}
            stickyHeaderIndices={stickyHeaderIndices}
            refreshControl={
                <RefreshControl
                    refreshing={reloading}
                    onRefresh={onRefresh}
                    colors={[colors.grey]}
                    tintColor={colors.grey}
                />
            }
        />
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6
    },
    icon: {
        marginRight: 10
    }
});

export default React.memo(VRReleasesList);
