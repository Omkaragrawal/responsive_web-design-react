import React, { Component } from "react";
import {
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';

import Header from "./HeaderComponent";
import About from './AboutComponent';
import Home from './HomeComponent';
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import Contact from './ContactComponent';
import Footer from "./FooterComponent";

import {
  connect
} from 'react-redux';
import { actions } from 'react-redux-form';
import {
  TransitionGroup,
  CSSTransition
} from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
};

const mapDispatchToProps = dispatch => ({
  // addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstName, lastName, telNum, email, agree, contactType, message) => dispatch(postFeedback(firstName, lastName, telNum, email, agree, contactType, message)),
  fetchLeaders: () => dispatch(fetchLeaders())
});

class Main extends Component {

  // constructor(props) {
  //   super(props);
  // }


  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }


  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }


  render() {

    const HomePage = () => {
      return (<Home
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishErrMess={this.props.dishes.errMsg}
        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}
        leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
        leaderLoading = {this.props.leaders.isLoading}
        leaderErrMsg={this.props.leaders.errMsg}
      />
      );
    }

    const DishWithId = ({ match }) => {
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          commentsErrMess={this.props.comments.errMess}
          addComment={this.props.addComment}
          postComment={this.props.postComment}
        />
      );
    };

    return (
      <div>
        <Header />
        <div>
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                <Route path='/home' component={HomePage} />
                <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders.leaders} isLoading={this.props.leaders.isLoading} errMsg={this.props.leaders.errMsg} />} />} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback = {this.props.postFeedback} />} />
                <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));