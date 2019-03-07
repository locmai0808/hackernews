import React, { Component } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";
export class Story extends Component {
  constructor(props) {
    super(props);
    this.objArr = [];
    this.state = {
      data: [],
      gotData: false
    };
  }

  getStory = e => {
    return fetch(
      `https://hacker-news.firebaseio.com/v0/item/${e}.json?print=pretty`
    ).then(e => e.json());
  };

  getItem = () => {
    fetch("https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty")
      .then(e => e.json())
      .then(e => {
        let promises = [];
        for (let i in e) {
          promises.push(this.getStory(e[i]));
        }
        Promise.all(promises).then(data => {
          console.log(data);
          this.setState({
            data: data,
            gotData: true
          });
        });
      });
  };
  componentDidMount() {
    this.getItem();
  }
  escapeHTML;
  render() {
    let story = null;
    if (this.state.gotData) {
      story = this.state.data.map((props, key) => {
        return (
          <Col md={12} key={key}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h5>By {props.by}</h5>
                  <h5>{props.title}</h5>
                </Card.Title>
                <Card.Text>{props.text}</Card.Text>
                {props.kids ? (
                  <Link to={`/comments/${props.id}`}>
                    {props.kids.length} comments
                  </Link>
                ) : null}
                <p>{props.id}</p>
                <footer className="blockquote-footer">
                  {moment(props.time * 1000).format("MMM Do YY")}
                </footer>
              </Card.Body>
            </Card>
          </Col>
        );
      });
    }
    return (
      <Container>
        <Row>{story}</Row>
      </Container>
    );
  }
}

export default Story;
