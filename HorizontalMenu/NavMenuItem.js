/**
 * Nav Menu Item
 */
import React, { Fragment, Component } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import IntlMessages from 'Util/IntlMessages';
import Chip from '@material-ui/core/Chip';

class NavMenuItem extends Component {

	componentDidMount() {
		this.updateDimensions();
		window.addEventListener("resize", this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	updateDimensions = () => {
		this.setState({ windowWidth: window.innerWidth });
	}

	render() {
		const { menu } = this.props;
		return (
			<li className="nav-item">
				{menu.menus != null ?
					<Fragment>
						<a href="#" onClick={e => e.preventDefault()} className="nav-link">
							<i className={menu.icon}></i>
							<IntlMessages id={menu.title} />
							{menu.new_item && menu.new_item === true ?
								<Chip label="new" className="new-item" color="secondary" />
								:
								''
							}
						</a>
						<ul className={classnames("list-unstyled sub-menu-child", { 'deep-level': (menu.child_routes != null && menu.child_routes.length > 10) })}>
							{menu.menus.map((subMenu, subKey) => {
								if (!subMenu.child_routes) {
									return (
										<li className='nav-item' key={subKey}>
											<NavLink to={subMenu.path} className="nav-link no-arrow" activeClassName="active">
												<IntlMessages id={subMenu.title} />
												{subMenu.new_item && subMenu.new_item === true ?
													<Chip label="new" className="new-item" color="secondary" />
													:
													''
												}
											</NavLink>
										</li>
									)
								}
								return (
									<li className='nav-item' key={subKey}>
										<a href="#" onClick={e => e.preventDefault()} className="nav-link">
											<IntlMessages id={subMenu.title} />
										</a>
										<ul className="list-unstyled sub-menu-sub-child">
											{subMenu.menus.map((nestedMenu, nestedKey) => (
												<li className="nav-item" key={nestedKey}>
													<NavLink to={nestedMenu.path} className="nav-link" activeClassName="active">
														<IntlMessages id={nestedMenu.title} />
													</NavLink>
												</li>
											))}
										</ul>
									</li>
								);
							})}
						</ul>
					</Fragment> :
					<NavLink to={menu.path} className="nav-link no-arrow">
						<i className={menu.icon}></i>
						<IntlMessages id={menu.title} />
					</NavLink>
				}
			</li>
		);
	}
}

export default NavMenuItem;
