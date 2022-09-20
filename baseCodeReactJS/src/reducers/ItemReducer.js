import * as types from '../constants'

const DEFAULT_STATE = {
    listItem : [],
    error : false,
    isFetching : false,
    dataFetched : false,
    errorMessage : null,
    totalPage : 1,
    activePage : 1,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = DEFAULT_STATE  , action)  =>{ 
    switch (action.type) {
        case types.ADD_ITEMS_REQUEST:
        case types.DELETE_ITEMS_REQUEST:
        case types.UPDATE_ITEMS_REQUEST:
        case types.SEARCH_ITEMS_REQUEST:
        case types.PAGINATE_ITEMS_REQUEST:
            return {
                ...state ,
                isFetching : true,
                error : false,
                errorMessage : null,
                dataFetched : false,
            }
            case types.ADD_ITEMS_SUCCESS:
            case types.UPDATE_ITEMS_SUCCESS:
            case types.DELETE_ITEMS_SUCCESS:
                return {
                    ...state ,
                    isFetching : false,
                }

                case types.PAGINATE_ITEMS_SUCCESS:
                    return {
                        ...state ,
                        isFetching : false,
                        dataFetched : true,
                        listItem : action.payload.listData,
                        totalPage : action.payload.totalPage,
                        activePage : action.payload.activePage
                    }

                    case types.SEARCH_ITEMS_SUCCESS:
                        return {
                            ...state ,
                            isFetching : false,
                            dataFetched : true,
                            listItem : action.payload.listData,
                            totalPage : action.payload.totalPage,
                            activePage : action.payload.activePage,
                            textSearch : action.payload.textSearch
                        }
        
                case types.ADD_ITEMS_FAILURE:
                case types.UPDATE_ITEMS_FAILURE:
                case types.DELETE_ITEMS_FAILURE:
                case types.PAGINATE_ITEMS_FAILURE:
                case types.SEARCH_ITEMS_FAILURE:
                    return {
                        ...state ,
                        isFetching :false,
                        error : true,
                        errorMessage : action.payload.errorMessage,
                        dataFetched : false,
                    }
            
        default:
           return state
    }
}