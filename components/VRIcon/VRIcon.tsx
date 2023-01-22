import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { IconType, IconSize } from 'src/types';
import {
    Asc,
    Barcode,
    Check,
    ChevronRight,
    Close,
    Desc,
    Error,
    Filter,
    Flashlight,
    Folder,
    Home,
    Music,
    QuestionMark,
    Search,
    Sort,
    StarEmpty,
    StarFull,
    StarHalf,
    UserCollection,
    Want,
    Warning
} from './Icons';
export interface IconProps {
    size: number;
    color: string;
}
type SVGMap = {
    [key in IconType]: React.FC<IconProps>;
};

export const SVG_MAP: SVGMap = {
    asc: Asc,
    barcode: Barcode,
    check: Check,
    chevronRight: ChevronRight,
    close: Close,
    collection: UserCollection,
    desc: Desc,
    error: Error,
    filter: Filter,
    flashlight: Flashlight,
    folder: Folder,
    home: Home,
    music: Music,
    questionMark: QuestionMark,
    search: Search,
    sort: Sort,
    starEmpty: StarEmpty,
    starFull: StarFull,
    starHalf: StarHalf,
    want: Want,
    warning: Warning
};

const SIZE_MAP = {
    xsm: 16,
    sm: 20,
    md: 25,
    lg: 30,
    xlg: 40,
    xxlg: 50
};

const VRIcon = ({
    color = null,
    size = 'md',
    styleOverride = {},
    type,
    testID = null
}: {
    color?: string | null;
    size?: IconSize;
    styleOverride?: ViewStyle;
    type: IconType;
    testID?: string | null;
}) => {
    const { colors } = useTheme();

    const Icon: React.FC<IconProps> = SVG_MAP[type];
    const targetColor = color ?? colors.text;

    return (
        <View style={styleOverride} testID={testID || 'vr-icon'}>
            <Icon size={SIZE_MAP[size]} color={targetColor} />
        </View>
    );
};

export default VRIcon;
