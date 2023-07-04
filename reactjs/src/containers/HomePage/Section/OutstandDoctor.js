import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutstandDoctor.scss";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import * as actions from "../../../store/actions";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class OutstandDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listDoctor !== this.props.listDoctor) {
      this.setState({
        arrDoctor: this.props.listDoctor,
      });
    }
  }
  componentDidMount() {
    this.props.getListDoctor();
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    let arrDoctor = this.state.arrDoctor;
    let { language } = this.props;
    // arrDoctor = arrDoctor.concat(arrDoctor).concat(arrDoctor);
    console.log(arrDoctor);
    return (
      <div className="section-share outstandDoctor">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">Bác sĩ nổi bật tuần qua</span>
            <button className="section-button">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctor &&
                arrDoctor.length > 0 &&
                arrDoctor.map((item, index) => {
                  let img64 = "";
                  if (item.image) {
                    img64 = new Buffer(item.image, "base64").toString("binary");
                    console.log("check", item.image);
                  }
                  let vi = `${item.positionData.value_vi} ${item.firstName} ${item.lastName}`;
                  let en = `${item.positionData.value_en} ${item.firstName} ${item.lastName}`;
                  return (
                    <div className="section-item" key={index}>
                      <div className="outstandDoctor-border">
                        <div className="outstandDoctor-img">
                          <div
                            className="bg-image outstandDoctor"
                            style={{ backgroundImage: `url(${img64})` }}
                          />
                        </div>

                        <div className="info-doctor">
                          <div className="doctor-title">
                            {language === languages.VI ? vi : en}
                          </div>
                          <div className="spec-title">
                            Sức khỏe tâm thần tư vấn, trị liệu Tâm lý
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    listDoctor: state.admin.doctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    getListDoctor: () => dispatch(actions.fetchTopDoctorStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandDoctor);
