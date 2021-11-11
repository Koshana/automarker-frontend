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
import Switch from '@mui/material/Switch';

class GenerateMarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false,
      student: '',
      marks: '',
      grade: '',
      status: 'False'
    };

    this.onChangeComboBoxValue = this.onChangeComboBoxValue.bind(this);
    this.OnSubmit = this.OnSubmit.bind(this)
    this.OnhandleChange = this.OnhandleChange.bind(this)
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

  onChangeComboBoxValue(e) {
    this.setState({
      student: e.target.value
    })
  }

  OnhandleChange = (e) => {
    if (e.target.checked) {
      this.setState({
        checked: e.target.checked,
        status: "Ture"
      }, () => {
        console.log("-- ", this.state.status);
      })
    } else if (!e.target.checked) {
      this.setState({
        checked: e.target.checked,
        status: "False"
      }, () => {
        console.log("-- ", this.state.status);
      })
    }
  };

  OnSubmit(e) {
    if (this.state.student == '') {
      this.showNotification("tr")
    } else {
      this.generateMarks();
  }
}

  generateMarks() {
    const obj = {
      student: this.state.student,
      toggle: this.state.status
    }

    console.log("****Object**** ", obj);
    axios.post('https://auto-grading-system.herokuapp.com/generate_score', obj).then(res => {
      console.log(res);
      this.setState({
        marks: res.data.score,
        grade: res.data.grade
      })
    })
    .catch(err => {
      this.showNotification("tr")
    })
  }

  //   getmark(e) {
  //     e.preventDefault()

  //     axios.get("http://localhost:5000/marks/get/" + sessionStorage.getItem("user"))
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
                      Student Name : {this.state.student}
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
                              Student Name
                            </label>
                            <select className="form-control" value={this.state.student} onChange={this.onChangeComboBoxValue}>
                              <option>Select a student</option>
                              <option value="Student1">Student 1</option>
                              <option value="Student2">Student 2</option>
                              <option value="Student3">Student 3</option>
                              <option value="Student4">Student 4</option>
                              <option value="Student5">Student 5</option>
                            </select>
                          </FormGroup>
                          <FormGroup>
                            {/* <ToggleSwitch label=" " /> */}
                              <lable className="form-control-label">Exactly Similar</lable>
                              <Switch
                                checked={this.state.checked}
                                onChange={this.OnhandleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                              <lable className="form-control-label">Similar Logic</lable>
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
                              Generate Mark
                            </Button>
                            <Snackbar
                              place="tr"
                              color="danger"
                              icon={ErrorOutlineIcon}
                              message="Select the student first."
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
                              onClick={(e) => e.preventDefault()}
                            >
                              Generate Feedback
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

export default GenerateMarks;
