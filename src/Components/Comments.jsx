import React, { Component } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
export class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storyId: this.props.match.params.storyid,
      gotComments: false,
      comments: []
    };
  }

  getCommentDetail = id => {
    return fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    ).then(e => e.json());
  };

  componentDidMount() {
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${
        this.state.storyId
      }.json?print=pretty`
    )
      .then(e => e.json())
      .then(e => {
        if (e.kids) {
          let promise = [];
          e.kids.forEach(val => {
            promise.push(this.getCommentDetail(val));
          });
          Promise.all(promise).then(data => {
            this.setState({
              gotComments: true,
              comments: data
            });
          });
        }
      });
  }
  render() {
    let comments = null;
    if (this.state.gotComments) {
      comments = this.state.comments.map((props, key) => {
        return (
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h5>By {props.by}</h5>
                </Card.Title>
                <Card.Text>{props.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      });
    }
    return <Row>{comments}</Row>;
  }
}

export default Comments;
