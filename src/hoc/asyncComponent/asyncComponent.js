import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }
        componentDidMount() {
            importComponent().then(comp => {
                this.setState({component: comp.default});
            });
        }

        render() {
            const ImportedComponent = this.state.component;
            return ImportedComponent ? <ImportedComponent {...this.props} /> : null;
        }

    }
}

export default asyncComponent;