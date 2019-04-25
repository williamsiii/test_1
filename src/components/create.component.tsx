import React from 'react';
import Form from "./form";
import { connect } from 'react-redux';
import { addItem } from '../actions';
import {AdType} from '../App';



class Create extends React.Component<any, AdType> {

    constructor(props: any) {
        super(props);

        this.state = {
            id:0,
            title: '',
            description: '',
            number: '',
            city: '',
            image: ''
        }
    }

    onChangeTitle(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            title: e.currentTarget.value
        });
    }

    onChangeDescription(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            description: e.currentTarget.value
        })
    }

    onChangeNumber(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({
            number: e.currentTarget.value
        })
    }

    onCityChange(e: any): void {
        this.setState({
            city: e.value
        })
    }

    onImageChange(e: string): void {
        this.setState({
            image: e
        })
    }

    onSubmit(): void {
        const ads = localStorage.getItem('ads') ? JSON.parse(localStorage.getItem('ads')!) : {ads:[]};
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
            
        this.props.addItem({'ads':newAd});

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
    addItem: (arg: any) => dispatch(addItem(arg))
});
const mapStateToProps = (state: any) => ({
    store: state
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);