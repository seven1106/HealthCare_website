import React, { Component } from "react";
import { connect } from "react-redux";
import "./Facility.scss";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";

import Slider from "react-slick";

class Facility extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    return (
      <div className="section-share facility">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">Cơ sở y tế nổi bật</span>
            <button className="section-button">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-item">
                <div className="bg-image facility" />
                <div className="item-title">Co xung khop</div>
              </div>
              <div className="section-item">
                <div className="bg-image facility" />
                <div className="item-title">Co xung khop</div>
              </div>
              <div className="section-item">
                <div className="bg-image facility" />
                <div className="item-title">Co xung khop</div>
              </div>
              <div className="section-item">
                <div className="bg-image facility" />
                <div className="item-title">Co xung khop</div>
              </div>
              <div className="section-item">
                <div className="bg-image facility" />
                <div className="item-title">Co xung khop</div>
              </div>
              <div className="section-item">
                <div className="bg-image facility" />
                <div className="item-title">Co xung khop</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Facility);
