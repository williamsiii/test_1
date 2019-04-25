import React from 'react';
import SingleAd from "./singleAd";
import {deleteItem, changePage} from "../actions";
import {connect} from "react-redux";
import {AdType} from '../App';

class Read extends React.Component<any> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount(){
        const adsString: string = localStorage.getItem('ads')!;

        if (adsString){
            const ads: any = JSON.parse(adsString);
            if (ads.ads)
                this.setState({ads: ads.ads});
        }
    }

    onDelete(id: number) {
        const adsString: string = localStorage.getItem('ads')!;
        if (adsString){
            const ads: any = JSON.parse(adsString);
            ads.ads = ads.ads.filter((x: AdType) => x.id !== id);
            if (ads.ads)
                this.setState({ads: ads.ads});

            this.props.deleteItem(id);
            localStorage.setItem('ads', JSON.stringify(ads));
        }
    }

    rows(): React.Component<any>{
        const pageSize = this.props.store.pageSize;
        const pageNum = this.props.store.page;
        const rows = this.props.store.adsList.slice( pageSize * pageNum, pageSize * (pageNum + 1) );
        return rows.map((object: AdType, i: number) => <SingleAd obj={object} onDelete={(e: number) => this.onDelete(e)} key={pageSize * pageNum + i} />);
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
                        <th colSpan={2}>Действие</th>
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


const mapDispatchToProps = (dispatch: any) => ({
    deleteItem: (arg: any) => dispatch(deleteItem(arg)),
    changePage: (page: any) => dispatch(changePage(page))
});

const mapStateToProps = (state: any) => ({
    store: state
});


export default connect(mapStateToProps,mapDispatchToProps)(Read);