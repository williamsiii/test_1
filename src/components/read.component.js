import React, { Component } from 'react';
import SingleAd from "./singleAd";
import {deleteItem, changePage} from "../actions";
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
        const pageSize = this.props.store.pageSize;
        const pageNum = this.props.store.page
        const rows = this.props.store.adsList.slice( pageSize * pageNum, pageSize * (pageNum + 1) );
        return rows.map((object, i) => <SingleAd obj={object} onDelete={(e) => this.onDelete(e)} key={pageSize * pageNum + i} />);
    }

    onPrevPage() {
        this.props.changePage(--this.props.store.page);
    }

    onNextPage() {
        this.props.changePage(++this.props.store.page);
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
                <button className="btn" onClick={() => this.onPrevPage()} >Назад</button>
                <button className="btn" onClick={() => this.onNextPage()} >Вперёд</button>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    deleteItem: (arg) => dispatch(deleteItem(arg)),
    changePage: (page) => dispatch(changePage(page))
});

const mapStateToProps = state => ({
    store: state
});


export default connect(mapStateToProps,mapDispatchToProps)(Read);