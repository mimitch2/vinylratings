import React from 'react';
import {
    View,
    ActivityIndicator,
    RefreshControl,
    StyleSheet
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useTheme } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components';

import { Theme, PRESSED_OR_DISABLED_OPACITY } from 'constants/index';
import {
    VRArtistCard,
    VRReleaseCard,
    VRIcon,
    VRText,
    VRLoading
} from 'components';
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
type Item = ArtistSearch | Releases;

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
    innerRef: React.LegacyRef<FlashList<Releases>> | null;
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

    const onCardPress = ({
        id,
        userData,
        type
    }: {
        id: number;
        userData: any;
        type: string;
    }) => {
        const isInCollection = !!userData?.in_collection;
        const isInWantList = !!userData?.in_wantlist;

        navigation.navigate({
            name: type === SearchTypes.MASTER ? 'Master' : nextRoute,
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
        const type = item?.basic_information?.type ?? 'release';

        const tags =
            hasHeader || isSearch
                ? []
                : getReleaseTags({
                      item: item.basic_information,
                      isVersions
                  });

        return hasHeader ? (
            <Layout style={[styles.headerContainer]}>
                <VRIcon type="music" size="sm" styleOverride={styles.icon} />
                <VRText fontType="h6">{genre}</VRText>
            </Layout>
        ) : (
            <VRReleaseCard
                artist={artist}
                key={item.id}
                onPress={() =>
                    onCardPress({
                        id: +item.id,
                        userData,
                        type
                    })
                }
                release={item}
                tags={tags}
                disabled={loading || reloading || loadingMore}
            />
        );
    };

    const renderCard = ({ item }: { item: Item }) => {
        if ('type' in item && item?.type === SearchTypes.ARTIST) {
            return renderArtistCard({ item });
        }

        if ('basic_information' in item) {
            return renderReleaseCard({ item });
        }

        return null;
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
        <Layout style={{ height: '100%' }}>
            {loading && <VRLoading />}
            <Layout
                style={{
                    opacity: loading ? PRESSED_OR_DISABLED_OPACITY : 1,
                    height: '87%',
                    width: '100%',
                    marginBottom: 60
                }}
            >
                <FlashList
                    ref={innerRef}
                    showsVerticalScrollIndicator={false}
                    data={inWantList ? getDataWithHeaders() : data}
                    renderItem={renderCard}
                    keyExtractor={(item, idx) => `${item.id}-${idx}`}
                    ListFooterComponent={ListFooterComponent}
                    refreshing={loadingMore}
                    onEndReached={onLoadMore}
                    // scrollEnabled={!loading}
                    stickyHeaderIndices={stickyHeaderIndices}
                    estimatedItemSize={127}
                    refreshControl={
                        <RefreshControl
                            refreshing={reloading}
                            onRefresh={onRefresh}
                            colors={[colors.grey]}
                            tintColor={colors.grey}
                        />
                    }
                />
            </Layout>
        </Layout>
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
