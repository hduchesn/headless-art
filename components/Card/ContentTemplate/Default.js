import React from 'react';
import * as PropTypes from 'prop-types';
import {ContentLayout} from '../../Layout';

export function CardContentTemplate({node: {path}}) {
    return (
        <ContentLayout path={path}>
            <h1>Hello card content !</h1>
        </ContentLayout>
    );
}

CardContentTemplate.propTypes = {
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
// Export default ContentTemplate;

