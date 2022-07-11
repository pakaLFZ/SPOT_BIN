import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom'
import {
  renderRoutes
} from 'react-router-config'

import Loading from "component/Loading/index";

// const User_Import = React.lazy(() => import('pages/User/index.jsx'));
const Home_ = React.lazy(() => import('pages/Home/index.jsx'));

const Authentication_Import = React.lazy(() => import('pages/Authentication/index'));
const Post_Import = React.lazy(() => import('pages/Post/post.jsx'));
const Edit_Import = React.lazy(() => import('pages/Post/edit.jsx'));
const Test_Import = React.lazy(() => import('pages/Test/Test.jsx'));
const Explore_ = React.lazy(() => import('pages/Explore/index.jsx'));
const Network_ = React.lazy(() => import('pages/Network/index.jsx'));
const View_ = React.lazy(() => import('pages/Explore/view.jsx'));
const About_ = React.lazy(() => import('pages/About/index.jsx'));
const UserInfo_ = React.lazy(() => import('pages/User/view.jsx'));
const UserInfoEdit_ = React.lazy(() => import('pages/User/view_edit.jsx'));



// const User = () => (
//   <Suspense fallback={<Loading/>}>
//     <User_Import />
//   </Suspense>
// )
const Home = () => (
  <Suspense fallback={<Loading/>}>
    <Home_ />
  </Suspense>
)

const Authentication = () => (
  <Suspense fallback={<Loading/>}>
    <Authentication_Import />
  </Suspense>
)
const Post = () => (
  <Suspense fallback={<Loading/>}>
    <Post_Import />
  </Suspense>
)
const Edit = () => (
  <Suspense fallback={<Loading/>}>
    <Edit_Import />
  </Suspense>
)
const Test = () => (
  <Suspense fallback={<Loading/>}>
    <Test_Import />
  </Suspense>
)
const Explore = () => (
  <Suspense fallback={<Loading/>}>
    <Explore_ />
  </Suspense>
)
const Network = () => (
  <Suspense fallback={<Loading/>}>
    <Network_ />
  </Suspense>
)
const View = () => (
  <Suspense fallback={<Loading/>}>
    <View_ />
  </Suspense>
)
const About = () => (
  <Suspense fallback={<Loading/>}>
    <About_ />
  </Suspense>
)
const UserInfo = () => (
  <Suspense fallback={<Loading/>}>
    <UserInfo_ />
  </Suspense>
)
const UserInfoEdit = () => (
  <Suspense fallback={<Loading/>}>
    <UserInfoEdit_ />
  </Suspense>
)
const RedirectTo404 = () => <Redirect to='/404' />
RedirectTo404.displayName = '404redirection'
const p404 = {
  path: '*',
  component: RedirectTo404
}

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/auth',
    component: Authentication,
    exact: true
  },
  {
    path: '/user/:email_L',
    component: UserInfo,
    exact: true
  },
  {
    path: '/user/:email_L/edit',
    component: UserInfoEdit,
    exact: true
  },
  {
    path: '/about',
    component: About,
    exact: true
  },
  { 
    path: '/post',
    component: Post,
    exact: true
  },
  { 
    path: '/edit',
    component: Edit,
    exact: true
  },
  {
    path: '/explore',
    component: Explore,
    exact: true
  },
  {
    path: '/network',
    component: Network,
    exact: true
  },
  {
    path: '/explore/:projectId_L',
    component: View,
    exact: true
  },
  {
    path: '/test',
    component: Test,
    exact: true
  },
]

const GetRouter = () => {
  return (
    <Router>
      <Switch>
        {renderRoutes(routes)}
      </Switch>
    </Router>
  )
}

export default GetRouter;


