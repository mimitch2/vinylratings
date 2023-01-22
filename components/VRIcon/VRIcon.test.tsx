import { render } from '@testing-library/react-native';

import VRIcon, { SVG_MAP } from './VRIcon';
import { IconType } from 'src/types';

describe('getReleaseTags', () => {
    const iconTypes = Object.keys(SVG_MAP).map((type) => ({
        type
    })) as { type: IconType }[];

    it.each(iconTypes)('should render $type icon correctly', ({ type }) => {
        const icon = render(<VRIcon type={type} />);

        expect(icon).toMatchSnapshot();
    });
});
