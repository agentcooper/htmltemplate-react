var React = require('react');

var template = require('./template');

var { TMPL_VAR, TMPL_IF, TMPL_LOOP } = template;

var state = {
    people: [
        { name: 'John' },
        { name: 'Mary', showAge: true, age: 42 }
    ]
};

template.useState(state);

var Alert = require('./Alert');

var App = React.createClass({
    render: function() {
        return (
            <ul>
                <TMPL_LOOP people>
                    <li>
                        <span><TMPL_VAR name/></span>

                        <TMPL_IF showAge>
                            <span> <TMPL_VAR age/></span>
                        </TMPL_IF>

                        <TMPL_IF something>
                            <Alert />
                        </TMPL_IF>
                    </li>
                </TMPL_LOOP>
            </ul>
        );
    }
});

React.render(<App />, document.body.querySelector('#container'));
