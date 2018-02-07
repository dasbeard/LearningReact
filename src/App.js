import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
// import Radium, { StyleRoot } from 'radium';

class App extends Component {
  state = {
    persons: [
      {id: 'hgs', name: 'Max', age:28},
      {id: 'jhgjfj', name: 'Manu', age:29},
      {id: 'fghjjhgf', name: 'Stephanie', age:26},
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons })
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();  // Old Way
    const persons = [...this.state.persons];        // ES6 Way
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',




      // Used with Radium
      // ':hover':{
      //   backgroundColor: 'lightgreen',
      //   color: 'black'
      // }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={ () => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={index}
              changed={ (event) => this.nameChangedHandler(event, person.id)}/>
          })}
        </div>
      );
      style.backgroundColor = 'red';




      // style[':hover'] = {            // Used with Radium
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // }
    }

    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red');
    }

    if(this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      // <StyleRoot> // Used with Radium
        <div className="App">
          <h1> Hello Im a React App</h1>
          <p className={classes.join(' ')}>This is really working</p>

          <button
            onClick={this.togglePersonsHandler}
            style={style}
            >Toggle Persons
          </button>

          {persons}

        </div>
      /* </StyleRoot> */
    );
  }
}

export default App;

// export default Radium(App); // Used with Radium