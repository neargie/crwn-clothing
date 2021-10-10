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
                {this.state.sections.map(({id, ...otherSectionsProps}) => (
                    <MenuItem
                        key={id}
                        {...otherSectionsProps}
                    />)
                )}
            </div>
        )
    }
}
export default Directory;