import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

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
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle> {dish.name} </CardTitle>
          <CardText> {dish.description} </CardText>
        </CardBody>
      </Card>
    );
  } else {
    return(<div></div>);
  }
}

function RenderComments({ comments }) {
  if (comments) {
    return (
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
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  if (props.dish) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments= {props.dish.comments} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
