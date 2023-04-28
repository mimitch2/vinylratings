import React from 'react';

import VRIcon, { SVG_MAP } from './VRIcon';
import { IconType } from 'types';
import { renderWithProvider } from 'test';

describe('VRIcon', () => {
    const iconTypes = Object.keys(SVG_MAP).map((type) => ({
        type
    })) as { type: IconType }[];

    it.each(iconTypes)('should render $type icon correctly', ({ type }) => {
        const icon = renderWithProvider(<VRIcon type={type} />);

        expect(icon).toMatchSnapshot();
    });
});
