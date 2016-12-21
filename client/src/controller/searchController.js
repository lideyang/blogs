/**
 * Created by lidy on 2016/12/18.
 */
import React from 'react';
import ReactDOM from 'react-dom/server';
import SearchComponent from '../js/pages/search';
import baseController from './baseController'
import Action from '../api';
export default class Search extends baseController {
    constructor(req, res) {
        super(req, res);
    }
}