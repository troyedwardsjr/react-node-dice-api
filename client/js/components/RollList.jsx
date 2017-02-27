import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import FontIcon from 'material-ui/FontIcon';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {Card, CardTitle, CardActions} from 'material-ui/Card';

class RollList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-md-6" style={{textAlign: "center"}}>
        <Card style={{textAlign: "center"}}>
          <List defaultValue={3}>
            <Subheader inset={true}>Pick Dice Roll Type</Subheader>
            <ListItem
              leftAvatar={<Avatar icon={<FontIcon className="material-icons">casino</FontIcon>} />}
              primaryText="One Die Roll"
              onClick={() => this.props.setRollType('ONE_DIE_ROLL')}
            />
            <ListItem
              leftAvatar={<Avatar icon={<FontIcon className="material-icons">casino</FontIcon>} />}
              primaryText="Dice Roll"
              onClick={() => this.props.setRollType('DICE_ROLL')}
            />
            <ListItem
              leftAvatar={<Avatar icon={<FontIcon className="material-icons">casino</FontIcon>} />}
              primaryText="Drop Lowest Rolls"
              onClick={() => this.props.setRollType('DROP_LOWEST_ROLLS')}
            />
            <ListItem
              leftAvatar={<Avatar icon={<FontIcon className="material-icons">casino</FontIcon>} />}
              primaryText="Keep Highest Rolls"
              onClick={() => this.props.setRollType('KEEP_HIGHEST_ROLLS')}
            />
            <ListItem
              leftAvatar={<Avatar icon={<FontIcon className="material-icons">casino</FontIcon>} />}
              primaryText="Explosive Roll"
              onClick={() => this.props.setRollType('EXPLOSIVE_ROLL')}
            />
            <ListItem
              leftAvatar={<Avatar icon={<FontIcon className="material-icons">casino</FontIcon>} />}
              primaryText="Literal Value"
              onClick={() => this.props.setRollType('LITERAL_VALUE')}
            />
          </List>
        </Card>
      </div>
    );
  }
}

export default RollList;