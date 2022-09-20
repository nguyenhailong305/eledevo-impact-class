import * as actions from '../actions/ItemAction'
import callAPI from '../fetchAPIs/ItemAPI'
import * as types from '../constants'
import {put , takeEvery , select} from 'redux-saga/effects'

function* Add(action) {
    try {
        const store = yield select((state) => state.items)
        yield callAPI('POST' , '' ,action.payload)
        yield put(actions.addSuccess())
        if(store.textSearch) {
            if(action.payload.name.includes(store.textSearch)){
                const res = yield callAPI('GET' , `/search?activePage=${store.activePage}&limit=${types.LIMIT}&textSearch=${store.textSearch}` )
                yield put(actions.searchRequest({
                    textSearch  : store.textSearch,
                    activePage : res.totalPage
                }))
            }else {
                yield put(actions.searchSuccess({
                    textSearch  : store.textSearch,
                    activePage : 1,
                    totalPage : 1,
                    listData : [action.payload]
                }))
            }
        }else {
            const res = yield callAPI('GET' , `/paginate?activePage=${action.payload}&limit=${types.LIMIT}` )
            yield put(actions.paginateRequest(res.totalPage))
        }
       
    } catch (error) {
        yield put(actions.addFailure(error))
    }
}

function* Delete(action) {
    try {
        const store = yield select((state) => state.items)
        yield callAPI('DELETE' , `/${action.payload.id}` )
        yield put(actions.deleteSuccess())
        if(store.textSearch) {
            if(store.listItem.length === 1 && store.activePage === 1 ){
                yield put(actions.searchRequest({
                    textSearch : store.textSearch,
                    activePage : 1
                }))
            }else if (store.listItem.length <=1) {
                yield put(actions.searchRequest({
                    textSearch : store.textSearch,
                    activePage : store.totalPage -=1
                }))
            }else {
                yield put(actions.searchRequest({
                    textSearch : store.textSearch,
                    activePage : store.activePage
                }))
            }
        }else {
            if(store.listItem.length === 1 && store.activePage === 1 ){
                yield put(actions.paginateRequest(
                    store.activePage = 1
                ))
            }else if (store.listItem.length <=1) {
                yield put(actions.paginateRequest(
                    store.totalPage -=1
                ))
            }else {
                yield put(actions.paginateRequest(
                    store.activePage
                ))
            }
        }
    } catch (error) {
        yield put(actions.deleteFailure(error))
    }
}

function* Update(action) {
    try {
        const store = yield select((state) => state.items)
        yield callAPI('PUT' , `/${action.payload.id}` ,action.payload )
        yield put(actions.updateSuccess())
        if(store.textSearch) {
            if(action.payload.name.includes(store.textSearch)){
                yield put(actions.searchRequest({
                    textSearch  : store.textSearch,
                    activePage : store.activePage
                }))
            }else {
                yield put(actions.searchSuccess({
                    textSearch  : action.payload.name ,
                    activePage : 1,
                    totalPage : 1,
                    listData : [action.payload]
                }))
            }
        }else {
            yield put(actions.paginateRequest(store.activePage))
        }
       
    } catch (error) {
        yield put(actions.updateFailure(error))
    }
}


function* Paginate(action) {
    try {
        const res = yield callAPI('GET' , `/paginate?activePage=${action.payload}&limit=${types.LIMIT}` )
        if(res.totalPage === 0) {
            res.totalPage =1
        }
        yield put(actions.paginateSuccess({
            listData : res.listData,
            totalPage : res.totalPage,
            activePage : action.payload
        }))

    } catch (error) {
        yield put(actions.paginateFailure(error))
    }
}

function* Search(action) {
    try {
        const res = yield callAPI('GET' , `/search?activePage=${action.payload.activePage}&limit=${types.LIMIT}&textSearch=${action.payload.textSearch}` )
        if(res.totalPage === 0) {
            res.totalPage =1
        }
        yield put(actions.searchSuccess({
            listData : res.listData,
            totalPage : res.totalPage,
            activePage : action.payload.activePage,
            textSearch : action.payload.textSearch
        }))

    } catch (error) {
        yield put(actions.searchFailure(error))
    }
}


const ItemSaga = [
    takeEvery(types.ADD_ITEMS_REQUEST , Add),
    takeEvery(types.UPDATE_ITEMS_REQUEST , Update),
    takeEvery(types.DELETE_ITEMS_REQUEST , Delete),
    takeEvery(types.PAGINATE_ITEMS_REQUEST , Paginate),
    takeEvery(types.SEARCH_ITEMS_REQUEST , Search),
]

export default ItemSaga