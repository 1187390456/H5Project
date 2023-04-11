/*
 * @Page: Do not edit
 * @Version: Do not edit
 * @Autor: Do not edit
 * @Date: 2021-09-09 14:39:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-04 16:38:52
 */
import fetch from '../fetch'
export const allUnionList = (data) => {
    return fetch({
        url: '/workbench/all-union',
        method: 'post',
        data
    })
}

export const unionCoreData = (data) => {
    return fetch({
        url: '/workbench/core-data',
        method: 'post',
        data
    })
}

export const unionDelete = (data) => {
    return fetch({
        url: '/workbench/union-delete',
        method: 'post',
        data
    })
}

export const unionAdd = (data) => {
    return fetch({
        url: '/workbench/union-add',
        method: 'post',
        data
    })
}

export const unionEdit = (data) => {
    return fetch({
        url: '/workbench/union-modify',
        method: 'post',
        data
    })
}
export const getPopper = (data) => {
    return fetch({
        url: '/agent/notice',
        method: 'post',
        data
    })
}
export const readPop = (data) => {
    return fetch({
        url: '/agent/notice-read',
        method: 'post',
        data
    })
}

