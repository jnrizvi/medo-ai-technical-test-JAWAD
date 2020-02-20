import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';

export class App extends React.Component<undefined, undefined>
{
    constructor(props: any)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selectorFiles: FileList)
    {
        console.log(selectorFiles);
    }

    render ()
    {
        return <div>
            <input type="file" onChange={ (e) => this.handleChange(e.target.files) } />
        </div>;
    }
}
