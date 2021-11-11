import React from "react";
import axios, { post } from 'axios';
import { Modal } from 'react-bootstrap'
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
import UserHeader from "components/Headers/UserHeader.js";
import AddAlert from "@material-ui/icons/AddAlert";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Snackbar from "components/Snackbar/Snackbar";

class Dashborad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false,
      file: null,
      subject: '',
      showHide: false,
      data: "",
      userKey: ""
    }

    this.OnSubmit = this.OnSubmit.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onChangeComboBoxValue = this.onChangeComboBoxValue.bind(this);
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
    e.preventDefault() // Stop form submit
    // this.fileUpload(this.state.file).then((response)=>{
    //   console.log(response.data);
    // })
    console.log("*****file***** ", this.state.file);
    console.log("*****subject***** ", this.state.subject);
    if (this.state.file == null || this.state.subject == '') {
      this.showNotification("tr")
    } else {
      this.fileUpload(this.state.file);
    }
  }

  fileUpload(file) {
    const formData = new FormData();

    // Update the formData object
    formData.append(
      sessionStorage.getItem("key"),
      this.state.file,
    );

    // Details of the uploaded file
    console.log("wddwedewdwe", this.state.file);

    // Request made to the backend api
    // Send formData object
    axios.post("https://auto-grading-system.herokuapp.com/upload/" + sessionStorage.getItem("key"), formData).then(res => {
      console.log("*********Response************ ", res.data.status);
      if (res.data.status == "Success") {
        if (sessionStorage.getItem("user") == "lec") {
          this.props.history.push('/admin/generate-feature-vector');
        } else if (sessionStorage.getItem("user") == "stu") {
          this.props.history.push('/admin/view-marks');
        }
      } else {
        alert("File Upload Faild")
      }
    });
  }

  onChangeComboBoxValue(e) {
    this.setState({
      subject: e.target.value
    })
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }

  handleModalShowHide() {
    const formData = new FormData();

    // Update the formData object
    formData.append(
      sessionStorage.getItem("key"),
      this.state.file,
    );

    axios.post("https://auto-grading-system.herokuapp.com/generate_tree/" + sessionStorage.getItem("key"), formData).then(res => {
      console.log("*********Response************ ", res);
      this.setState({
        data: res.data.ast
      })
    });
    this.setState({ showHide: !this.state.showHide })
  }

  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="9">
              <Card className="bg-secondary shadow">
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Upload Answer Script
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
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Answer Script
                            </label>
                            <Input
                              className="form-control-alternative"
                              type="file"
                              onChange={this.onChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <br></br>
                      <Row>
                        <Col lg="1.5">
                          <FormGroup>
                            <Button
                              color="success"
                              href="#pablo"
                              onClick={this.OnSubmit}
                            >
                              Upload
                            </Button>
                            <Snackbar
                              place="tr"
                              color="danger"
                              icon={ErrorOutlineIcon}
                              message="Input feilds cannot be empty."
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
                              onClick={() => this.handleModalShowHide()}
                            >
                              Generate Tree
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
          <Modal show={this.state.showHide}>
            <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
              <Modal.Title>Generated Tree</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.data}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </>
    );
  }
}

export default Dashborad;
