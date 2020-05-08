import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor() {
    super();
    this.state = {
      plants: [],
      find: "",
      filteredPlants: [],
    };
  }
  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants
  componentDidMount() {
    // console.log("app is mounting");
    axios
      .get("http://localhost:3333/plants")
      .then((res) => {
        // console.log(res.data.plantsData)
        // console.log(this.props.find)
        this.setState({
          plants: res.data.plantsData,
          filteredPlants: res.data.plantsData
        });
        // console.log(this.state.plants)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  captureFind = (e) => {
    this.setState({
      find: e.target.value.toLowerCase(),
    });
  }

  findPlants = (e) => {
    e.preventDefault()
      let newArray = this.state.plants.filter((plant) => {
        let plantName = plant.name.toLowerCase();
        if (plantName.includes(this.state.find)) {
          return plant;
        }
      });
      // console.log(newArray)
      if (this.state.find !== "") {
        this.setState({
          filteredPlants: newArray
        }) 
      } else if (this.state.find === "") {
          this.setState({
            filteredPlants: this.state.plants
          })
        }

  }; //close findPlants

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    // console.log(this.props.find)

    return (
      <div>
        <form
          id="filterStretch"
          onSubmit={this.findPlants}
        >
          <label htmlFor="findPlant">Find Plant:</label>
          <input
            name="findPlant"
            type="text"
            value={this.state.find}
            onChange={this.captureFind}
          />
        </form>
        <main className="plant-list">
          {this.state?.filteredPlants?.map((plant) => (
            <div className="plant-card" key={plant.id}>
              <img className="plant-image" src={plant.img} alt={plant.name} />
              <div className="plant-details">
                <h2 className="plant-name">{plant.name}</h2>
                <p className="plant-scientific-name">{plant.scientificName}</p>
                <p>{plant.description}</p>
                <div className="plant-bottom-row">
                  <p>${plant.price}</p>
                  <p>☀️ {plant.light}</p>
                  <p>💦 {plant.watering}x/month</p>
                </div>
                <button
                  className="plant-button"
                  onClick={() => this.props.addToCart(plant)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }
}
