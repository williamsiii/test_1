import React from 'react';
const Select = require('react-select').default;

const cities = [
    '',
    "Абакан",
    "Азов",
    "Александров",
    "Алексин",
    "Альметьевск",
    "Анапа",
    "Ангарск",
    "Анжеро-Судженск",
    "Апатиты",
    "Арзамас",
    "Армавир",
    "Арсеньев",
    "Артем",
    "Архангельск",
    "Асбест",
    "Астрахань",
    "Ачинск",
    "Балаково",
    "Балахна",
    "Балашиха",
    "Балашов",
    "Барнаул",
    "Батайск",
    "Белгород",
    "Белебей",
    "Белово",
    "Белогорск (Амурская область)",
    "Белорецк",
    "Белореченск",
    "Бердск",
    "Березники"
].map((x) => ({value: x, label: x}));




class Form extends React.Component<any, any> {
    fileInput: HTMLInputElement | null = null;

    constructor(props: any) {
        super(props);

        this.state = {
            titleValid: true,
            descriptionValid: true,
            numberValid: true
        }
    }

    componentWillReceiveProps(nextProps: any, prevState: any){

        if (nextProps.obj && nextProps.obj.image && nextProps.obj.image.length === 0) {
            const canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;
            if (canvas)
                canvas.height = 0;
        } else {
            if (nextProps.obj && nextProps.obj.image)
                this.changeImage(nextProps.obj.image)
        }


        return true;
    }

    checkValid(field: string): string {
        return Boolean(this.state[field]) ? 'hide' : 'error';
    }

    onChangeTitle(e: React.FormEvent<HTMLInputElement> ): void {

        this.props.onChangeTitle && this.props.onChangeTitle(e);
    }

    onChangeDescription(e: React.FormEvent<HTMLInputElement>): void {
        this.props.onChangeDescription && this.props.onChangeDescription(e);
    }

    onChangeNumber(e: React.FormEvent<HTMLInputElement> ): void {
        this.props.onChangeNumber && this.props.onChangeNumber(e);
    }

    onCityChange(e: React.FormEvent<HTMLInputElement> ): void {
        this.props.onCityChange && this.props.onCityChange(e);
    }

    onFileChange(e: FileList ){
        this.getBase64(e[0]);
    }

    onSubmit(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();

        let titleValid = true, descriptionValid = true, numberValid = true;
        if (this.props.obj.title.length === 0 || this.props.obj.title.length > 100)
            titleValid = false;
        this.setState({titleValid: titleValid});

        if (this.props.obj.description.length > 300)
            descriptionValid = false;
        this.setState({descriptionValid: descriptionValid});

        if (!this.props.obj.number.match(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/))
            numberValid = false;
        this.setState({numberValid: numberValid});

        if (Number(numberValid) * Number(descriptionValid) * Number(numberValid))
        {
            this.props.onSubmit && this.props.onSubmit();
        }

        const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
        canvas.height = 0;
        if (this.fileInput) this.fileInput.value = '';
    }

    getBase64(file: Blob) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.changeImage(reader.result as string);
            this.props.onImageChange && this.props.onImageChange(reader.result)
        };
    }

    changeImage(image: string){
        const img = new Image();
        img.onload = function(){
            const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
            const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx && ctx.drawImage(img,0,0);
        };
        img.src = image;
    }

    render() {
        return (
            <form onSubmit={(e: any) => this.onSubmit(e)}>
                <div className="form-group">
                    <label>Название:  </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={"Название"}
                        value={this.props.obj.title}
                        maxLength={100}
                        onChange={(e) => this.onChangeTitle(e)}
                    />
                    <div className={this.checkValid('titleValid')}>Обязательно для заполнения. Не более 100 символов</div>
                </div>
                <div className="form-group">
                    <label>Описание: </label>
                    <input type="text"
                           className="form-control"
                           placeholder={"Описание"}
                           value={this.props.obj.description}
                           maxLength={300}
                           onChange={(e) => this.onChangeDescription(e)}
                    />
                    <div className={this.checkValid('descriptionValid')}>Не более 300 символов</div>
                </div>
                <div className="form-group">
                    <label>Номер телефона: </label>
                    <input type="text"
                           className="form-control"
                           placeholder={"+7(999)999-99-99"}
                           value={this.props.obj.number}
                           onChange={(e) => this.onChangeNumber(e)}
                    />
                    <div className={this.checkValid('numberValid')}>Обязательно для заполнения. Формат ввода: +7(999)999-99-99</div>
                </div>
                <div className="form-group">
                    <Select
                        value={this.props.obj.city}
                        placeholder={this.props.obj.city || "Выберите город"}
                        onChange={(e: any) =>  this.onCityChange(e)}
                        options={cities}
                    />
                </div>
                <div className="form-group">
                    <canvas id="canvas" height="0"/>
                    <input ref={(e) => this.fileInput = e}
                           type="file"
                           accept="image/*"
                           className="form-control"
                           onChange={(e) => this.onFileChange(e.target.files!)}
                    />
                </div>

                <div className="form-group">
                    <input type="submit" value={this.props.action || "Сохранить"} className="btn btn-primary"/>
                </div>
            </form>
        )
    }
}


export default Form;