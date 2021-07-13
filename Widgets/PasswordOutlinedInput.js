import React, {Component} from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";


class PasswordOutlinedInput extends Component {

    state = {
        type: "password"
    }

    handleClickShowPassword = () => {
        const {type} = this.state;
        this.setState({type: type === "password" ? "text" : "password"});
    };

    handleMouseDownPassword = (e) => {
        e.preventDefault();
    };


    render() {
        const {type} = this.state;
        return <OutlinedInput
            type={type}
            {...this.props}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        tabIndex="-1"
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword.bind(this)}
                        onMouseDown={this.handleMouseDownPassword.bind(this)}
                        edge="end"
                    >
                        {type !== 'password' ? <Visibility/> : <VisibilityOff/>}
                    </IconButton>
                </InputAdornment>
            }
        />
    }
}

export default PasswordOutlinedInput;
