const initialState = [];

const AddUser = (state = initialState, action) => {
    switch (action.type) {
        case "ADDUSER":
            const { id, data } = action.payload;
            return {
                ...state, 
                id:id,data:data}
        default: return state;
    }
}
export default AddUser;
