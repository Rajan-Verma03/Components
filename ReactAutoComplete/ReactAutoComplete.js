import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CircularProgress from '@material-ui/core/CircularProgress';


class ReactAutoComplete extends React.Component {

    state = {
        open: false
    }

    handleOpen() {
        this.setState({open: true});
        if (this.props.onOpen) {
            this.props.onOpen();
        }
    }

    handleClose() {
        this.setState({open: false});
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    getRenderOption = (multiple, display) => {
        if (this.props.renderOption) {
            return this.props.renderOption;
        }
        return (option, {selected}) => (
            <React.Fragment>
                {multiple &&
                <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{marginRight: 8}}
                    checked={selected}
                />
                }
                {option[display]}
            </React.Fragment>
        )
    }

    render() {
        const {label, multiple, placeholder, data, display, inputProps, loading, ...props} = this.props;
        const {open = false} = this.state;
        const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
        const checkedIcon = <CheckBoxIcon fontSize="small"/>;
        return (
            <Autocomplete
                {...props}
                multiple={multiple}
                open={open}
                onOpen={this.handleOpen.bind(this)}
                onClose={this.handleClose.bind(this)}
                id="checkboxes-tags-demo"
                options={data}
                size="small"
                limitTags={1}
                loading={loading}
                disableCloseOnSelect
                getOptionLabel={(option) => option[display]}
                renderOption={this.getRenderOption(multiple, display)}
                renderInput={(params) => (
                    <TextField {...params} {...inputProps} variant="outlined" label={label} placeholder={placeholder}
                               InputProps={{
                                   ...params.InputProps,
                                   endAdornment: (
                                       <React.Fragment>
                                           {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                           {params.InputProps.endAdornment}
                                       </React.Fragment>
                                   ),
                               }}
                    />
                )}
            />
        );
    }

}


export default ReactAutoComplete;