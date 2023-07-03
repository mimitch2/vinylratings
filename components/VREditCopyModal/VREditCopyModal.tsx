import React, { useState, useContext, useCallback } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Pressable
} from 'react-native';
import { Layout, Select, SelectItem, IndexPath } from '@ui-kitten/components';

import {
    VRModal,
    VRButton,
    VRFooter,
    VRText,
    VRSelect,
    VRInput,
    VRContainer,
    VRCalendarModal,
    VRIcon
} from 'components';
import { HEIGHT } from 'constants/index';
import {
    CustomFieldsValue,
    CustomFieldsValues,
    Colors,
    Folder,
    CopyState,
    CopyAction
} from 'types';
import { useColorTheme } from 'hooks';
import { UserContext } from 'context';

let washedOnId: number | null = null;
let washedOnName: string | null = null;

const DatePickerSwitch = ({
    onPress,
    renderDatePicker
}: {
    onPress: React.Dispatch<React.SetStateAction<boolean>>;
    renderDatePicker: boolean;
}) => {
    return (
        <Layout
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 12
            }}
        >
            <Pressable
                onPress={() => {
                    onPress(true);
                }}
                style={{
                    marginHorizontal: 10
                }}
            >
                <VRIcon
                    type="calendar"
                    size="sm"
                    color={renderDatePicker ? Colors.primary : Colors.basic}
                />
            </Pressable>
            <Pressable
                onPress={() => {
                    onPress(false);
                }}
            >
                <VRIcon
                    type="edit"
                    size="sm"
                    color={renderDatePicker ? Colors.basic : Colors.primary}
                />
            </Pressable>
        </Layout>
    );
};

