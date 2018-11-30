import React from 'react';
import { Table, Tag, Divider, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import courseIcon from '../../../images/course_icon.jpg';
import './style.css';
import CreateForm from './createForm';
import { getCourseDetails } from '../../../actions/teacher';

const columns = [
  {
    title: 'Topic',
    dataIndex: 'topic',
    key: 'topic',
    render: (text, record) => (
      <a onClick={() => push(`/lecture/${record._id}`)} href="javascript:;">
        {text}
      </a>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">View</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    ),
  },
];

class CourseDetails extends React.Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    this.props.getCourseDetails(this.props.match.params.id);
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div className="courseDetailsContainer">
        <div className="detailsHeader">
          <img className="icon" src={courseIcon} />
          <div className="detailsHeaderInner">
            <h2>{this.props.course_details.name}</h2>
            <h3>{this.props.course_details.code}</h3>
          </div>
          <div>
            <h2 className="lectureCount">
              {this.props.course_details.lectures ? this.props.course_details.lectures.count : 0}{' '}
              Lectures
            </h2>
            <Button type="primary" icon="plus-circle" size="default" onClick={this.showModal}>
              New Lecture
            </Button>
            <CreateForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
            />
          </div>
        </div>
        <Divider />
        <Table columns={columns} dataSource={this.props.course_details.lectures} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  course_details: state.teacher.course_details,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getCourseDetails, navigate: route => push(route) }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDetails);
