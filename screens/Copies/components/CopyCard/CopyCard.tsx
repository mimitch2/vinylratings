import React, { useState, useMemo, useReducer } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Card } from '@ui-kitten/components';
import {
    CollectionInstance,
    CustomFields,
    Folder,
    CustomFieldsValues,
    CopyState,
    CopyAction
} from 'types';
import { useUpdateCustomFields } from 'hooks';

import { VRText, VRButton, VREditCopyModal } from 'components';

const copyReducer = (state: CopyState, action: CopyAction) => {
    switch (action.type) {
        case 'UPDATE':
            return action.payload
                ? {
                      ...state,
                      [action.payload.fieldName]: {
                          fieldId: action.payload.fieldId,
                          value: action.payload.value
                      }
                  }
                : {};
        case 'RESET':
            return {};
        default:
            return state;
    }
};

const CopyCard = ({
    release,
    removeFromCollection,
    customFields,
    folders
}: {
    release: CollectionInstance;
    removeFromCollection: ({ instanceId }: { instanceId: string }) => void;
    customFields: CustomFields;
    folders: Folder[];
}) => {
    const [copyModalOpen, setCopyModalOpen] = useState(false);
    const [newFolderId, setNewFolderId] = useState<number | null>(null);
    const {
        submitUpdateCopy,
        loading: updateCustomFieldsLoading,
        error: updateCustomFieldsError
    } = useUpdateCustomFields();

    const {
        instance_id: instanceId,
        date_added,
        folder_id: folderId,
        id: releaseId
    } = release;

    const folderName =
        folders?.find((folder) => {
            return +folderId === folder?.id;
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

    const [copyState, dispatch] = useReducer(copyReducer, {});

    const handleSubmitUpdateCopy = async () => {
        await submitUpdateCopy({
            copyState,
            folderId,
            instanceId,
            releaseId,
            newFolderId
        });
    };

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
                                <VRText fontType="bold">{`${field.name}: `}</VRText>
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
                    trackID="copy_card-edit_copy"
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
                    trackID="copy_card-remove_copy"
                    size="small"
                    variant="basic"
                    stacked={false}
                    containerStyle={{
                        marginLeft: 10
                    }}
                />
            </Layout>

            <VREditCopyModal
                loading={updateCustomFieldsLoading}
                copyState={copyState}
                dispatch={dispatch}
                modalOpen={copyModalOpen}
                setModalOpen={setCopyModalOpen}
                customFields={customFieldValues}
                isEdit
                folders={folders}
                folderName={folderName}
                newFolderId={newFolderId}
                setNewFolderId={setNewFolderId}
                handleSubmitUpdateCopy={handleSubmitUpdateCopy}
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
