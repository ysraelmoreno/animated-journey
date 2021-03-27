import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Courses from '../pages/Courses';
import Course from '../pages/Course';
import CreateCourse from '../pages/CreateCourse';
import Profile from '../pages/Profile';
import EditCourse from '../pages/EditCourse';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/resetpassword" component={ResetPassword} />
      <Route path="/courses" component={Courses} isPrivate />
      <Route path="/course/:id" component={Course} isPrivate />
      <Route path="/createcourse" component={CreateCourse} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/editcourse/:id" component={EditCourse} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
