import React from 'react';
import Form from "./form";
import {updateItem} from "../actions";
import {connect} from "react-redux";
import {AdType} from '../App';

class Update extends React.Component<any, AdType> {

    public ads: any = null;
    public id: number = 0;

    constructor(props: any) {
        super(props);

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
            this.ads = JSON.parse(localStorage.getItem('ads')!);
            const ad = this.ads.ads.filter((x: AdType) => x.id === this.id)[0];
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

    onChangeTitle(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            title: e.currentTarget.value
        });
    }

    onChangeDescription(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            description: e.currentTarget.value
        })
    }

    onChangeNumber(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            number: e.currentTarget.value
        })
    }

    onCityChange(e: any) {
        this.setState({
            city: e.value
        })
    }

    onImageChange(e: string) {
        this.setState({
            image: e
        })
    }

    onSubmit() {
        const updatedAd = {
            id: this.id,
            title: this.state.title,
            description: this.state.description,
            number: this.state.number,
            city: this.state.city,
            image: this.state.image
        };
        this.ads.ads = this.ads.ads.map((x: AdType) => {
            return x.id === this.id ? updatedAd : x;
        });

        this.props.updateItem({ad:updatedAd});

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
                    onSubmit={() => this.onSubmit()}
                    onChangeTitle={(e: React.FormEvent<HTMLInputElement>) => this.onChangeTitle(e)}
                    onChangeDescription={(e: React.FormEvent<HTMLInputElement>) => this.onChangeDescription(e)}
                    onChangeNumber={(e: React.FormEvent<HTMLInputElement>) => this.onChangeNumber(e)}
                    onCityChange={(e: React.FormEvent<HTMLInputElement>) => this.onCityChange(e)}
                    onImageChange={(e: string) => this.onImageChange(e)}
                />
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch: any) => ({
    updateItem: (arg: any) => dispatch(updateItem(arg))
});


export default connect(() => ({}), mapDispatchToProps)(Update);