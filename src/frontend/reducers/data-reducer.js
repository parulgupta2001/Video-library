export function dataReducer(state, action) {
  switch (action.type) {
    case "HISTORY":
      return { ...state, historyData: action.payload };
    case "WATCH_LATER":
      return { ...state, watchLaterData: action.payload };
    case "LIKED":
      return { ...state, likedData: action.payload };

    case "CATEGORY":
      return { ...state, filteredData: state.originalData.filter(data => data.category.toLowerCase() === action.payload.toLowerCase()) }

    case "ORIGINAL":
      return {
        ...state,
        filteredData: action.payload,
        originalData: action.payload,
      };

    case "SEARCH":
      return {
        ...state, filteredData: state.originalData.filter(data => data.title.toLowerCase().includes(action.payload.toLowerCase()))
      }

    default:
      return state;
  }
}