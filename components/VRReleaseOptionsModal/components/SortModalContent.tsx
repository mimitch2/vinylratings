import React, { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import {
    SORT_BY_OPTIONS_COLLECTION,
    SORT_BY_OPTIONS_WANT_LIST,
    SORT_BY_OPTIONS_ARTIST
} from 'constants/index';
import { VRText } from 'components';
import { VoidFuncNoParams } from 'types';

const SortModalContent = ({
    toggleSortModal,
    sort,
    setSort,
    isWantList,
    isArtistSearch = false
}: {
    toggleSortModal: VoidFuncNoParams;
    sort: string;
    setSort: Dispatch<SetStateAction<string>>;
    isWantList: boolean;
    isArtistSearch?: boolean;
}) => {
    const options = isWantList
        ? SORT_BY_OPTIONS_WANT_LIST
        : isArtistSearch
        ? SORT_BY_OPTIONS_ARTIST
        : SORT_BY_OPTIONS_COLLECTION;

    return (
        <View style={styles.list}>
            {options.map(({ value, label }) => {
                const isSelected = sort === value;
                const color = isSelected ? 'primary' : 'basic';
                const fontType = isSelected ? 'bold' : 'normal';

                return (
                    <Pressable
                        key={value}
                        onPress={() => {
                            toggleSortModal();
                            setSort(value);
                        }}
                        style={styles.listItem}
                    >
                        <VRText
                            styleOverride={styles.listItemText}
                            fontType={fontType}
                            status={color}
                        >
                            {label}
                        </VRText>
                    </Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        marginTop: 20
    },
    listItem: {
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItemText: {
        marginRight: 10,
        fontSize: 18
    }
});

export default SortModalContent;
