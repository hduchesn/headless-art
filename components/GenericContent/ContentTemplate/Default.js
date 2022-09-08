import React from 'react';
import * as PropTypes from 'prop-types';
import {ContentLayout} from '../../Layout';
import {Hero, Main, GalleryFancyBox} from '../';

export function GenericContentTemplate({node: {path, uuid}}) {
    return (
        <ContentLayout path={path}>
            <Hero isTitleUsed id={uuid}/>
            <Main id={uuid}/>
            <GalleryFancyBox id={uuid}/>
        </ContentLayout>
    );
}

GenericContentTemplate.propTypes = {
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

// Export default GenericContentTemplate;

