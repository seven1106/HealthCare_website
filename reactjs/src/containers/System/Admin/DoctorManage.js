import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DoctorManage.scss";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS } from "../../../utils";
import { getDetailInforDoctorApi } from "../../../services/userService";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class DoctorManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDrs: [],
    };
  }
  componentDidMount() {
    this.props.getAllDoctors();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.dataInputSelect(this.props.allDoctors);
      this.setState({
        listDrs: dataSelect,
      });
    }
  }
  dataInputSelect = (input) => {
    let data = [];
    if (input && input.length > 0) {
      input.map((item) => {
        let name = `${item.firstName} ${item.lastName}`;
        data.push({
          value: item.id,
          label: name,
        });
      });
      return data;
    }
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    this.props.saveDetail({
      doctorId: this.state.selectedOption.value,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
    });
    console.log(this.state);
  };
  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailInforDoctorApi(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.markdown) {
      let data = res.data.markdown;
      this.setState({
        contentMarkdown: data.contentMarkdown,
        contentHTML: data.contentHTML,
        description: data.description,
      });
      console.log(this.state);
    } else {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
      });
    }
  };
  handleOnChangeDesc = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="doctorManage-container px-2">
          <div className="title my-5">MANAGE DOCTORS</div>
          <div className="doctorManage-body">
            <div className="selectDoctor">
              <div className="selectDoctor-left form-group">
                <label className="label">Choose doctor:</label>
                <Select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={this.state.listDrs}
                  placeholder="Select Doctor"

                />
              </div>
              <div className="selectDoctor-right form-group">
                <label className="label">Description:</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                  value={this.state.description}
                  onChange={this.handleOnChangeDesc}
                />
              </div>
            </div>
            <div className="doctorManage-editor">
              <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.contentMarkdown}
              />
            </div>
          </div>
        </div>
        <div className="add-new">
          <button
            className="btn px-3"
            onClick={() => this.handleSaveContentMarkdown()}
          >
            <span> Save changes</span>
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.fetchAllDoctorStart()),
    saveDetail: (data) => dispatch(actions.saveDetailDoctorStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
