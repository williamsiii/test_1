import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import loader from '../img/loader.gif';
import {connect} from "react-redux";
import {assignAdToAuthor} from '../actions';

class SingleAd extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        this.getAuthor();
    }

    async getAuthor(){
        const rnd = Math.floor(Math.random() * 3) + 1;

        try {

            let resp = await fetch(`http://my-json-server.typicode.com/williamsiii/test_1/authors/${rnd}`,
                {
                    mode: "cors",
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                })

            resp = await resp.json();
            this.props.assignAdToAuthor(this.props.obj.id, resp.name);
            this.setState({isLoaded: true})
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.title}
                </td>
                <td>
                    {this.props.obj.description}
                </td>
                <td>
                    {this.props.obj.number}
                </td>
                <td>
                    {this.props.obj.city}
                </td>
                <td>
                    {!this.state.isLoaded ?
                        <img width="40" height="30" src={loader} alt="loading..." />
                        :
                        this.props.obj.name
                    }
                </td>
                <td>
                    <Link to={"/update/"+this.props.obj.id} className="btn btn-primary">Редактировать</Link>
                </td>
                <td>
                    <button onClick={(e) => this.props.onDelete(this.props.obj.id)}  className="btn btn-danger">Удалить</button>
                </td>
            </tr>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    assignAdToAuthor: (id, name) => dispatch(assignAdToAuthor(id, name))
});

export default connect(() => ({}), mapDispatchToProps)(SingleAd);