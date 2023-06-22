import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutstandDoctor.scss";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class OutstandDoctor extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    console.log(this.props);
    return (
      <div className="section-share outstandDoctor">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">Bác sĩ nổi bật tuần qua</span>
            <button className="section-button">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-item">
              <div className="outstandDoctor-border">
                <div className="outstandDoctor-img">
                  <div className="bg-image outstandDoctor" />
                </div>

                <div className="info-doctor">
                  <div className="doctor-title">
                    Bác sĩ chuyên khoa II: Trần Minh Khuyến
                  </div>
                  <div className="spec-title">
                    Sức khỏe tâm thần tư vấn, trị liệu Tâm lý
                  </div>
                </div>
              </div>
              </div>
              
              <div className="section-item">
              <div className="outstandDoctor-border">
                <div className="outstandDoctor-img">
                  <div className="bg-image outstandDoctor" />
                </div>

                <div className="info-doctor">
                  <div className="doctor-title">
                    Bác sĩ chuyên khoa II: Trần Minh Khuyến
                  </div>
                  <div className="spec-title">
                    Sức khỏe tâm thần tư vấn, trị liệu Tâm lý
                  </div>
                </div>
              </div>
              </div>
              
              <div className="section-item">
              <div className="outstandDoctor-border">
                <div className="outstandDoctor-img">
                  <div className="bg-image outstandDoctor" />
                </div>

                <div className="info-doctor">
                  <div className="doctor-title">
                    Bác sĩ chuyên khoa II: Trần Minh Khuyến
                  </div>
                  <div className="spec-title">
                    Sức khỏe tâm thần tư vấn, trị liệu Tâm lý
                  </div>
                </div>
              </div>
              </div>
              
              <div className="section-item">
              <div className="outstandDoctor-border">
                <div className="outstandDoctor-img">
                  <div className="bg-image outstandDoctor" />
                </div>

                <div className="info-doctor">
                  <div className="doctor-title">
                    Bác sĩ chuyên khoa II: Trần Minh Khuyến
                  </div>
                  <div className="spec-title">
                    Sức khỏe tâm thần tư vấn, trị liệu Tâm lý
                  </div>
                </div>
              </div>
              </div>
              
              <div className="section-item">
              <div className="outstandDoctor-border">
                <div className="outstandDoctor-img">
                  <div className="bg-image outstandDoctor" />
                </div>

                <div className="info-doctor">
                  <div className="doctor-title">
                    Bác sĩ chuyên khoa II: Trần Minh Khuyến
                  </div>
                  <div className="spec-title">
                    Sức khỏe tâm thần tư vấn, trị liệu Tâm lý
                  </div>
                </div>
              </div>
              </div>
              
              <div className="section-item">
              <div className="outstandDoctor-border">
                <div className="outstandDoctor-img">
                  <div className="bg-image outstandDoctor" />
                </div>

                <div className="info-doctor">
                  <div className="doctor-title">
                    Bác sĩ chuyên khoa II: Trần Minh Khuyến
                  </div>
                  <div className="spec-title">
                    Sức khỏe tâm thần tư vấn, trị liệu Tâm lý
                  </div>
                </div>
              </div>
              </div>
              
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandDoctor);
