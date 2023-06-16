import React, { useState, useMemo } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Card } from '@ui-kitten/components';
import {
    CollectionInstance,
    CustomFields,
    Folder,
    CustomFieldsValues
} from 'types';

import { VRText, VRContainer, VRButton, VREditCopyModal } from 'components';

const useSelectState = (initialState = undefined) => {
    const [selectedIndex, setSelectedIndex] = useState(initialState);
    return { selectedIndex, onSelect: setSelectedIndex };
};

const CopyCard = ({
    release,
    addWashedOn,
    removeFromCollection,
    washedOnLoading,
    customFields,
    folders,
    updateCustomField
}: {
    release: CollectionInstance;
    addWashedOn: any;
    removeFromCollection: ({
        instanceId
    }: {
        instanceId: string;
    }) => Promise<void>;
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

    const dateAdded = new Date(release?.date_added).toLocaleDateString();

    const getCustomFieldValues = useMemo((): CustomFieldsValues => {
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

    // }

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

                    {getCustomFieldValues.map((field) => {
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
                customFields={getCustomFieldValues}
                modalOpen={copyModalOpen}
                loading={washedOnLoading}
                washedOn={washedOn}
                onDatePress={async (date) => {
                    const washedOnResponse = await addWashedOn({
                        variables: {
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
