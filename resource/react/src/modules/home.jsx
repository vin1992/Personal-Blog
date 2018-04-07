import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <h1>Hell yeah!</h1>
        <Badge
          badgeContent={4}
          primary={true}
        >
          <NotificationsIcon />
        </Badge>
        <Badge
          badgeContent={10}
          secondary={true}
          badgeStyle={{ top: 12, right: 12 }}
        >
          <IconButton tooltip="Notifications">
            <NotificationsIcon />
          </IconButton>
        </Badge>
      </MuiThemeProvider>
    )
  }
}