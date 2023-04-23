import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { VRText } from 'components';
import { useColorTheme } from 'hooks';
import { Colors } from 'types';

const VRTag = ({
    tag,
    size = 'sm'
}: {
    tag: string | number;
    size: 'sm' | 'lg';
}) => {
    const backgroundColor = useColorTheme(Colors.primary);
    const isSmall = size === 'sm';

    return (
        <Layout
            style={[
                styles.view,
                {
                    backgroundColor,
                    paddingHorizontal: isSmall ? 8 : 9,
                    paddingVertical: isSmall ? 0 : 1,
                    marginBottom: !isSmall ? 5 : 0
                }
            ]}
        >
            <VRText fontType="label">{tag}</VRText>
        </Layout>
    );
};

const styles = StyleSheet.create({
    view: {
        borderRadius: 3,
        marginRight: 3
        // marginBottom: 10
    }
});

export default VRTag;
