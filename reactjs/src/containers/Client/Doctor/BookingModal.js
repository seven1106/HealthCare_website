import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "./ProfileDoctor";
import _ from "lodash";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    if (this.state.language !== prevState.language) {
    }
  }
  toggle = () => {
    this.props.closeModal();
  };
  render() {
    let { doctorId } = "";
    if (!_.isEmpty(this.props.data)) {
      doctorId = this.props.data.doctorId;
    }

    return (
      <>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => {
            this.toggle();
          }}
          className={"modal-user-container"}
          size="lg"
        >
          <ModalHeader
            toggle={() => {
              this.toggle();
            }}
          >
            <span className="model-title ">ĐẶT LỊCH KHÁM</span>
          </ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="doctor-info">
                <ProfileDoctor doctorId={doctorId}
                  isShowDescription={false}
                  dataTime={this.props.data}
                />
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={(e) => {
                        this.setState({ email: e.target.value });
                      }}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group py-2">
                    <label htmlFor="exampleInputPassword1">Ly do kham</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Kham cho ai</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">First name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={(e) => {
                        this.setState({ firstName: e.target.value });
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Phone number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={(e) => {
                        this.setState({ phoneNumber: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={(e) => {
                        this.setState({ address: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Sex</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      onChange={(e) => {
                        this.setState({ roleId: e.target.value });
                        console.log("role", this.state.role);
                      }}
                    >
                      <option>Choose role...</option>
                      <option>Admin</option>
                      <option>Doctor</option>
                      <option>Patient</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn px-2"
              color="primary"
              onClick={() => {
                this.handelAddUser();
              }}
            >
              Add new
            </Button>{" "}
            <Button
              className="btn-cancel px-2"
              color="secondary"
              onClick={() => {
                this.toggle();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
