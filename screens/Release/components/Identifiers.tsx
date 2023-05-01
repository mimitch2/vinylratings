import React from 'react';
import { View, StyleSheet } from 'react-native';

import { DiscogsIdentifiers } from 'types';
import { VRText } from 'components';
import { COLORS } from 'styles';
import { Layout } from '@ui-kitten/components';

const Identifiers = ({
    identifiers
}: {
    identifiers: DiscogsIdentifiers[];
}) => {
    return (
        <Layout style={styles.container}>
            {identifiers.map((id) => {
                return (
                    <View style={styles.row} key={id.description || id.value}>
                        <VRText fontType="bold">
                            {`${id.type}: ${id.value}`}
                        </VRText>
                        {id.description ? (
                            <VRText>{id.description}</VRText>
                        ) : null}
                    </View>
                );
            })}
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: 200
    },
    row: {
        borderBottomColor: COLORS.primaryFaded,
        borderBottomWidth: 1,
        paddingVertical: 10
    }
});

export default Identifiers;
