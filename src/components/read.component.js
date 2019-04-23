import React, { Component } from 'react';
import SingleAd from "./singleAd";
import {deleteItem} from "../actions";
import {connect} from "react-redux";

class Read extends Component {

    constructor(props) {
        super(props);
        this.state = {ads: []};
    }

    componentDidMount(){
        let ads = localStorage.getItem('ads');

        if (ads){
            ads = JSON.parse(ads);
            if (ads.ads)
                this.setState({ads: ads.ads});
        }
    }

    onDelete(id) {
        let ads = localStorage.getItem('ads');
        if (ads){
            ads = JSON.parse(ads);
            ads.ads = ads.ads.filter((x) => x.id !== id);
            if (ads.ads)
                this.setState({ads: ads.ads});

            this.props.deleteItem(id);
            localStorage.setItem('ads', JSON.stringify(ads));
        }
    }

    rows(){
        return this.state.ads.map((object, i) => <SingleAd obj={object} onDelete={(e) => this.onDelete(e)} key={i} />);
    }

    render() {
        return (
            <div>
                <h3>Список объявлений</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Телефон</th>
                        <th>Город</th>
                        <th>Автор</th>
                        <th colSpan="2">Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.rows() }
                    </tbody>
                </table>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    deleteItem: (arg) => dispatch(deleteItem(arg))
});

const mapStateToProps = state => ({
    ...state
});


export default connect(mapStateToProps,mapDispatchToProps)(Read);