import React from 'react';

export default class TodoApp extends React.Component {
    state = {
        options: [],
        selectedOptions: undefined
    };
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };
    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOptions: undefined }));
    };
    handleDeleteOption = optionToRemove => {
        this.setState(prevState => ({
            options: prevState.options.filter(option => optionToRemove !== option)
        }));
    };
    handlePick = () => {
        const randomNumber = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNumber];
        this.setState(() => ({
            selectedOption: option
        }));
    };
    handleAddOption = option => {
        if (!option) {
            return "Enter valid value to add an item";
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState(prevState => ({
            options: prevState.options.concat(option)
        }));
    };
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({ options }));
            }
        } catch(e) {}
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    render() {
        const subtitle = 'Awesome todos';

        return (
            <div>
                <Header subtitle={subtitle} />
                <div className="container">
                    <Action hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <Options
                        options={this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOption={this.handleDeleteOption}
                    />
                    <AddOption
                        handleAddOption={this.handleAddOption}
                    />
                    <OptionModal
                        selectedOption={this.state.selectedOption}
                        handleClearSelectedOption={this.handleClearSelectedOption}
                    />
                </div>
            </div>
        );
    }
}