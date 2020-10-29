import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  // constructor() {
  //   super()

  //   this.state = {
  //     pets: [],
  //     filters: {
  //       type: 'all'
  //     }
  //   }
  // }

  // cool kid syntax
  state = {
    pets: [],
    filters: {
      type: 'all'
      
    }
  }

  onChangeType = (event) => {
    console.log(event)
    this.setState({
      filters : {
        type: event
      }
    })
  }

  onFindPetsClick = () => {
    let url = '/api/pets'
    if (this.state.filters.type == 'all')
    fetch(url)
    .then(response => response.json())
    .then(allPetsArray => this.setState({
      pets: allPetsArray
    }))
    else {
      fetch(url + `?type=${this.state.filters.type}`)
      .then(response => response.json())
      .then(onePetsArray => this.setState({
        pets: onePetsArray
      }))
    }
  }

onAdoptPet = (id) => {
  let newPetArray = [...this.state.pets.map(pet => {
    if (pet.id == id){
      return {...pet,
        isAdopted: true 
      }
    }
    return pet //explicit return is undefined
  })]
  // console.log(newPetArray)
  // debugger
  this.setState({
    pets: newPetArray
  })

}

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
