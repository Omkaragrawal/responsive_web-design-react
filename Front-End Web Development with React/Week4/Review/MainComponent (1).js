
import React, {Component} from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutusComponent';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
      postcomm : (dishId, rating, author, comment)=>{
        return dispatch(postComment(dishId,rating,author,comment));
      },
      fetchdish : ()=>{
           return dispatch(fetchDishes());
      },
      resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},

      fetchComments : ()=> dispatch(fetchComments()),
      fetchPromos: () => dispatch(fetchPromos()),
      fetchLeaders: ()=>dispatch(fetchLeaders()),
      postFeedback: (feedback)=>dispatch(postFeedback(feedback))
  }
}
class Main  extends Component{

  

    constructor(props){
       super(props);
       
    }

     

    /*onDishSelect(dishid) {
        this.setState({ selectedDish: dishid});
    }*/

    componentDidMount(){
      this.props.fetchdish();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeaders();
    }

   render(){
    const DishWithId = ({match}) => {
   
        return(
            <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
               disherrmess={this.props.dishes.errMessage}
               dishLoading = {this.props.dishes.isLoading}
              comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
              commentserrmess={this.props.comments.errMessage}
              postcomm={this.props.postcomm} />
        );
      };

    return (
        <div>
          <Header/>
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch>
            <Route path="/home" component={()=> <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              disherrmess={this.props.dishes.errMessage}
              dishLoading = {this.props.dishes.isLoading}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promotionerrmess={this.props.promotions.errMess}
              promotionLoading = {this.props.promotions.isLoading}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leaderLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMessage}

          />}/>
             
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/contactus' component={()=><Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} />} />
              <Route exact path="/aboutus" component={()=><About leaders={this.props.leaders.leaders}/>}/>
              <Redirect to="/home" />
          </Switch>
          </CSSTransition>
          </TransitionGroup>
          <Footer/>
        </div>
      );


   }
}
/*<Menu dishes={this.state.dishes} onClick={(dishid)=>this.onDishSelect(dishid)}/>
<Dishdetail selectedDish={this.state.dishes.filter((dish)=>{
    return dish.id===this.state.selectedDish
})[0]}/>*/

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));