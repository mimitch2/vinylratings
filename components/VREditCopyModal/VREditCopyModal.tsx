import React, { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Keyboard,
    View
} from 'react-native';
import {
    Calendar,
    Layout,
    Datepicker,
    Select,
    SelectItem,
    Button
} from '@ui-kitten/components';

import {
    VRModal,
    VRButton,
    VRFooter,
    VRText,
    VRSelect,
    VRInput,
    VRContainer,
    VRCalendarModal
} from 'components';
import { HEIGHT } from 'constants/index';
import { CustomFieldsValue, CustomFieldsValues } from 'types';

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
                            if (field.name === 'Washed On') {
                                return (
                                    <Button
                                        key={field.id}
                                        onPress={() =>
                                            setShowCalendarModal(true)
                                        }
                                    >
                                        {field.value || 'Not set'}
                                    </Button>
                                    // <Datepicker
                                    //     date={new Date()}
                                    //     key={field.id}
                                    //     label={() => (
                                    //         <VRText
                                    //             styleOverride={{
                                    //                 marginBottom: 5
                                    //             }}
                                    //         >
                                    //             {field.name}
                                    //         </VRText>
                                    //     )}
                                    //     onSelect={(pickedDate) => {
                                    //         console.log(
                                    //             pickedDate.toLocaleDateString()
                                    //         );
                                    //     }}
                                    //     placeholder={field.value || 'Not set'}
                                    //     max={new Date()}
                                    //     style={{
                                    //         marginTop: 20
                                    //     }}
                                    // />
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
