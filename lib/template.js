var React = require('react');

// Get 'property' from <TMPL_VAR property>
function parsePropertyFromProps(props) {
    var property = Object.keys(props).filter((prop) => {
        return typeof props[prop] === 'boolean';
    })[0];

    return propertyHandler(property);
}

function propertyHandler(property) {
    // custom logic goes here

    return property;
}

// lookup property and get its value
function getValue(props) {
    var propertyName = parsePropertyFromProps(props);

    if (props.__local &&
        typeof props.__local[propertyName] !== 'undefined') {
        return props.__local[propertyName];
    }

    return props.__state[propertyName];
}

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
}

var TMPL_LOOP = React.createClass({
    render: function() {
        var loop = getValue(this.props).map((item, index) => {
            return <span key={JSON.stringify(item)}>{
                recursiveCloneChildren(
                    this.props.children,
                    { __local: item }
                )
            }</span>;
        });

        return (
            <span>{loop}</span>
        );
    }
});

var TMPL_VAR = React.createClass({
    render: function() {
        var value = getValue(this.props);

        return <span>{value}</span>;
    }
});

var TMPL_IF = React.createClass({
    render: function() {
        var propertyName = parsePropertyFromProps(this.props);

        if (getValue(this.props)) {
            return <span>{this.props.children}</span>;
        }

        return null;
    }
});

var TMPL_CONTAINER = React.createClass({
    render: function() {
        return (
            <span>{
                recursiveCloneChildren(
                    this.props.children,
                    { __state: this.props.templateData }
                )
            }</span>
        );
    }
});

module.exports = {
    TMPL_LOOP: TMPL_LOOP,
    TMPL_VAR: TMPL_VAR,
    TMPL_IF: TMPL_IF,

    TMPL_CONTAINER: TMPL_CONTAINER,
};
