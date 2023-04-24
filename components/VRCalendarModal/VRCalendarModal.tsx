import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Calendar, Layout } from '@ui-kitten/components';

import { VRModal, VRButton, VRLoading } from 'components';
import { HEIGHT } from 'constants/index';

const VRCalendarModal = ({
    onDatePress,
    modalOpen,
    setModalOpen,
    loading
}: {
    onDatePress: (value: string) => void;
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    loading: boolean;
}) => {
    return (
        <VRModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            title="Pick a date"
        >
            <Layout
                style={{
                    flex: 1,
                    justifyContent: 'space-between'
                }}
            >
                <Layout>
                    <Calendar
                        onSelect={(pickedDate) => {
                            onDatePress(pickedDate.toLocaleDateString());
                        }}
                    />
                </Layout>
                <VRButton
                    containerStyle={{
                        marginBottom: 65
                    }}
                    title="Reset"
                    onPress={() => {
                        onDatePress('');
                        setModalOpen(false);
                    }}
                    trackID="calendar-modal-reset-button"
                    variant="primary"
                />
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
        </VRModal>
    );
};

export default VRCalendarModal;
