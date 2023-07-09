import React, { Component } from "react";
import { connect } from "react-redux";
import { languages } from "../../../utils";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByIdApi } from "../../../services/userService";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
        allDays: [],
    };
  }
  async componentDidMount() {
      let { language } = this.props;
      this.SetArrDays(language);
    }
    SetArrDays = (language) => {
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let day = {}
            day.label = moment().add(i, "days").locale(language === languages.VI ? "vi" : "en").format("ddd - DD/MM");
            day.value = moment().add(i, "days").startOf('day').valueOf();
            arrDays.push(day);

        }
        this.setState({
            allDays: arrDays,
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            this.SetArrDays(this.props.language);
        }
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let doctorId = this.props.doctorId;
            let date = event.target.value;
            let res = await getScheduleDoctorByIdApi(doctorId, date);
            console.log("res", res);
            // if (res && res.errCode === 0) {
            //     this.props.handleOnChangeSchedule(res.data);
            // }
        }
    }



    render() {
        let { allDays } = this.state;
    return (
      <>
        <div className="detail-doctor-container">
                <div className="detail-doctor-body">
                    <select className="select-day" onChange={(event) => this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 && allDays.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>{item.label}</option>
                            )
                        })}
                    </select>
                    
            
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
