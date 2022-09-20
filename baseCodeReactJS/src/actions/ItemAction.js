import * as types from '../constants'

function addRequest(payload) {
    return {
        type : types.ADD_ITEMS_REQUEST,
        payload
    }
}

function addSuccess(payload) {
    return {
        type : types.ADD_ITEMS_SUCCESS,
        payload
    }
}

function addFailure(payload) {
    return {
        type : types.ADD_ITEMS_FAILURE,
        payload
    }
}



function deleteRequest(payload) {
    return {
        type : types.DELETE_ITEMS_REQUEST,
        payload
    }
}

function deleteSuccess(payload) {
    return {
        type : types.DELETE_ITEMS_SUCCESS,
        payload
    }
}

function deleteFailure(payload) {
    return {
        type : types.DELETE_ITEMS_FAILURE,
        payload
    }
}



function updateRequest(payload) {
    return {
        type : types.UPDATE_ITEMS_REQUEST,
        payload
    }
}

function updateSuccess(payload) {
    return {
        type : types.UPDATE_ITEMS_SUCCESS,
        payload
    }
}

function updateFailure(payload) {
    return {
        type : types.UPDATE_ITEMS_FAILURE,
        payload
    }
}



function paginateRequest(payload) {
    return {
        type : types.PAGINATE_ITEMS_REQUEST,
        payload
    }
}

function paginateSuccess(payload) {
    return {
        type : types.PAGINATE_ITEMS_SUCCESS,
        payload
    }
}

function paginateFailure(payload) {
    return {
        type : types.PAGINATE_ITEMS_FAILURE,
        payload
    }
}


function searchRequest(payload) {
    return {
        type : types.SEARCH_ITEMS_REQUEST,
        payload
    }
}

function searchSuccess(payload) {
    return {
        type : types.SEARCH_ITEMS_SUCCESS,
        payload
    }
}

function searchFailure(payload) {
    return {
        type : types.SEARCH_ITEMS_FAILURE,
        payload
    }
}   



export {
    addRequest , addSuccess , addFailure ,
    updateRequest , updateSuccess , updateFailure,
    deleteRequest , deleteSuccess , deleteFailure,
    paginateRequest , paginateSuccess , paginateFailure,
    searchRequest , searchSuccess , searchFailure
}