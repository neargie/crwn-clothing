import React from 'react';

import MenuItem from '../menu-item/menu-item.component'
import './directory.styles.scss'
import {createStructuredSelector} from "reselect";
import {selectDirectorySection} from "../../redux/directory/directory.selector";
import {connect} from "react-redux";

const Directory = ({sections}) => {
    return (
        <div className='directory-menu'>
            {sections.map(({id, ...otherSectionsProps}) => (
                <MenuItem
                    key={id}
                    {...otherSectionsProps}
                />)
            )}
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySection
})
export default connect(mapStateToProps)(Directory);