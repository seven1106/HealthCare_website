import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import flag from "../../../assets/vi.png";
class HomeHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="homeHeader-container">
          <div className="homeHeader-content">
            <div className="left-content py-2">
              <i class="fas fa-bars"></i>
              <div className="header-logo "></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>Chuyên khoa</b>
                </div>
                <div className="subs-title">Tìm bác sĩ theo chuyên khoa</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Cơ sở y tế</b>
                </div>
                <div className="subs-title">Chọn bệnh viện phòng khám</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Bác sĩ</b>
                </div>
                <div className="subs-title">Chọn bác sĩ giỏi</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Gói khám</b>
                </div>
                <div className="subs-title">Khám sức khỏe tổng quát</div>
              </div>
            </div>
            <div className="right-content">
              <div className="flag">
                <select className="form-select" aria-label="Default select example">
                  <option selected>Việt Nam</option>
                  <option value="1">English</option>
                </select>
                
              </div>
              <div className="search">
                <input type="text" placeholder="Search..." />
                <button className="btn btn-outline-secondary" type="button">
                  <i className="fas fa-search "></i>
                </button>
              </div>
              <div className="support">
                <div className="support-item">
                  <i class="fas fa-question-circle">
                    <span>Hỗ trợ</span>
                  </i>
                  <div className="support-title">0329399087</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="homeHeader-banner">
          <div className="content-top">
            <div className="banner-content1">NỀN TẢNG Y TẾ</div>
            <div className="banner-content2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
          </div>
          <div className="content-bot">
            <div className="option">
              <div className="option-content">
                <div className="option-item">
                  <div className="option-item-img1"></div>
                </div>
                <div className="option-title">Khám Chuyên khoa</div>
              </div>
            </div>
            <div className="option">
              <div className="option-content">
                <div className="option-item">
                  <div className="option-item-img2"></div>
                </div>
                <div className="option-title">Khám từ xa</div>
              </div>
            </div>
            <div className="option">
              <div className="option-content">
                <div className="option-item">
                  <div className="option-item-img3"></div>
                </div>
                <div className="option-title">Khám tổng quát</div>
              </div>
            </div>
            <div className="option">
              <div className="option-content">
                <div className="option-item">
                  <div className="option-item-img4"></div>
                </div>
                <div className="option-title">Xét nghiệm y học</div>
              </div>
            </div>
            <div className="option">
              <div className="option-content">
                <div className="option-item">
                  <div className="option-item-img5"></div>
                </div>
                <div className="option-title">Sức khỏe tinh thần</div>
              </div>
            </div>
            <div className="option">
              <div className="option-content">
                <div className="option-item">
                  <div className="option-item-img6"></div>
                </div>
                <div className="option-title">Khám nha khoa</div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
