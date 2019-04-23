import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class SingleAd extends Component {

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