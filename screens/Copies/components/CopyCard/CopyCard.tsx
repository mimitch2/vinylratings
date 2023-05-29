import React, { useState, useCallback } from 'react';
import { StyleSheet, Image } from 'react-native';
import {
    IndexPath,
    Layout,
    Select,
    SelectItem,
    Card
} from '@ui-kitten/components';
import { Releases, CustomFields, Folder } from 'types';

import { VRText, VRContainer, VRButton, VREditCopyModal } from 'components';

const CopyCard = ({
    release,
    addWashedOn,
    removeFromCollection,
    washedOnLoading,
    customFields,
    folders,
    updateCustomField
}: {
    release: Releases;
    addWashedOn: any;
    removeFromCollection: () => void;
    washedOnLoading: boolean;
    customFields: CustomFields;
    folders: Folder[];
    updateCustomField: any;
}) => {
    const [washedOn, setWashedOn] = useState('');
    const [copyModalOpen, setCopyModalOpen] = useState(false);

    const folderName =
        folders?.find((folder) => {
            return +release?.folder_id === folder?.id ?? false;
        })?.name ?? 'Unknown';

    const getCustomFieldValues = useCallback(() => {
        return (
            customFields?.getCustomFields?.fields?.map((field) => {
                return {
                    ...field,
                    value: release?.notes?.find(
                        (note) => note.field_id === field.id
                    )?.value
                };
            }) ?? []
        );
    }, [release?.notes, customFields]);

    return (
        <Card style={styles.container} disabled>
            <VRButton
                title="Filed"
                onPress={() =>
                    updateCustomField({
                        variables: {
                            releaseId: +release?.id,
                            fieldId: 3,
                            value: 'test',
                            folderId: +release?.folder_id,
                            instanceId: +release?.instance_id
                        }
                    })
                }
                trackID="copy_card-wash_now"
                size="small"
                variant="basic"
                stacked={false}
                // containerStyle={{
                //     marginLeft: 10
                // }}
            />
            <Layout
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Layout>
                    <Layout style={{ flexDirection: 'row' }}>
                        <VRText fontType="bold">Folder: </VRText>
                        <VRText>{folderName}</VRText>
                    </Layout>
                    {getCustomFieldValues().map((field) => {
                        return (
                            <Layout
                                key={field.id}
                                style={{ flexDirection: 'row' }}
                            >
                                <VRText fontType="bold">{field.name}: </VRText>
                                <VRText>{field.value ?? 'Not set'}</VRText>
                            </Layout>
                        );
                    })}
                </Layout>
                {/* <Image
                    source={{ uri: release?.basic_information?.thumb }}
                    style={{ height: 75, width: 75 }}
                /> */}
            </Layout>
            {/* <Select
                selectedIndex={selectedIndex}
                onSelect={(index) => setSelectedIndex(index)}
            >
                <SelectItem title="Option 1" />
                <SelectItem title="Option 2" />
                <SelectItem title="Option 3" />
                <SelectItem title="Option 4" />
                <SelectItem title="Option 5" />
                <SelectItem title="Option 6" />
                <SelectItem title="Option 7" />
                <SelectItem title="Option 8" />
                <SelectItem title="Option 9" />
                <SelectItem title="Option 10" />
                <SelectItem title="Option 11" />
                <SelectItem title="Option 12" />
                <SelectItem title="Option 13" />
                <SelectItem title="Option 14" />
                <SelectItem title="Option 15" />
                <SelectItem title="Option 16" />
            </Select> */}
            <Layout style={{ flexDirection: 'row', marginTop: 20 }}>
                <VRButton
                    title="Edit"
                    onPress={() => setCopyModalOpen(true)}
                    trackID="copy_card-wash_now"
                    size="small"
                    variant="basic"
                    stacked={false}
                    // containerStyle={{
                    //     marginLeft: 10
                    // }}
                />
                <VRButton
                    title="Remove"
                    onPress={() => setCopyModalOpen(true)}
                    trackID="copy_card-wash_now"
                    size="small"
                    variant="basic"
                    stacked={false}
                    containerStyle={{
                        marginLeft: 10
                    }}
                />
            </Layout>

            <VREditCopyModal
                setModalOpen={setCopyModalOpen}
                modalOpen={copyModalOpen}
                loading={washedOnLoading}
                washedOn={washedOn}
                onDatePress={async (date) => {
                    const washedOnResponse = await addWashedOn({
                        variables: {
                            releaseId: +release?.id,
                            instanceId: +release?.instance_id,
                            washedOn: date
                        }
                    });

                    if (washedOnResponse?.data) {
                        setWashedOn(date);
                    }
                    setCopyModalOpen(false);
                }}
            />
        </Card>
    );
};
const styles = StyleSheet.create({
    container: {
        minHeight: 128
    }
});

export default CopyCard;
