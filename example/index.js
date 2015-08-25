var React = require('react');

var {
    TMPL_CONTAINER,
    TMPL_VAR,
    TMPL_IF,
    TMPL_ELSE,
    TMPL_LOOP
} = require('../');

var templateData = {
    prefix: 'Person: ',
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

    showSubtitle: true,
    title: 'List'
};

var Alert = require('./Alert');

var App = React.createClass({
    render: function() {
        return (
            <TMPL_CONTAINER templateData={templateData}>
                <div>
                    <h1><TMPL_VAR title /></h1>
                    <TMPL_IF showSubtitle>
                        <h2>Subtitle</h2>
                    </TMPL_IF>
                    <ul>
                        <TMPL_LOOP people>
                            <li>
                                <span><TMPL_VAR prefix /></span>
                                <span><TMPL_VAR name /></span>

                                <TMPL_IF showAge>
                                    <span>, age: <TMPL_VAR age /></span>
                                <TMPL_ELSE />
                                    <span>, no age</span>
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
            </TMPL_CONTAINER>
        );
    }
});

React.render(
    <App />,
    document.body.querySelector('#container')
);
