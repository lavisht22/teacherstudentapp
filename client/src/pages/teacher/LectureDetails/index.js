import React from 'react';
import { Avatar, Icon, Divider, Button, List } from 'antd';

import lectureIcon from '../../../images/lecture_icon.png';
import './style.css';
import CreateForm from './createForm';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `Lavish Thakkar`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class LectureDetails extends React.Component {
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
          <img className="icon" src={lectureIcon} />
          <div className="detailsHeaderInner">
            <h2>Use Case Diagrams</h2>
            <h3>Software Engineering</h3>
          </div>
          <div>
            <h2 className="lectureCount">30/11/2018</h2>
            <Button type="primary" icon="plus-circle" size="default" onClick={this.showModal}>
              New Interaction
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
        <List
          itemLayout="horizontal"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={listData}
          renderItem={item => (
            <div className="listItem">
              <List.Item
                key={item.title}
                actions={[
                  <IconText type="star-o" text="156" />,
                  <IconText type="like-o" text="156" />,
                  <IconText type="message" text="2" />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
              </List.Item>
            </div>
          )}
        />
      </div>
    );
  }
}

export default LectureDetails;
