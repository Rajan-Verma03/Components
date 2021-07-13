/**
 * Sidebar Content
 */
import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import IntlMessages from 'Util/IntlMessages';

import NavMenuItem from './NavMenuItem';

// redux actions
import {onToggleMenu} from 'Actions';

class SidebarContent extends Component {

    toggleMenu(menu, stateCategory) {
        let data = {
            menu,
            stateCategory
        }
        this.props.onToggleMenu(data);
    }

    render() {
        const {menus} = this.props;
        return (
            <div className="rct-sidebar-nav">
                <nav className="navigation">
                    {menus.map((group, key) => (
                        <List
                            key={key}
                            className="rct-mainMenu p-0 m-0 list-unstyled"
                            subheader={
                                <ListSubheader className="side-title" component="li">
                                    <IntlMessages id={group.title}/>
                                </ListSubheader>}
                        >
                            {group.menus.map((menu, key) => (
                                <NavMenuItem
                                    menu={menu}
                                    key={key}
                                    onToggleMenu={() => this.toggleMenu(menu, group)}
                                />
                            ))}
                        </List>
                    ))}
                </nav>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({sidebar}) => {
    const {menus} = sidebar;
    return {menus};
};

export default withRouter(connect(mapStateToProps, {
    onToggleMenu
})(SidebarContent));
