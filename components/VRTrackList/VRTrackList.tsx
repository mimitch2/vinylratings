import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { DiscogsTrackList } from 'types';
import { VRText } from 'components';
import { ThemeColors } from 'styles';

const VRTrackList = ({ tracklist }: { tracklist: DiscogsTrackList[] }) => {
    const { colors } = useTheme();
    const { rowStyle, titleStyle } = styles(colors);

    return (
        <>
            {tracklist.map(({ position, title, duration }, idx) => {
                return (
                    <View style={rowStyle} key={`${position}-${idx}`}>
                        <View style={titleStyle}>
                            {position ? (
                                <VRText>{`${position} - `}</VRText>
                            ) : null}
                            <VRText>{title}</VRText>
                        </View>
                        <View>
                            <VRText>{duration}</VRText>
                        </View>
                    </View>
                );
            })}
        </>
    );
};

const styles = (colors: ThemeColors) =>
    StyleSheet.create({
        rowStyle: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 6,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.textFaded,
            flexShrink: 1
        },
        titleStyle: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexShrink: 1
        }
    });

export default VRTrackList;
