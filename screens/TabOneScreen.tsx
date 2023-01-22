import { StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import EditScreenInfo from 'components/EditScreenInfo';
import { Text, View } from 'components/Themed';
import { RootTabScreenProps } from 'types';
import { VRIcon } from 'components/';
import { COLORS, FONTS } from 'constants';

export const GET_FOLDERS = gql`
    query GetFolders {
        getFolders {
            id
            name
            count
        }
    }
`;

export default function TabOneScreen({
    navigation
}: RootTabScreenProps<'TabOne'>) {
    const { data, loading } = useQuery(GET_FOLDERS);

    if (loading) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <VRIcon type="close" size="xlg" />
            <EditScreenInfo path="/screens/TabOneScreen.tsx" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    }
});
