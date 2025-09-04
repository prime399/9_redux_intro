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

async function convert (from, to, amount){
    const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
    const data = await res.json()
    return (amount * data.rates[to].toFixed(2));
}

export function deposit(depositAmount, currency){
    if (currency === "USD") return {type: "account/deposit", payload: {deposit: depositAmount}};

    return async function (dispatch, getState){
        const convertedAmount = await convert( currency, "INR", depositAmount )
        console.log(convertedAmount)
        dispatch({type: "account/deposit", payload: {deposit: convertedAmount}})
    }
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