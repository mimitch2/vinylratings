import React from 'react';
import { Modal } from 'react-native';

import { CameraScreenV2 } from 'src/components/camera';

const CameraModal = ({
    showCamera,
    setShowCamera,
    onBarCodeRead
}: {
    showCamera: boolean;
    setShowCamera: React.Dispatch<React.SetStateAction<boolean>>;
    onBarCodeRead: (value: string | number) => void;
}) => {
    const handleReadCode = ({
        nativeEvent
    }: {
        nativeEvent: { codeStringValue: string | undefined };
    }) => {
        setShowCamera(false);
        onBarCodeRead(nativeEvent?.codeStringValue?.toString() ?? '');
    };

    return (
        <Modal animationType="slide" visible={showCamera}>
            <CameraScreenV2
                onBottomButtonPressed={() => {
                    setShowCamera(false);
                }}
                onReadCode={handleReadCode}
            />
        </Modal>
    );
};

export default CameraModal;
