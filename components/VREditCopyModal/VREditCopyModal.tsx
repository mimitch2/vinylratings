import React, { useState, useContext } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Keyboard,
    View,
    Pressable
} from 'react-native';
import { Layout } from '@ui-kitten/components';

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
import { CustomFieldsValue, CustomFieldsValues, Colors } from 'types';
import { UserContext } from 'context';
import { useColorTheme } from 'hooks';

const DatePickerSwitch = ({
    onPress,
    renderDatePicker
}: {
    onPress: React.Dispatch<React.SetStateAction<boolean>>;
    renderDatePicker: boolean;
}) => {
    const activeColor = useColorTheme(Colors.primary);

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
                <VRIcon type="calendar" size="sm" />
            </Pressable>
            <Pressable
                onPress={() => {
                    onPress(false);
                }}
            >
                <VRIcon type="edit" size="sm" />
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
    isEdit = false
}: {
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    loading?: boolean;
    animationType?: 'slide' | 'fade' | 'none';
    customFields: CustomFieldsValues;
    isEdit?: boolean;
}) => {
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [renderDatePicker, setRenderDatePicker] = useState(true);
    const [datePickerPressed, setDatePickerPressed] = useState(false);
    const { user } = useContext(UserContext);

    const darkBackground = useColorTheme(Colors.backgroundDark);
    const backgroundColor = useColorTheme(Colors.background);
    const borderColor = useColorTheme(Colors.border);

    return (
        <VRModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            title={isEdit ? 'Edit Your Copy' : 'Add to Collection'}
            animationType={animationType}
            centerContent={false}
        >
            <VRContainer>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    {customFields.map((field: CustomFieldsValue) => {
                        if (field.type === 'dropdown') {
                            return <VRSelect field={field} key={field.id} />;
                        }

                        if (field.type === 'textarea') {
                            if (field.name === user?.washedOnField) {
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
                                                <VRText>Hello</VRText>
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
                                        value={field.value || ''}
                                        label={field.name}
                                        handleTextChange={(value) => {
                                            console.log('value', value);
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
                                        value={field.value || ''}
                                        label={field.name}
                                        handleTextChange={(value) => {
                                            console.log('value', value);
                                        }}
                                        multiline={
                                            field?.lines && field.lines > 1
                                                ? true
                                                : false
                                        }
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
            <VRCalendarModal
                modalOpen={showCalendarModal}
                setModalOpen={setShowCalendarModal}
                onDatePress={(date) => console.log(date)}
            />
            <VRFooter styleOverride={{ marginBottom: 60 }}>
                <VRButton
                    containerStyle={{ width: '100%' }}
                    title="Save"
                    onPress={() => {
                        setModalOpen(false);
                    }}
                    trackID="calendar-modal-reset-button"
                    variant="primary"
                />
            </VRFooter>
        </VRModal>
    );
};

export default VREditCopyModal;
