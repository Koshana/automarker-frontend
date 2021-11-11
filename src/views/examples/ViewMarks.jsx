import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import axios from 'axios'
import UserHeader from "components/Headers/UserHeader.js";
import AddAlert from "@material-ui/icons/AddAlert";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Snackbar from "components/Snackbar/Snackbar";

class ViewMarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false,
      subject: '',
      marks: '',
      grade: ''
    };

    this.OnSubmit = this.OnSubmit.bind(this)
    this.OnGenerateFeedback = this.OnGenerateFeedback.bind(this)
    this.onChangeComboBoxValue = this.onChangeComboBoxValue.bind(this);
    // this.getmark = this.getmark.bind(this);
  }

  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function () {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

  OnSubmit(e) {
    if (this.state.subject == '') {
      this.showNotification("tr")
    } else {
      // this.getmark();
      this.setState({
        marks: "60/100",
        grade: "B"
      })
    }
  }

  OnGenerateFeedback(e) {
    this.props.history.push('/admin/feedback');
  }

  onChangeComboBoxValue(e) {
    this.setState({
      subject: e.target.value
    })
  }

  //   getmark(e) {
  //     e.preventDefault()

  //     axios.get("http://localhost:5000/marks/get/" + this.state.subject + '/' + sessionStorage.getItem("user"))
  //     .then(res => {
  //       this.setState({
  //         marks: res.mark,
  //         grade: res.grade
  //       })
  //     }).catch(err => {
  //         throw new Error('Some thing went wrong');
  //     })
  // }

  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <CardBody className="pt-0 pt-md-4">
                  <div className="text-left">
                    <h3>
                      Student Name : {sessionStorage.getItem("name")}
                    </h3>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Mark : {this.state.marks}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Grade : {this.state.grade}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Generate Student Marks
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Module
                            </label>
                            <select className="form-control" value={this.state.module} onChange={this.onChangeComboBoxValue}>
                              <option>Select a module</option>
                              <option>oop</option>
                              <option>itp</option>
                              <option>ctse</option>
                            </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <br></br>
                      <Row>
                        <Col lg="2.5">
                          <FormGroup>
                            <Button
                              color="success"
                              href="#pablo"
                              onClick={this.OnSubmit}
                            >
                              View Mark
                            </Button>
                            <Snackbar
                              place="tr"
                              color="danger"
                              icon={ErrorOutlineIcon}
                              message="Select the subject first."
                              open={this.state.tr}
                              closeNotification={() => this.setState({ tr: false })}
                              close
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <Button
                              color="info"
                              href="#pablo"
                              onClick={this.OnGenerateFeedback}
                            >
                              View Feedback
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default ViewMarks;
