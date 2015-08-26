var React = require('react');

var recursiveCloneChildren = require('./recursiveCloneChildren');

function propertyHandler(property) {
    // custom logic goes here

    return property;
}

// Get 'property' from <TMPL_VAR property>
function parsePropertyFromProps(props) {
    var property = Object.keys(props).filter((prop) => {
        return typeof props[prop] === 'boolean';
    })[0];

    return propertyHandler(property);
}

// lookup property and get its value
function getValue(props) {
    var propertyName = parsePropertyFromProps(props);

    if (props.__local &&
        typeof props.__local[propertyName] !== 'undefined') {
        return props.__local[propertyName];
    }

    return props.__global[propertyName];
}

var TMPL_LOOP = React.createClass({
    render: function() {
        var loop = getValue(this.props).map((item, index, arr) => {
            var isFirst = index === 0,
                isLast = index === arr.length - 1;

            var loopVariables = {
                __first__: isFirst,
                __last__: isLast,
                __inner__: !isFirst && !isLast,
                __odd__: index % 2 !== 0,
                __counter__: index,
            };

            return <span key={JSON.stringify(item)}>{
                recursiveCloneChildren(
                    this.props.children,
                    {
                        __local: {
                            ...loopVariables,
                            ...item
                        }
                    }
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

var TMPL_CONDITION = React.createClass({
    render: function() {
        var ifTrueChildren = [],
            ifFalseChildren = [],
            elseFound = 0;

        React.Children.forEach(this.props.children, child => {
            if (child.type && child.type.displayName === 'TMPL_ELSE') {
                elseFound += 1;
            }

            if (elseFound > 1) {
                throw new Error('Multiple TMPL_ELSE on the same level');
            }

            if (elseFound > 0) {
                ifFalseChildren.push(child);
            } else {
                ifTrueChildren.push(child);
            }
        });

        var value = getValue(this.props);

        if ((!this.props.inverse && value) ||
            (this.props.inverse && !value)) {
            return <span>{ifTrueChildren}</span>;
        } else {
            return <span>{ifFalseChildren}</span>;
        }

        return null;
    }
});

var TMPL_IF = React.createClass({
    render: function() {
        return <TMPL_CONDITION {...this.props} />;
    }
});

var TMPL_UNLESS = React.createClass({
    render: function() {
        return <TMPL_CONDITION {...this.props} inverse />;
    }
});

var TMPL_CONTAINER = React.createClass({
    render: function() {
        return (
            <span>{
                recursiveCloneChildren(
                    this.props.children,
                    { __global: this.props.templateData }
                )
            }</span>
        );
    }
});

var TMPL_ELSE = React.createClass({
    render: function() {
        // @FIXME: should something be rendered?
        return null;
    }
});

module.exports = {
    TMPL_LOOP: TMPL_LOOP,
    TMPL_VAR: TMPL_VAR,
    TMPL_IF: TMPL_IF,
    TMPL_ELSE: TMPL_ELSE,
    TMPL_UNLESS: TMPL_UNLESS,

    TMPL_CONTAINER: TMPL_CONTAINER,
};
