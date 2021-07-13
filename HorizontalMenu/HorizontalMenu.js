/**
 * Horizontal Menu
 */
import React, {Component} from 'react';

import IntlMessages from 'Util/IntlMessages';

import NavMenuItem from './NavMenuItem';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class HorizontalMenu extends Component {
    render() {
        var {menus} = this.props;
        var isGroup = true;
        if (menus.length === 1) {
            menus = menus[0].menus;
        }
        return (
            <div className="horizontal-menu">
                <ul className="list-unstyled nav">
                    {menus.map((group, key) => (
                        <li className="nav-item">
                            <a href="#" onClick={e => e.preventDefault()} className="nav-link">
                                <i className={group.icon}></i>
                                <span className="menu-title"><IntlMessages id={group.title}/></span>
                            </a>
                            <ul className="list-unstyled sub-menu">
                                {group.menus.map((menu, key) => (
                                    <NavMenuItem
                                        menu={menu}
                                        key={key}
                                    />
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({sidebar}) => {
    const {menus} = sidebar;
    return {menus};
};

export default withRouter(connect(mapStateToProps)(HorizontalMenu));
