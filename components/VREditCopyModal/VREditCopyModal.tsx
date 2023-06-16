import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import {
    Calendar,
    Layout,
    Datepicker,
    Select,
    SelectItem
} from '@ui-kitten/components';

import {
    VRModal,
    VRButton,
    VRFooter,
    VRText,
    VRSelect,
    VRInput
} from 'components';
import { HEIGHT } from 'constants/index';
import { CustomFieldsValue, CustomFieldsValues } from 'types';

const VREditCopyModal = ({
    onDatePress,
    modalOpen,
    setModalOpen,
    loading,
    animationType = 'slide',
    washedOn,
    customFields
}: {
    onDatePress: (value: string) => void;
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    loading: boolean;
    animationType?: 'slide' | 'fade' | 'none';
    washedOn: string;
    customFields: CustomFieldsValues;
}) => {
    console.log(
        '🚀 ~ file: VREditCopyModal.tsx:39 ~ customFields:',
        customFields
    );
    return (
        <VRModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            title="Edit Your Copy"
            animationType={animationType}
            centerContent={false}
        >
            <Layout
                style={{
                    flex: 1,
                    padding: 20
                }}
            >
                {customFields.map((field: CustomFieldsValue) => {
                    if (field.type === 'dropdown') {
                        return <VRSelect field={field} key={field.id} />;
                    }

                    if (field.type === 'textarea') {
                        if (field.name === 'Washed On') {
                            return (
                                <Datepicker
                                    label={() => (
                                        <VRText
                                            styleOverride={{ marginBottom: 5 }}
                                        >
                                            field.name
                                        </VRText>
                                    )}
                                    onSelect={(pickedDate) => {
                                        onDatePress(
                                            pickedDate.toLocaleDateString()
                                        );
                                    }}
                                    placeholder={field.value || 'Not set'}
                                    max={new Date()}
                                    style={{
                                        marginTop: 20,
                                        flex: 1
                                    }}
                                />
                            );
                        } else {
                            return (
                                <VRInput
                                    value={field.value || 'Not set'}
                                    label={field.name}
                                    handleTextChange={(value) => {
                                        console.log('value', value);
                                    }}
                                />
                            );
                        }
                    }
                })}
            </Layout>
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
            <VRFooter styleOverride={{ marginBottom: 60 }}>
                <VRButton
                    containerStyle={{ width: '100%' }}
                    title="Save"
                    onPress={() => {
                        onDatePress('');
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
