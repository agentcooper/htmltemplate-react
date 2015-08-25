var React = require('react');

var state;

function getProperty(props) {
    var property = Object.keys(props).filter((prop) => {
        return typeof props[prop] === 'boolean';
    })[0];

    return propertyHandler(property);
}

function propertyHandler(property) {
    return property;
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
        })
    },

    render: function() {
        var property = getProperty(this.props);

        var loop = (this.props.__local || state)[property].map((item) => {
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
        // console.log(this.props);

        return <span>{this.props.__local[getProperty(this.props)]}</span>;
    }
});

var TMPL_IF = React.createClass({
    render: function() {
        // console.log(this.props);

        var property = getProperty(this.props);

        if (this.props.__local[getProperty(this.props)]) {
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
