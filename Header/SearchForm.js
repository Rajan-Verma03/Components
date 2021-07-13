/**
 * Search Form
 */
import React, {Component} from 'react'
import {Input} from 'reactstrap';
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";
import withWidth from '@material-ui/core/withWidth';
import {connect} from 'react-redux';
import ListItemIcon from "@material-ui/core/ListItemIcon";


function renderSuggestion(suggestion, {query, isHighlighted}) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                <ListItemIcon style={{minWidth: 20}} className="pr-5">
                    <i className={suggestion.icon}></i>
                </ListItemIcon>
                <span className="menu d-inline-block">
            {parts.map((part, index) => {
                return part.highlight ? (
                    <span key={String(index)} style={{color: "black", fontWeight: 700}}>
							{part.text}
						</span>
                ) : (
                    <strong key={String(index)} style={{color: "black", fontWeight: 100}}>
                        {part.text}
                    </strong>
                );
            })}</span>
            </div>
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const {containerProps, children} = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

function getSuggestions(searchMenus, value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    return inputLength === 0
        ? []
        : searchMenus.filter(menu => {
            const keep =
                count < 5 && searchText(menu.label, inputValue);

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

function searchText(str, query) {
    let words = str.toLowerCase().split(" ");
    let queryLength = query.length;
    for (let index in words) {
        if (words[index].slice(0, queryLength) === query) {
            return true;
        }
    }
    return false;
}

const styles = theme => ({
    suggestionsContainerOpen: {
        width: '100%',
        position: 'absolute',
        top: 38,
        zIndex: 2
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    searchBox: {
        "position": "absolute !important",
        "zIndex": 999999,
        "width": "100%",
    }
});

class SearchForm extends Component {
    state = {
        showSearch: false,
        value: '',
        suggestions: []
    };

    renderInput(width, showSearch, inputProps) {
        const {ref} = inputProps;
        return (
            <Input autoFocus={width === "xs" && showSearch} {...inputProps} innerRef={ref} type="search"
                   className="search-input-lg"
                   placeholder="Search.."/>
        );
    }

    handleSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(this.props.searchMenus, value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = (event, {newValue}) => {
        this.setState({
            value: newValue,
        });
    };

    render() {
        const {classes, history, width} = this.props;
        const {showSearch} = this.state;
        const searchClassName = (width === "xs" && showSearch ? ("mobile-search-wrapper") : "search-wrapper");
        return (
            <div className={searchClassName} onClick={() => {
                if (width === "xs") {
                    this.setState({showSearch: true});
                }
            }}>
                {
                    (width !== "xs" || showSearch) && <Autosuggest
                        theme={{
                            suggestionsContainerOpen: classes.suggestionsContainerOpen,
                            suggestionsList: classes.suggestionsList,
                            suggestion: classes.suggestion,
                        }}
                        renderInputComponent={this.renderInput.bind(this, width, showSearch)}
                        suggestions={this.state.suggestions}
                        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                        renderSuggestionsContainer={renderSuggestionsContainer}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        onSuggestionSelected={(event, option) => {
                            if (width === "xs") {
                                this.setState({showSearch: false});
                            }
                            history.push(option.suggestion.path);
                        }}
                        inputProps={{
                            classes,
                            value: this.state.value,
                            onBlur: () => {
                                if (width === "xs") {
                                    this.setState({showSearch: false});
                                }
                            },
                            onChange: this.handleChange,
                        }}
                    />
                }
            </div>
        )
    }
}

// map state to props
const mapStateToProps = ({sidebar}) => {
    const {searchMenus} = sidebar;
    return {searchMenus};
}
export default withWidth()(connect(mapStateToProps)(withStyles(styles)(SearchForm)));
