const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};

export default function accountReducer(state = initialStateAccount, action){

    const payload = action.payload

    switch (action.type) {
        case "account/deposit":
            return { ...state, balance: state.balance + payload.deposit };
        case "account/withdraw":
            return { ...state, balance: state.balance - payload.withdraw };
        case "account/requestLoan":
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: payload.loan,
                loanPurpose: payload.purpose,
                balance: state.balance + payload.amount,
            };
        case "account/payLoan":
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan,
            };
        default:
            return state;
    }
}


export function deposit(depositAmount){
    return {type: "account/deposit", 
        payload: {deposit: depositAmount}}
}

export function withdraw(withdrawAmount){
    return {type: "account/withdraw", 
        payload: {withdraw: withdrawAmount}}
}

export function requestLoan(amount, purpose) {
    return {
        type: "account/requestLoan",
        payload: {
            amount,
            purpose: purpose,
            loan: amount,
        },
    };
}

export function payLoan() {
    return { type: "account/payLoan" };
}