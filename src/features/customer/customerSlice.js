const initialStateCustomer= {
    fullName: "",
    nationalId: "",
    createdAt: "",
}


export default function customerReducer(state=initialStateCustomer, action){

    const payload =  action.payload

    switch(action.type){
        case "customer/createCustomer":
            return {
                ...state,
                fullName: payload.fullName,
                nationalId: payload.nationalId,
                createdAt: payload.createdAt,
            }
        case "customer/updateName":
            return{
                ...state,
                fullName: payload.fullName
            }
        default:
            return{...state}
    }
}

export function createCustomer(fullName, nationalId) {
    return {
        type: "customer/createCustomer",
        payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
        },
    };
}

export function updateName(fullName){
    return {
        type: "customer/updateName",
        payload:{
            fullName:fullName
        }
    }
}
