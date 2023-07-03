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
import { useUpdateCustomFields, useUpdateInstanceFolder } from 'hooks';

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
        updateCustomFields,
        loading: updateCustomFieldsLoading,
        error: updateCustomFieldsError
    } = useUpdateCustomFields();
    const {
        updateInstanceFolder,
        loading: updateInstanceFolderLoading,
        error: updateInstanceFolderError
    } = useUpdateInstanceFolder();

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

    const submitUpdateCopy = async () => {
        const promises = [];
        const values = Object.values(copyState).map((field) => ({
            fieldId: field.fieldId,
            value: field.value
        }));

        if (values.length) {
            promises.push(
                updateCustomFields({
                    variables: {
                        folderId: +folderId,
                        instanceId: +instanceId,
                        releaseId: +releaseId,
                        values
                    },
                    refetchQueries: !newFolderId
                        ? ['IsInCollection']
                        : undefined
                })
            );
        }

        if (newFolderId) {
            promises.push(
                updateInstanceFolder({
                    variables: {
                        instanceId: +instanceId,
                        folderId: +newFolderId,
                        releaseId: +releaseId,
                        newFolderId: +newFolderId
                    },
                    refetchQueries: ['IsInCollection']
                })
            );
        }

        if (!promises.length) {
            return;
        }

        await Promise.all(promises);
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
                copyState={copyState}
                dispatch={dispatch}
                setModalOpen={setCopyModalOpen}
                customFields={customFieldValues}
                modalOpen={copyModalOpen}
                isEdit
                folders={folders}
                folderName={folderName}
                setNewFolderId={setNewFolderId}
                submitUpdateCopy={submitUpdateCopy}
                updateCustomFieldsLoading={
                    updateCustomFieldsLoading || updateInstanceFolderLoading
                }
                newFolderId={newFolderId}
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
