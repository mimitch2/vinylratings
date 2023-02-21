import React, { useState, Dispatch, SetStateAction } from 'react';
import { ActivityIndicator, Alert, Linking, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { VRModal } from 'components';

const VRWebViewModal = ({
    uri,
    discogsReviewsModalOpen,
    setDiscogsReviewsModalOpen
}: {
    uri: string;
    discogsReviewsModalOpen: boolean;
    setDiscogsReviewsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const [webViewLoading, setWebViewLoading] = useState(false);

    return (
        <VRModal
            title="Discogs Reviews"
            modalOpen={discogsReviewsModalOpen}
            setModalOpen={setDiscogsReviewsModalOpen}
            centerContent={false}
        >
            <View style={{ flex: 1 }}>
                {webViewLoading ? (
                    <ActivityIndicator
                        size="large"
                        style={{
                            height: '100%',
                            paddingBottom: '20%'
                        }}
                    />
                ) : null}
                <WebView
                    source={{
                        uri: `${uri}/reviews`
                    }}
                    onNavigationStateChange={({ loading: webLoading }) => {
                        setWebViewLoading(webLoading);
                    }}
                    onShouldStartLoadWithRequest={(event) => {
                        if (
                            event?.mainDocumentURL &&
                            !event.mainDocumentURL.includes(`${uri}/reviews`)
                        ) {
                            Alert.alert(
                                "We've intentionally restricted this view to just reviews.",
                                'Tap the Go To Discogs button to open this in your browser',
                                [
                                    {
                                        text: 'Got it!',
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'Go to Discogs',
                                        onPress: () =>
                                            Linking.openURL(`${uri}/reviews`)
                                    }
                                ]
                            );
                            return false;
                        } else {
                            return true;
                        }
                    }}
                />
            </View>
        </VRModal>
    );
};

export default VRWebViewModal;
