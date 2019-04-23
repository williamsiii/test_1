import React, { Component } from 'react';
import Form from "./form";
import { connect } from 'react-redux';
import { addItem } from '../actions';


class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            number: '',
            city: '',
            image: ''
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeNumber(e) {
        this.setState({
            number: e.target.value
        })
    }

    onCityChange(e) {
        this.setState({
            city: e.value
        })
    }

    onImageChange(e) {
        this.setState({
            image: e
        })
    }

    onSubmit() {
        const ads = localStorage.getItem('ads') ? JSON.parse(localStorage.getItem('ads')) : {ads:[]};
        const id = ads.ads.length ? ads.ads[ads.ads.length-1].id + 1 : 0;
        const newAd = {
            id,
            title: this.state.title,
            description: this.state.description,
            number: this.state.number,
            city: this.state.city,
            image: this.state.image
        };
        ads.ads.push(newAd);
            
        this.props.addItem({ads:newAd});

        localStorage.setItem('ads', JSON.stringify(ads));
        this.setState({
            title: '',
            description: '',
            number: '',
            city: '',
            image: ''
        })
    }

    render() {
        return (
            <div >
                <h3>Создать объявление</h3>
                <Form
                    style={{marginTop: 10}}
                    obj={this.state}
                    action="Создать"
                    onSubmit={(e) => this.onSubmit(e)}
                    onChangeTitle={(e) => this.onChangeTitle(e)}
                    onChangeDescription={(e) => this.onChangeDescription(e)}
                    onChangeNumber={(e) => this.onChangeNumber(e)}
                    onCityChange={(e) => this.onCityChange(e)}
                    onImageChange={(e) => this.onImageChange(e)}
                 />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addItem: (arg) => dispatch(addItem(arg))
});

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps,mapDispatchToProps)(Create);