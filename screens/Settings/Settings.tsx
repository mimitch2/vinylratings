import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';

import {
    VRContainer,
    VRText,
    VRSelect,
    VRDivider,
    VRLoading
} from 'components';
import { globalStyles } from 'styles';
import { useCustomFields } from 'hooks';
import { CustomFields } from 'types';

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
    const [washedOnSelectedIdx, setWashedOnSelectedIdx] = useState<
        IndexPath | IndexPath[]
    >(new IndexPath(0));
    const {
        data: customFields,
        loading: customFieldsLoading,
        error: customFieldsError
    } = useCustomFields();

    const fields = customFields?.getCustomFields?.fields;
    const textAreaFieldNames = fields
        ? [
              'Not set',
              ...fields
                  .filter((field) => field.type === 'textarea')
                  .map((mappedField) => mappedField.name)
          ]
        : [];

    return (
        <VRContainer>
            {customFieldsLoading ? (
                <VRLoading />
            ) : (
                <SettingsRow>
                    <VRText fontType="h5">Washed on field name</VRText>
                    <Select
                        selectedIndex={washedOnSelectedIdx}
                        onSelect={(idx) => setWashedOnSelectedIdx(idx)}
                        value={() => (
                            <VRText>
                                {washedOnSelectedIdx
                                    ? textAreaFieldNames[
                                          (washedOnSelectedIdx as IndexPath).row
                                      ]
                                    : 'Not set'}
                            </VRText>
                        )}
                    >
                        {textAreaFieldNames.map((mappedField) => (
                            <SelectItem key={mappedField} title={mappedField} />
                        ))}
                    </Select>
                </SettingsRow>
            )}
        </VRContainer>
    );
};

export default Settings;
