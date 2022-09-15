import React from 'react';
import {Area} from '@jahia/nextjs-sdk';
import * as PropTypes from 'prop-types';
import {PageLayout} from '../../Layout';

export function PageOpenTemplate({node}) {
    return (
        <PageLayout>
            <Area name="mainContent"/>
        </PageLayout>
    );
}

PageOpenTemplate.propTypes = {
    node: PropTypes.shape({
        workspace: PropTypes.string,
        uuid: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        primaryNodeType: PropTypes.shape({name: PropTypes.string}).isRequired,
        mixinTypes: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string})),
        view: PropTypes.shape({value: PropTypes.string}),
        templateName: PropTypes.shape({value: PropTypes.string}),
    }).isRequired,
};

// Export default Open;

