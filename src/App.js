import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
// import ErrorBoundry from './ErrorBoundry/ErrorBoundry';

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
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            // return <ErrorBoundry key={person.id}> // Used with Error boundries, Must wrap errored componenet and the key needs to beadded
            return <Person
                click={ () => this.deletePersonHandler(index)}
                key={person.id}
                name={person.name}
                age={person.age}
                changed={ (event) => this.nameChangedHandler(event, person.id)}
              />
          } )}
        </div>
      );

      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if(this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }

    if(this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.App}>
          <h1> Hello Im a React App</h1>
          <p className={assignedClasses.join(' ')}>This is really working</p>

          <button
            className={btnClass}
            onClick={this.togglePersonsHandler}
            >Toggle Persons
          </button>

          {persons}

        </div>
    );
  }
}

export default App;
