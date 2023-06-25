import React, { useState, useMemo } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Card } from '@ui-kitten/components';
import {
    CollectionInstance,
    CustomFields,
    Folder,
    CustomFieldsValues
} from 'types';
import { useAddCopy } from 'hooks';

import { VRText, VRContainer, VRButton, VREditCopyModal } from 'components';

const useSelectState = (initialState = undefined) => {
    const [selectedIndex, setSelectedIndex] = useState(initialState);
    return { selectedIndex, onSelect: setSelectedIndex };
};

const CopyCard = ({
    release,
    removeFromCollection,
    customFields,
    folders,
    updateCustomField
}: {
    release: CollectionInstance;
    removeFromCollection: ({ instanceId }: { instanceId: string }) => void;
    customFields: CustomFields;
    folders: Folder[];
    updateCustomField: any;
}) => {
    const [copyModalOpen, setCopyModalOpen] = useState(false);

    const {
        instance_id: instanceId,
        date_added,
        folder_id: folderId,
        id: releaseId
    } = release;
    const folderName =
        folders?.find((folder) => {
            return +folderId === folder?.id ?? false;
        })?.name ?? 'Unknown';

    const dateAdded = new Date(date_added).toLocaleDateString();

    const customFieldValues = useMemo((): CustomFieldsValues => {
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
    }, [customFields, release?.notes]);

    // const submit = () => {
    //     addToCollection({
    //         instanceId,
    //         customFields: customFieldValues
    //     });
    // };

    return (
        <Card style={styles.container} disabled>
            <Layout
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Layout>
                    <Layout style={{ flexDirection: 'row' }}>
                        <VRText fontType="bold">Date added: </VRText>
                        <VRText>{dateAdded}</VRText>
                    </Layout>
                    <Layout style={{ flexDirection: 'row' }}>
                        <VRText fontType="bold">Folder: </VRText>
                        <VRText>{folderName}</VRText>
                    </Layout>

                    {customFieldValues.map((field) => {
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
                    onPress={() =>
                        removeFromCollection({
                            instanceId: release?.instance_id
                        })
                    }
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
                customFields={customFieldValues}
                modalOpen={copyModalOpen}
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
