import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Label, Row, Col,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

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
		console.log(this.state.isModalOpen);
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleSubmit(values) {
      console.log("Current State is: " + JSON.stringify(values));
      alert("Current State is: " + JSON.stringify(values));
  }

	render() {
		return(
			<React.Fragment>
				<Button outline color="secondary" onClick={this.toggleModal}>
					<span className="fa fa-pencil"></span> Submit Comment
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Label htmlFor="rating" md={2}>Rating</Label>
							</Row>
							<Row className="form-group">
								<Col>
									<Control.select model=".rating" id="rating" name="rating" className="form-control">
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="from-group">
								<Label htmlFor="yourname" md={10}>Your Name</Label>
							</Row>
							<Row className="form-group">
								<Col>
									<Control.text model=".yourname" id="yourname" name="yourname"
											placeholder="Your Name"
											className="form-control"
											validators={{
												minLength: minLength(3), maxLength: maxLength(15)
											}} />
									<Errors 
											className="text-danger"
											model=".yourname"
											show="touched"
											messages={{
												minLength: 'Must be greater than 2 characters',
												maxLength: 'Must be 15 characters or less'
											}}
									/>
								</Col>
							</Row>
							<Row className="from-group">
								<Label htmlFor="comment" md={10}>Comment</Label>
							</Row>
							<Row className="form-group">
								<Col>
									<Control.textarea model=".comment" id="comment" name="comment"
											rows="6"
											className="form-control" />
								</Col>
							</Row>
							<Row>
								<Col>
									<Button type="submit" color="primary">
										Submit
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	};
}

const DishDetail = (props) => {
	if (props.dish != null) {
		return(
			<div className="container">
				<div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem> 
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
				<div className="row">
					<RenderDish dish={props.dish} />
		      <RenderComments comments={props.comments} />
			  </div>
	    </div>
		);
	} else {
		return(
			<div></div>
		);
	}
}

function RenderDish({dish}) {
	if (dish != null) {
		return(
			<div className="col-12 col-md-5 m-1">
				<Card key={dish.id} >
			    <CardImg top src={dish.image} alt={dish.name} />
		      <CardBody>
		        <CardTitle>{dish.name}</CardTitle>
		        <CardText>{dish.description}</CardText>
		      </CardBody>
			  </Card>
		  </div>
    );
	} else {
		return(
			<div></div>
		);
	}
}

function RenderComments({ comments }) {
  const commentList = comments.map((comment) => {
    return (
      <ul key={comment.id} className="list-unstyled">
        <li>{comment.comment}</li>
        <li>
          --{comment.author} ,{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit"
          }).format(new Date(comment.date))}
        </li>
      </ul>
    );
  });
  if (comments != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        {commentList}
        <CommentForm />
      </div>
    );
  } else {
    return <div />;
  }
}


export default DishDetail;