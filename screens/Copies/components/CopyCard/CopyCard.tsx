import React, { useState, useMemo, useReducer } from 'react';
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

// const createInitialState = (customFields: CustomFieldsValues) => {
//     const initialState: { [key: string]: string | number | undefined } = {};
//     customFields.forEach((field) => {
//         initialState[field.name] = field.value;
//     });

//     return initialState;
// };

const copyReducer = (
    state: { [key: string]: string | number | undefined },
    action: {
        type: string;
        payload?: {
            name: string;
            value: string | number | undefined;
        };
    }
) => {
    switch (action.type) {
        case 'UPDATE':
            return action.payload
                ? {
                      ...state,
                      [action.payload.name]: action.payload.value
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
