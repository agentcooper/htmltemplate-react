var React = require('react');

module.exports = React.createClass({
    componentDidMount: function() {
        alert('Alert');
    },

    render: function() {
        return <div>alert!</div>;
    }
});
