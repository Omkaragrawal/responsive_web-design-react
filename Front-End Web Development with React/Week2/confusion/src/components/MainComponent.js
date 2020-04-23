import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from "./HeaderComponent";
import About from './AboutComponent';
import Home from './HomeComponent';
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import Contact from './ContactComponent';
import Footer from "./FooterComponent";

import { DISHES } from "../shared/dishes";
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

class Main extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }
  

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  

  render() {
    
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter(dish => dish.featured)[0]}
          promotion={this.state.promotions.filter(promo => promo.featured)[0]}
          leader={this.state.leaders.filter(leader => leader.featured)[0]}
        />
      );
    }
    const DishWithId = ({ match: { params: {dishId : id} } }) => {
      return (
        // eslint-disable-next-line
        <DishDetail dish={this.state.dishes.filter(dish => dish.id == id)[0]}
        // eslint-disable-next-line
        comments={this.state.comments.filter(comment => comment.dishId == id)} />
      );
    };

    return (
      <div>
        <Header />
        {/* <Menu
          dishes={this.state.dishes}
          onClick={(dishId) => this.onDishSelect(dishId)}
        />
        <DishDetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === this.state.selectedDish
            )[0]
          }
        /> */}
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route path='/aboutus' component={() => <About leaders={LEADERS} />} />
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path='/contactus' component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
