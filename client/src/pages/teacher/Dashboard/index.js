import React from 'react';
import { Card, Icon, Avatar } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { getAllCourses } from '../../../actions/teacher';

const { Meta } = Card;

class TeacherDashboard extends React.Component {
  componentDidMount() {
    this.props.getAllCourses();
  }

  render() {
    console.log(this.props.courses);
    return (
      <div>
        {this.props.courses.map(course => (
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <Icon type="setting" />,
              <Icon type="edit" onClick={() => this.props.navigate(`/course/${course._id}`)} />,
              <Icon type="ellipsis" />,
            ]}
          >
            <Meta title={course.code} description={course.name} />
          </Card>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.teacher.courses,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAllCourses, navigate: route => push(route) }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherDashboard);