const VREditCopyModal = ({
    modalOpen,
    setModalOpen,
    loading = false,
    animationType = 'slide',
    customFields,
    isEdit = false,
    folders,
    folderName,
    copyState,
    dispatch,
    setNewFolderId,
    submitCustomFields,
    updateCustomFieldsLoading
}: {
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    loading?: boolean;
    animationType?: 'slide' | 'fade' | 'none';
    customFields: CustomFieldsValues;
    isEdit?: boolean;
    folders: Folder[];
    folderName: string;
    copyState: CopyState;
    dispatch: React.Dispatch<CopyAction>;
    setNewFolderId: React.Dispatch<React.SetStateAction<number | null>>;
    submitCustomFields: () => Promise<void>;
    updateCustomFieldsLoading: boolean;
}) => {
    const disabled = !Object.keys(copyState).length;
    const valueToOptionIndex = folders.findIndex(
        (folder) => folder.name === folderName
    );
    const [selectedFolderIdx, setSelectedFolderIdx] = useState<
        IndexPath | IndexPath[]
    >(new IndexPath(valueToOptionIndex));
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [renderDatePicker, setRenderDatePicker] = useState(true);
    const [datePickerPressed, setDatePickerPressed] = useState(false);
    const { user } = useContext(UserContext);

    const darkBackground = useColorTheme(Colors.backgroundDark);
    const backgroundColor = useColorTheme(Colors.background);
    const borderColor = useColorTheme(Colors.border);

    const handleChange = (
        fieldName: string,
        fieldId: number,
        value: string | number
    ) => {
        dispatch({
            type: 'UPDATE',
            payload: {
                fieldName,
                fieldId,
                value
            }
        });
    };

    return (
        <VRModal
            modalOpen={modalOpen}
            setModalOpen={(value) => {
                dispatch({ type: 'RESET' });
                setSelectedFolderIdx(new IndexPath(valueToOptionIndex));
                setModalOpen(value);
            }}
            title={isEdit ? 'Edit Your Copy' : 'Add to Collection'}
            animationType={animationType}
            centerContent={false}
        >
            <VRContainer>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <Select
                        selectedIndex={selectedFolderIdx}
                        onSelect={(index) => {
                            setSelectedFolderIdx(index);
                            setNewFolderId(
                                folders[(index as IndexPath).row].id
                            );
                        }}
                        label={() => (
                            <VRText
                                styleOverride={{
                                    marginBottom: 5,
                                    marginTop: 10
                                }}
                            >
                                Folder
                            </VRText>
                        )}
                        value={() => (
                            <VRText>
                                {
                                    folders[
                                        (selectedFolderIdx as IndexPath).row
                                    ].name
                                }
                            </VRText>
                        )}
                    >
                        {folders.map((folder) => (
                            <SelectItem key={folder.id} title={folder.name} />
                        ))}
                    </Select>
                    {customFields.map((field: CustomFieldsValue) => {
                        if (field.type === 'dropdown') {
                            return (
                                <VRSelect
                                    field={field}
                                    key={field.id}
                                    onSelect={(value) => {
                                        handleChange(
                                            field.name,
                                            field.id,
                                            value
                                        );
                                    }}
                                />
                            );
                        }

                        if (field.type === 'textarea') {
                            if (field.name === user?.washedOnField) {
                                washedOnId = field.id;
                                washedOnName = field.name;

                                return renderDatePicker ? (
                                    <Layout
                                        key={field.id}
                                        style={{
                                            marginTop: 10
                                        }}
                                    >
                                        <VRText
                                            styleOverride={{
                                                marginBottom: 5
                                            }}
                                        >
                                            {field.name}
                                        </VRText>
                                        <Layout
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'flex-end'
                                            }}
                                        >
                                            <Pressable
                                                key={field.id}
                                                onPressIn={() => {
                                                    setDatePickerPressed(true);
                                                }}
                                                onPressOut={() => {
                                                    setDatePickerPressed(false);
                                                    setShowCalendarModal(true);
                                                }}
                                                style={{
                                                    height: 40,
                                                    backgroundColor:
                                                        datePickerPressed
                                                            ? backgroundColor
                                                            : darkBackground,
                                                    borderWidth: 1,
                                                    padding: 10,
                                                    borderColor: borderColor,
                                                    flex: 1
                                                }}
                                            >
                                                <VRText>
                                                    {copyState[field.name]
                                                        ?.value ??
                                                        field.value ??
                                                        ''}
                                                </VRText>
                                            </Pressable>
                                            <DatePickerSwitch
                                                onPress={setRenderDatePicker}
                                                renderDatePicker={
                                                    renderDatePicker
                                                }
                                            />
                                        </Layout>
                                    </Layout>
                                ) : (
                                    <VRInput
                                        key={field.id}
                                        value={
                                            (copyState[field.name]
                                                ?.value as string) ??
                                            field.value ??
                                            ''
                                        }
                                        label={field.name}
                                        onChange={(value) => {
                                            handleChange(
                                                field.name,
                                                field.id,
                                                value
                                            );
                                        }}
                                        controlRight={
                                            <DatePickerSwitch
                                                onPress={setRenderDatePicker}
                                                renderDatePicker={
                                                    renderDatePicker
                                                }
                                            />
                                        }
                                    />
                                );
                            } else {
                                return (
                                    <VRInput
                                        key={field.id}
                                        value={
                                            (copyState[field.name]
                                                ?.value as string) ??
                                            field.value ??
                                            ''
                                        }
                                        label={field.name}
                                        onChange={(value) => {
                                            handleChange(
                                                field.name,
                                                field.id,
                                                value
                                            );
                                        }}
                                        // TODO: uncomment when multiline is fixed
                                        //  https://github.com/facebook/react-native/pull/37958
                                        // multiline={
                                        //     !!(field?.lines && field.lines > 1)
                                        // }
                                    />
                                );
                            }
                        }
                    })}
                </KeyboardAvoidingView>
            </VRContainer>

            {loading && (
                <Layout
                    style={{
                        position: 'absolute',
                        height: HEIGHT,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: 0.5
                    }}
                >
                    <ActivityIndicator
                        size="large"
                        style={{
                            marginBottom: 60
                        }}
                    />
                </Layout>
            )}
            {user?.washedOnField && (
                <VRCalendarModal
                    date={new Date()}
                    modalOpen={showCalendarModal}
                    setModalOpen={setShowCalendarModal}
                    onDatePress={(date) => {
                        handleChange(
                            washedOnName as string,
                            washedOnId as number,
                            date
                        );
                    }}
                />
            )}
            <VRFooter styleOverride={{ marginBottom: 60 }}>
                <VRButton
                    containerStyle={{ width: '100%' }}
                    title="Save"
                    onPress={async () => {
                        await submitCustomFields();
                        setModalOpen(false);
                    }}
                    trackID="calendar-modal-reset-button"
                    variant="primary"
                    disabled={disabled || loading}
                    loading={loading || updateCustomFieldsLoading}
                />
            </VRFooter>
        </VRModal>
    );
};

export default React.memo(VREditCopyModal);
