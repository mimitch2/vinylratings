import React from 'react';
import { ViewStyle } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { IconType, IconSize, Colors } from 'types';
import { useColorTheme } from 'hooks';

import {
    Asc,
    Barcode,
    Check,
    ChevronLeft,
    ChevronRight,
    Close,
    Desc,
    Error,
    Filter,
    Bolt,
    BoltSlash,
    Folder,
    Home,
    Music,
    QuestionMark,
    Search,
    Sort,
    StarEmpty,
    StarFull,
    StarHalf,
    Users,
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
    chevronLeft: ChevronLeft,
    close: Close,
    collection: UserCollection,
    users: Users,
    desc: Desc,
    error: Error,
    filter: Filter,
    bolt: Bolt,
    boltSlash: BoltSlash,
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
    xxlg: 50,
    xxxlg: 100
};

const VRIcon = ({
    color = Colors.text,
    size = 'md',
    styleOverride = {},
    type,
    testID = null
}: {
    color?: Colors;
    size?: IconSize;
    styleOverride?: ViewStyle;
    type: IconType;
    testID?: string | null;
}) => {
    const themeColor = useColorTheme(color);
    const Icon: React.FC<IconProps> = SVG_MAP[type];

    return (
        <Layout style={styleOverride} testID={testID || 'vr-icon'}>
            <Icon size={SIZE_MAP[size]} color={themeColor} />
        </Layout>
    );
};

export default VRIcon;
