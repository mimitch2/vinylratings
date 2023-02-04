import React from 'react';
import { View, StyleSheet } from 'react-native';

import { DiscogsIdentifiers } from 'types';
import { VRText } from 'components';
import { COLORS } from '../../../styles';

const Identifiers = ({
    identifiers
}: {
    identifiers: DiscogsIdentifiers[];
}) => {
    return (
        <>
            {identifiers.map((id) => {
                return (
                    <View style={styles.row} key={id.description || id.value}>
                        <VRText fontWeight="bold">
                            {`${id.type}: ${id.value}`}
                        </VRText>
                        {id.description ? (
                            <VRText>{id.description}</VRText>
                        ) : null}
                    </View>
                );
            })}
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        borderBottomColor: COLORS.primaryFaded,
        borderBottomWidth: 1,
        paddingVertical: 10
    }
});

export default Identifiers;
