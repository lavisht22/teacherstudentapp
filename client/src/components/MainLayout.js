import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../pages/home';
import About from '../pages/about';
import Sidebar from './sidebar';
import AppHeader from './Header';
import { fetchUserProfile, fetchRoute } from '../actions/user';

import TeacherDashboard from '../pages/teacher/Dashboard';
import TeacherCourseDetails from '../pages/teacher/CourseDetails';
import LectureDetails from '../pages/teacher/LectureDetails';

const { Header, Footer, Content } = Layout;

class MainLayout extends Component {
  componentDidMount() {
    this.props.fetchUserProfile();
  }

  render() {
    console.log(this.props.role);
    return (
      <div className="App">
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout>
            <Header className="App-header">
              <AppHeader />
            </Header>
            <Content className="App-body">
              {this.props.role === 'teacher' ? (
                <Switch>
                  <Route exact component={TeacherDashboard} path="/" />
                  <Route component={TeacherCourseDetails} path="/course/:id" />
                  <Route component={LectureDetails} path="/lecture/:id" />
                  <Redirect to="/404" />
                </Switch>
              ) : (
                <Switch>
                  <Route exact component={Home} path="/" />
                  <Route component={About} path="/about" />

                  <Redirect to="/404" />
                </Switch>
              )}
            </Content>
            <Footer>footer</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  role: state.user.role,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUserProfile: () => fetchUserProfile(),
      fetchRoute: () => fetchRoute(),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout);
