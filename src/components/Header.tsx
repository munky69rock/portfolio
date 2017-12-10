import * as React from 'react';
const packageJson = require('../../package.json');
const styles = require('./Header.css');

class Header extends React.Component {
    render() {
        return (
            <header className={styles.header}>
                <h1 className={styles.title}>MUNKY69ROCK <small>{packageJson.version}</small></h1>
            </header>
        );
    }
}

export { Header };