import React, { } from 'react';
import List from '../StudentComponent/List';
const Student = () => {
    const TH = [
        ['sr', 'cent8'],
        ['name', 'cent8'],
        ['motherName', 'cent8'],
        ['bloodGroup', 'cent8'],
        ['gender', 'cent8'],
        ['dateOfBirth', 'cent8'],
        ['adhaarNo', 'cent8'],
        ['orphanCategory', 'cent8']
    ];
    const attr = (name) => {
        return {
            type: 'number',
            value: ''
        }
    }
    return <List TH={TH} field='Student' />
}
export default Student;