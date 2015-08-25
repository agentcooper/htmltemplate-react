var React = require('react');

// @FIXME: probably should be in Container component
var state;

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

    return (props.__local || state)[propertyName];
}

var TMPL_LOOP = React.createClass({
    recursiveCloneChildren: function(children, local) {
        return React.Children.map(children, child => {
            if (typeof child !== 'object') {
                return child;
            }

            var childProps = { __local: local };

            childProps.children
                = this.recursiveCloneChildren(child.props.children, local);

            return React.cloneElement(child, childProps);
        });
    },

    render: function() {
        var loop = getValue(this.props).map((item) => {
            return <span>{
                this.recursiveCloneChildren(this.props.children, item)
            }</span>;
        });

        return (
            <span>{loop}</span>
        );
    }
});

var TMPL_VAR = React.createClass({
    render: function() {
        return <span>{getValue(this.props)}</span>;
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

module.exports = {
	TMPL_LOOP: TMPL_LOOP,
	TMPL_VAR: TMPL_VAR,
	TMPL_IF: TMPL_IF,

	useState: function(_state) {
		state = _state;
	}
};
