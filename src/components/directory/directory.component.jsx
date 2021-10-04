import React from 'react';

import MenuItem from '../menu-item/menu-item.component'
import './directory.styles.scss'

const directoryData = require('./directory.data');

class Directory extends React.Component {
    constructor() {
        super();

        this.state = {
            sections: directoryData
        }
    }

    render() {
        return (
            <div className='directory-menu'>
                {this.state.sections.map(({id, title, imageUrl, size}) => (
                    <MenuItem
                        key={id}
                        title={title}
                        imageUrl={imageUrl}
                        size={size}
                    />)
                )}
            </div>
        )
    }
}
export default Directory;