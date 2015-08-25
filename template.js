var React = require('react');

var state;

function getProperty(props) {
    return Object.keys(props).filter((prop) => {
        return typeof props[prop] === 'boolean';
    })[0];
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
        var loop = state[getProperty(this.props)].map((item) => {
            return <div>{
                this.recursiveCloneChildren(this.props.children, item)
            }</div>;
        });

        return (
            <div>{loop}</div>
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
