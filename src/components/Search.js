import React, { Component } from 'react';

export class Search extends Component {
    state = {
        text: ''
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    // This syntax require binding either in constructor or in call of the function
    // onSubmit(e) {
    //     e.preventDefault();
    //     console.log(this.state);
    // }

    onSubmit = e => {
        e.preventDefault();
        this.props.searchUsers(this.state.text);
        this.setState({ text: '' });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className='form'>
                    <input
                        type='text'
                        name='text'
                        placeholder='Search Users...'
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <input
                        type='submit'
                        value='Search'
                        className='btn btn-dark btn-block'
                    />
                </form>
            </div>
        );
    }
}

export default Search;
