import React, { Component } from 'react';
import Form from "./form";

export default class Update extends Component {

    constructor(props) {
        super(props);
        this.ads = null;
        this.id = 0;
        this.state = {
            id: 0,
            title: '',
            description: '',
            number:'',
            city: '',
            image: ''
        }
    }

    componentDidMount() {
        try {
            this.id = Number(this.props.match.params.id);
            this.ads = JSON.parse(localStorage.getItem('ads'));
            const ad = this.ads.ads.filter((x) => x.id === this.id)[0];
            this.setState({
                id: this.id,
                title: ad.title,
                description: ad.description,
                number: ad.number,
                city: ad.city,
                image: ad.image
            });
        } catch(err){
            throw Error(err);
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
        this.ads.ads = this.ads.ads.map((x) => {
            return x.id === this.id ?
                {
                    id: x.id,
                    title: this.state.title,
                    description: this.state.description,
                    number: this.state.number,
                    city: this.state.city,
                    image: this.state.image
                } : x;
        });
        const ads = JSON.stringify(this.ads);
        localStorage.setItem('ads', ads);

        this.props.history.push('/read');
    }


    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Редактировать объявление</h3>
                <Form
                    obj={this.state}
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