import React from 'react';

import VRLoading from './VRLoading';
import { renderWithProvider } from 'test';

describe('VRLoading', () => {
    it('should render ActivityIndicator inside Layout with testID "loading"', () => {
        const { getByTestId } = renderWithProvider(<VRLoading />);
        const loadingLayout = getByTestId('loading');

        expect(loadingLayout).toBeTruthy();
        expect(loadingLayout.props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                    flex: 1,
                    position: 'absolute'
                })
            ])
        );

        expect(loadingLayout.children[0].type.displayName).toBe(
            'ActivityIndicator'
        );
        expect(loadingLayout.children[0].props.size).toBe('large');
    });
});
