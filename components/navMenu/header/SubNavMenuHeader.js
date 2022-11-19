import React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import {JahiaCtx, JahiaLink as Link} from '@jahia/nextjs-sdk';

function SubNavMenuHeader({node, path}) {
    const {locale} = React.useContext(JahiaCtx);

    const [hovered, setHovered] = React.useState(false);

    const handleOnMouseEnter = () => setHovered(true);
    const handleOnMouseLeave = () => setHovered(false);

    const hasChildren = node => Array.isArray(node.children) && node.children.length > 0;

    const buildLiProps = node => {
        if (hasChildren(node)) {
            return {
                onMouseEnter: handleOnMouseEnter,
                onMouseLeave: handleOnMouseLeave,
            };
        }

        return {};
    };

    const buildAnchorProps = node => {
        const aProps = {
            className: classnames('nav-link', {
                active: path.includes(node.path),
                'dropdown-toggle': hasChildren(node),
            }),
        };

        if (!hasChildren(node)) {// Node.page &&
            aProps['data-toggle'] = 'collapse';
            aProps['data-target'] = '.navbar-collapse.show';
        }
        // If(!node.page)
        //     aProps.style={pointerEvents: "none"}

        if (hasChildren(node)) {
            aProps.id = node.uuid;
            // AProps['data-toggle'] = 'dropdown';
            aProps['aria-haspopup'] = 'true';
            aProps['aria-expanded'] = hovered;
        }

        return aProps;
    };

    const buildMenuItem = node => {
        if (!node.page) {
            return (
                <div {...buildAnchorProps(node)} style={{cursor: 'default'}}>
                    {node.title?.value}
                </div>
            );
        }

        return (
            <Link href={node.path} locale={locale}>
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <a {...buildAnchorProps(node)}>
                    {node.title?.value}
                </a>
            </Link>
        );
    };

    // Console.log("[SubNavMenuHeader] node :",node)
    return (
        <li
            className={classnames('nav-item', {
                dropdown: hasChildren(node),
                show: hovered,
            })}
            {...buildLiProps(node)}
        >
            {buildMenuItem(node)}
            {
                hasChildren(node)
                && (
                    <div
                        className={classnames('dropdown-menu', {
                            show: hovered,
                        })}
                        aria-labelledby={node.uuid}
                    >
                        {node.children.map(node2 =>
                            // Console.log("node2.path : ",node2.path);
                            (
                                <Link key={node2.uuid} href={node2.path} locale={locale}>
                                    <a
                                        className={classnames('dropdown-item', {
                                            active: path.length > node2.path.length
                                                ? path.includes(node2.path)
                                                : node2.path === path,
                                        })}
                                        data-toggle="collapse"
                                        data-target=".navbar-collapse.show"
                                    >
                                        {node2.title?.value}
                                    </a>
                                </Link>
                            ),

                        )}
                    </div>
                )
            }
        </li>
    );
}

SubNavMenuHeader.propTypes = {
    node: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
};

export default SubNavMenuHeader;
