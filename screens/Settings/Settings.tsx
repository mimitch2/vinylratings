import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useMutation, gql } from '@apollo/client';

import { Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { UserContext } from 'context';
import {
    VRContainer,
    VRText,
    VRDivider,
    VRLoading,
    VRFooter,
    VRButton,
    VRInfo
} from 'components';
import { globalStyles } from 'styles';
import { useCustomFields } from 'hooks';
import { User } from 'types';

const UPDATE_USER_MUTATION = gql`
    mutation UpdateUser($key: String!, $value: String!) {
        updateUser(key: $key, value: $value) {
            username
            washedOnField
        }
    }
`;

const SettingsRow = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <VRDivider />
            <Layout style={globalStyles.row}>{children}</Layout>
            <VRDivider />
        </>
    );
};

const Settings = () => {
    const [washedOnSelectedIdx, setWashedOnSelectedIdx] = useState<IndexPath>(
        new IndexPath(0)
    );
    const { user, setUser } = useContext(UserContext);
    const {
        data: customFields,
        loading: customFieldsLoading,
        error: customFieldsError
    } = useCustomFields();

    const [
        updateUser,
        { data: updateUserReturnedData, loading: updateUserLoading }
    ] = useMutation(UPDATE_USER_MUTATION);

    const fields = customFields?.getCustomFields?.fields;
    const textAreaFieldNames = fields
        ? [
              'Not set',
              ...fields
                  .filter((field) => field.type === 'textarea')
                  .map((mappedField) => mappedField.name)
          ]
        : [];
    const washedOnFieldIdx = textAreaFieldNames.indexOf(
        user?.washedOnField as string
    );
    const initialWashedOnIdx = washedOnFieldIdx === -1 ? 0 : washedOnFieldIdx;

    useEffect(() => {
        if (!customFieldsLoading) {
            setWashedOnSelectedIdx(new IndexPath(initialWashedOnIdx));
        }
    }, [initialWashedOnIdx, customFieldsLoading]);

    const handleUpdateUser = async () => {
        const variables = {
            key: 'washedOnField',
            value: washedOnSelectedIdx.row
                ? textAreaFieldNames[washedOnSelectedIdx.row]
                : ''
        };
        await updateUser({
            variables,
            refetchQueries: ['GetUser']
        });

        setUser({
            ...(user as User),
            [variables.key]: variables.value
        });
    };

    return (
        <>
            <VRContainer>
                {customFieldsLoading ? (
                    <VRLoading />
                ) : (
                    <SettingsRow>
                        <Layout style={styles.title}>
                            <VRText
                                fontType="h6"
                                styleOverride={{ marginRight: 3 }}
                            >
                                Washed on field name
                            </VRText>
                            <VRInfo
                                onPress={() => {
                                    console.log('info pressed');
                                }}
                            />
                        </Layout>
                        <Select
                            selectedIndex={washedOnSelectedIdx}
                            onSelect={(idx) =>
                                setWashedOnSelectedIdx(idx as IndexPath)
                            }
                            value={() => (
                                <VRText>
                                    {washedOnSelectedIdx
                                        ? textAreaFieldNames[
                                              washedOnSelectedIdx.row
                                          ]
                                        : 'Not set'}
                                </VRText>
                            )}
                        >
                            {textAreaFieldNames.map((mappedField) => (
                                <SelectItem
                                    key={mappedField}
                                    title={mappedField}
                                />
                            ))}
                        </Select>
                    </SettingsRow>
                )}
            </VRContainer>
            <VRFooter>
                <VRButton
                    trackID="settings_screen-update"
                    title="Update"
                    onPress={handleUpdateUser}
                />
            </VRFooter>
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default Settings;
