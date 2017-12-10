import * as React from 'react';

const styles = require('./Main.css');

class Main extends React.Component {
    render() {
        return (
            <main className={styles.main}>
                {this.props.children}
            </main>
        );
    }
}

export { Main };