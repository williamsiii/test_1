import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from './img/loader.gif';


class SingleAd extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoaded: false,
            author: ''
        }
    }

    componentDidMount() {
        const rnd = Math.floor(Math.random() * 3);

        fetch(`my-json-server.typicode.com/williamsiii/test_1/authors/${rnd}`)
            .then(response => response.json())
            .then(result => this.setState({isLoaded: true, author: result.name}))
            .catch(e => console.log(e));
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
                        <Loader/>
                        :

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

export default SingleAd;