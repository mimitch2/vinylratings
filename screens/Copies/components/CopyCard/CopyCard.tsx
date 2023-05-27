import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

import { VRText, VRContainer, VRButton, VRCalendarModal } from 'components';

const CopyCard = ({ release, addWashedOn, removeFromCollection }) => {
    const { instanceId } = release;

    const [washedOn, setWashedOn] = useState('');
    const [calendarModalOpen, setCalendarModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
        new IndexPath(0)
    );

    return (
        <Layout style={styles.container}>
            {/* <Select
                selectedIndex={selectedIndex}
                onSelect={(index) => setSelectedIndex(index)}
            >
                <SelectItem title="Option 1" />
                <SelectItem title="Option 2" />
                <SelectItem title="Option 3" />
                <SelectItem title="Option 4" />
                <SelectItem title="Option 5" />
                <SelectItem title="Option 6" />
                <SelectItem title="Option 7" />
                <SelectItem title="Option 8" />
                <SelectItem title="Option 9" />
                <SelectItem title="Option 10" />
                <SelectItem title="Option 11" />
                <SelectItem title="Option 12" />
                <SelectItem title="Option 13" />
                <SelectItem title="Option 14" />
                <SelectItem title="Option 15" />
                <SelectItem title="Option 16" />
            </Select> */}
            <VRButton
                title={
                    washedOn ? `Washed on: ${washedOn}` : 'Set washed on date'
                }
                onPress={() => setCalendarModalOpen(true)}
                trackID="release_screen-wash_now"
                size="tiny"
                variant="basic"
                stacked={false}
                containerStyle={{
                    marginLeft: 10
                }}
            />

            <VRCalendarModal
                setModalOpen={setCalendarModalOpen}
                modalOpen={calendarModalOpen}
                loading={washedOnLoading}
                onDatePress={async (date) => {
                    const washedOnResponse = await addWashedOn({
                        variables: {
                            releaseId: +id,
                            instanceId,
                            washedOn: date
                            // title,
                            // artist: artists[0].name
                        }
                    });

                    if (washedOnResponse?.data) {
                        setWashedOn(date);
                    }
                    setCalendarModalOpen(false);
                }}
            />
        </Layout>
    );
};
const styles = StyleSheet.create({
    container: {
        minHeight: 128
    }
});

export default CopyCard;
