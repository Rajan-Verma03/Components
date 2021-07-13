import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

class SearchBox extends React.Component {

    onEnterPressed = (event) => {
        if (event.keyCode === 13) {
            const {onSearch} = this.props;
            const search = event.target.value;
            onSearch(search);
        }
    };

    render() {

        return (<TextField size={"small"} onKeyDown={this.onEnterPressed.bind(this)}
                           type="text"
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment  position="start">
                                       <SearchIcon/>
                                   </InputAdornment>
                               ),
                           }}
                           variant="outlined"
        />);
    }
}


export default SearchBox;