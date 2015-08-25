var React = require('react');

function recursiveCloneChildren(children, additionalProps) {
    return React.Children.map(children, child => {
        if (typeof child !== 'object') {
            return child;
        }

        additionalProps.children = recursiveCloneChildren(
            child.props.children,
            additionalProps
        );

        return React.cloneElement(child, additionalProps);
    });
};

module.exports = recursiveCloneChildren;
