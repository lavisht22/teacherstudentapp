import React from 'react';
import { Table, Tag, Divider, Button } from 'antd';

import courseIcon from '../../../images/course_icon.jpg';
import './style.css';
import CreateForm from './createForm';

const columns = [
  {
    title: 'Topic',
    dataIndex: 'topic',
    key: 'topic',
    render: text => <a href="javascript:;">{text}</a>,
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

const data = [
  {
    key: '1',
    topic: 'UML Diagrams',
    date: 'Today',
  },
  {
    key: '2',
    topic: 'Activity Diagram',
    date: 'Yesterday',
  },
];

class CourseDetails extends React.Component {
  state = {
    visible: false,
  };

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
            <h2>Software Engineering</h2>
            <h3>Computer Science</h3>
          </div>
          <div>
            <h2 className="lectureCount">10 Lectures</h2>
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
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default CourseDetails;
