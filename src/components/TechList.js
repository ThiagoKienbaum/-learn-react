import React, { Component } from 'react';
import TechItem from './TechItem';

class TechList extends Component {
    state = {
        newTech: '',
        techs: []
    }

    componentDidMount() {
        const techs = localStorage.getItem('techs');

        if (techs) {
            this.setState({ techs: JSON.parse(techs) });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.techs !== this.state.techs) {
            localStorage.setItem('techs', JSON.stringify(this.state.techs))
        }
    }

    componentWillUnmount() {
        
    }

    handleInputChange = event => {
        this.setState({ newTech: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ 
            techs: [...this.state.techs, this.state.newTech],
            newTech: ''
        })
    }

    handleDelete = tech => {
        this.setState({
            techs: this.state.techs.filter(techToDelete => techToDelete !== tech)
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>{ this.state.newTech }</h1>
                <ul>
                    {this.state.techs.map(tech => (
                        <TechItem 
                            key={tech} 
                            tech={tech} 
                            onDelete={() => this.handleDelete(tech)} 
                        />
                    ))}                
                </ul>
                <input 
                    type="text" 
                    onChange={ this.handleInputChange } 
                    value={ this.state.newTech }
                />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default TechList;