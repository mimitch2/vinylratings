import React, { useState } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { TabBar, Tab, Layout } from '@ui-kitten/components';

interface SegmentedProps {
    data: {
        label: string;
        value?: string | number;
        component?: React.ReactNode | React.ReactNode[];
    }[];
    onPress?: (value: any) => void;
    containerStyleOverride?: ViewStyle;
    labelStyleOverride?: ViewStyle;
}

const VRSegmented = ({
    data,
    onPress,
    containerStyleOverride = {},
    labelStyleOverride = {}
}: SegmentedProps) => {
    const [selectedIdx, setSelectedIdx] = useState(0);

    const handleOnPress = (idx: number) => {
        setSelectedIdx(idx);
        onPress && data[idx].value && onPress(data[idx].value);
    };

    return (
        <>
            <Layout style={styles.container}>
                <TabBar
                    selectedIndex={selectedIdx}
                    onSelect={(index) => handleOnPress(index)}
                    indicatorStyle={styles.indicator}
                >
                    {data.map(({ label }) => {
                        return <Tab key={label} title={label.toUpperCase()} />;
                    })}
                </TabBar>
            </Layout>
            {data?.[selectedIdx]?.component && (
                <Layout>{data[selectedIdx].component}</Layout>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 6
    },
    indicator: {
        width: '68%'
    }
});

export default VRSegmented;
