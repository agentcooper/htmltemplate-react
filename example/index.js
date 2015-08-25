var React = require('react');

var template = require('../lib/template');

var { TMPL_VAR, TMPL_IF, TMPL_LOOP } = template;

var state = {
    people: [
        {
            name: 'John',
            fruits: [{ color: 'yellow' }, { color: 'red' }]
        },
        {
            name: 'Mary',
            showAge: true,
            age: 42,
            fruits: [{ color: 'blue' }]
        }
    ],

    title: 'List'
};

template.useState(state);

var Alert = require('./Alert');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <h1><TMPL_VAR title /></h1>
                <ul>
                    <TMPL_LOOP people>
                        <li>
                            <span><TMPL_VAR name /></span>

                            <TMPL_IF showAge>
                                <span> <TMPL_VAR age /></span>
                            </TMPL_IF>

                            <TMPL_IF fruits>
                                <ul>
                                    <TMPL_LOOP fruits>
                                        <li><TMPL_VAR color /></li>
                                    </TMPL_LOOP>
                                </ul>
                            </TMPL_IF>
                        </li>
                    </TMPL_LOOP>
                </ul>
            </div>
        );
    }
});

React.render(<App />, document.body.querySelector('#container'));
