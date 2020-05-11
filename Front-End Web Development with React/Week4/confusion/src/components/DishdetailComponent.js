import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import {
  Row,
  Col,
  Label,
  Button
} from 'reactstrap';

import {
  Link
} from 'react-router-dom';
import {
  Control,
  LocalForm,
  Errors
} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
// export default class DishDetail extends Component {
//   constructor(props) {
//     super(props);

//     //----------Removed due to anti-pattern of updating state as props change.---------
//     //--------- Start article: https://stackoverflow.com/a/32414771/8217589 ------------------
//     //---------- Base Resource: https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops -------
//     //----------https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html -------------
//     //    this.state = {
//     //      dishDetails: this.props.dish,
//     //    };
//   }

//   //------Implemented using resource: https://reactjs.org/docs/react-component.html#componentdidupdate

//   // Anti-pattern Should avoid for this simple use case------------------
//   //   componentDidUpdate(prevProps) {
//   //     if (this.props.dish != prevProps.dish) {
//   //       this.setState({ dishDetails: this.props.dish });
//   //     }
//   //   }

// renderDish(dish) {
//   if (dish) {
//     return (
//       <Card>
//         <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
//         <CardBody>
//           <CardTitle> {this.props.dish.name} </CardTitle>
//           <CardText> {this.props.dish.description} </CardText>
//         </CardBody>
//       </Card>
//     );
//   }
// }

//   renderComments(comments) {
//     if (comments) {
//       return (
//         <ul>
//           {comments.map((comment) => {
//             return (
//               <li className="list-unstyled" key={comment.id}>
//                 <div className="row">
//                   <div className="col-12">
//                     <h4>{comment.comment}</h4>
//                   </div>
//                   <div className="col-12">
//                     --{" "}
//                     {`${comment.author}, ${new Intl.DateTimeFormat("en-US", {
//                       year: "numeric",
//                       month: "short",
//                       day: "2-digit",
//                     }).format(new Date(Date.parse(comment.date)))}`}
//                   </div>
//                 </div>
//                 <br />
//                 <br />
//               </li>
//             );
//           })}
//         </ul>
//       );
//     } else {
//       return <div></div>;
//     }
//   }

//   render() {
//     //   console.log(this.state.dishDetails);
//     if (this.props.dish) {
//       return (
//         <div className="container">
//           <div className="row">
//             <div className="col-12 col-md-5 m-1">
//               {/* <Card>
//                    <CardImg
//                      top
//                      src={this.props.dish.image}
//                      //src={this.state.dishDetails.image} -----------> Anti-pattern
//                      alt={this.props.dish.name}
//                      //alt={this.state.dishDetails.name}  -----------> Anti-pattern
//                    />
//                    <CardBody>
//                      <CardTitle> {this.props.dish.name} </CardTitle>
//                      <CardTitle> {this.state.dishDetails.name} </CardTitle>  -----------> Anti-pattern
//                      <CardText> {this.props.dish.description} </CardText>
//                      <CardText> {this.state.dishDetails.description} </CardText> -----------> Anti-pattern
//                    </CardBody>
//                  </Card> */}

//               {this.renderDish(this.props.dish)}
//             </div>
//             <div className="col-12 col-md-5 m-1">
//               {this.renderComments(this.props.dish.comments)}
//             </div>
//           </div>
//         </div>
//       );
//     } else {
//       return <div></div>;
//     }
//   }
// }

function RenderDish({ dish }) {
  if (dish) {
    return (
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle> {dish.name} </CardTitle>
          <CardText> {dish.description} </CardText>
        </CardBody>
      </Card>
    );
  } else {
    return (<div></div>);
  }
}

function RenderComments({
  comments,
  addComment,
  dishId
}) {
  if (comments) {
    return (
      <React.Fragment>
        <ul>
          {comments.map((comment) => {
            return (
              <li className="list-unstyled" key={comment.id}>
                <div className="row">
                  <div className="col-12">
                    <h4>{comment.comment}</h4>
                  </div>
                  <div className="col-12">
                    --{" "}
                    {`${comment.author}, ${new Intl.DateTimeFormat("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(comment.date)))}`}
                  </div>
                </div>
                <br />
                <br />
              </li>
            );
          })}
        </ul>
        <CommentForm dishId={dishId} addComment={addComment}></CommentForm >
      </React.Fragment>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>

            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            < RenderComments comments = {props.comments} addComment = {props.addComment} dishId = {props.dish.id}/>
          </div>
        </div>
      </div>
    );
  } else {
    // console.log(props.dish);

    return <div></div>;
  }
};


class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  // externalCloseBtn = () => ;

  handleSubmit(values, event) {
    this.toggleModal();
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
    this.props.addComment(this.props.dishId, values.rating, values.username, values.message);
    event.preventDefault();
  }
  RenderModal() {
    return (
      <Modal backdrop="static"
        isOpen={this.state.isModalOpen}
        toggle={this.toggleModal}
        keyboard={false}
        centered={true}
        autoFocus={true}
        returnFocusAfterClose={true}
        external={<button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggleModal}>&times;</button>}
      >
        <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values, event) => this.handleSubmit(values, event)}>
            <Row className="form-group" id="rating-row">
              <Label htmlFor="rating" xs={2} className="input-group-text">Rating</Label>
              <Col xs={10}>
                <Control.select model=".rating" id="rating" name="rating" className="custom-select form-control" defaultValue={1}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group" id="username-row">
              <Label xs={2} htmlFor="userName">Your Name</Label>
              <Col xs={10}>
                <Control.text className="form-control"
                  placeholder="Your complete name"
                  model=".username"
                  id="username"
                  name="username"
                  validators={{
                    required: val => !!val,
                    minLength: val => (!!val) ? val.length > 2 : true,
                    maxLength: val => (!!val) ? val.length < 16 : true
                  }}></Control.text>
                <Errors className="text-danger"
                  model=".username"
                  show="touched"
                  messages={{
                    required: "Please Enter a Valid Name",
                    minLength: "Name should be greater than 2 characters",
                    maxLength: "Name should not exceed 15 characters"
                  }}></Errors>
              </Col>
            </Row>
            <Row className="form-group" id="message-row">
              <Label htmlFor="message" xs={12}>Comment</Label>
              <Col xs={12}>
                <Control.textarea model=".message" id="message" className="form-control" rows={8} name="message"></Control.textarea>
              </Col>
            </Row>
            <Row className="form-group">
              <Col xs={12}>
                <Button type="submit" color="primary">
                  Send Feedback
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.toggleModal}>CLOSE</Button>
        </ModalFooter>
      </Modal>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
        {this.RenderModal()}
      </React.Fragment>
    );
  }

}
export default DishDetail;
