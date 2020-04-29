import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, BreadcrumbItem, Breadcrumb, Button, ModalBody, ModalHeader, Modal, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || (val.length <= len);
const minLength = (len) => (val) => !val || (val.length >= len);

function RenderComment({comment}) {
    return (
        <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
        </li>
    )
}

class CommentForm extends Component{
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isOpenModal: false
        }
    }

    toggleModal() {
        this.setState({isOpenModal: !this.state.isOpenModal});
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.toggleModal();

    }

    render() {
        return (
            <React.Fragment>
                <Modal toggle={this.toggleModal} isOpen={this.state.isOpenModal}>
                    <ModalHeader toggle={this.toggleModal} >Login</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <div className="m-2">
                            <Label htmlFor="rating" >Rating</Label>
                                
                            <Control.select model=".rating" 
                                name="rating"
                                id="rating"
                                className="form-control"
                                >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </div>
                        <div className="m-2">
                            <Label htmlFor="yourname">Your Name</Label>
                            
                            <Control.text model=".yourname" id="yourname" name="yourname" 
                                placeholder="Your Name"
                                className="form-control"
                                validators={{
                                    required: required,
                                    maxLength: maxLength(15),
                                    minLength: minLength(2)
                                }}
                                />
                            <Errors className="text-danger" 
                                show="touched"
                                model=".yourname"
                                messages={{
                                    required: "Required",
                                    maxLength: "should be less than 15 characters",
                                    minLength: "Should be more than 2 characters"

                                }} />
                            </div>
                            <div className="m-2">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment" 
                                className="form-control"
                                    rows={6}
                                    />
                            </div>
                            <div className="m-2">
                            <   Button type="submit" color="primary">Submit</Button>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline color="secondary" onClick={this.toggleModal}><spa className="fa fa-lg fa-pencil"></spa> Submit Comment</Button>
            </React.Fragment>
        );
    }
}

function RenderComments({comments}) {
    if(comments ) {
        const commentsText = comments.map((comment) => {
            return (
                <RenderComment key={comment.id} comment={comment} />
            );
        });
        return (
            <div  className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentsText}
                </ul>
                <CommentForm />
            </div>
        );
    } else {
        return (
            <div  className="col-12 col-md-5 m-1"><CommentForm /></div>
        );
    }
    
}

function RenderDish({dish, comments}) {
    if(dish) {
        return (
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h2>{dish.name}</h2>
                </div>
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg src={dish.image} alt={dish.name} />
                            <CardBody className="ml-5">
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <RenderComments comments={comments} />
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

const DishDetail = (props) => {
    return (
        <div>
            <RenderDish dish={props.dish} comments={props.comments} />
        </div>
    );
}

export default DishDetail;