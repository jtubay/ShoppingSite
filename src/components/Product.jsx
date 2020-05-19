import React, { Component } from 'react';
import { ProductWrapper }  from './Styled.jsx'
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';
import PropTypes from 'prop-types';

export default class Product extends Component {
    render() {
        return (
            <div>
                <h1>product</h1>
            </div>
        )
    }
}
