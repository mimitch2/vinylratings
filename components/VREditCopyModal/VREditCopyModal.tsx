import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Calendar, Layout, Datepicker } from '@ui-kitten/components';

import { VRModal, VRButton } from 'components';
import { HEIGHT } from 'constants/index';

const VREditCopyModal = ({
    onDatePress,
    modalOpen,
    setModalOpen,
    loading,
    animationType = 'slide',
    washedOn
}: {
    onDatePress: (value: string) => void;
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    loading: boolean;
    animationType?: 'slide' | 'fade' | 'none';
    washedOn: string;
}) => {
    return (
        <VRModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            title="Pick a date"
            animationType={animationType}
        >
            <Layout
                style={{
                    flex: 1,
                    justifyContent: 'space-between'
                }}
            >
                <Layout>
                    <Datepicker
                        onSelect={(pickedDate) => {
                            onDatePress(pickedDate.toLocaleDateString());
                        }}
                        placeholder={washedOn || 'Never'}
                        max={new Date()}
                        style={{
                            marginTop: 20
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

export default VREditCopyModal;
