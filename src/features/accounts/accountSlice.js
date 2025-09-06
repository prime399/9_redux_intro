import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit_deprecated(state, action){ //Action creator and reducer in the same
            state.balance += action.payload.deposit //here (action.paylod.deposit) won't work because, redux toolkit only allows one default argument in dispatcher call, it either needs a object argument or prepare function for multiple number of payloads via argument
        },

        //Second Variant for Deposit Action Creator
        deposit:{ 
            prepare(depositAmount,  ){
                return {
                    payload: {depositAmount, currency, convertedAmount}
                }
            },
            reducer(state,action){ //this is deposit account reducer
                if(action.payload.currency === "USD") {
                    state.balance += action.payload.depositAmount
                } else{
                    state.balance += action.payload.convertedAmount || 0
                }
                
            }
        },

        withdraw(state, action){
            state.balance -+ action.payload.withdraw
        },

        requestLoan: {
            prepare(amount, loanPurpose){
                return {
                    payload:{amount, loanPurpose}
                }
            },
            
            reducer (state,action){
            if(state.loan > 0) return; //This means if there is an existing loan already in the same account we won't proceed with another
            state.loan = action.payload.loan
            state.loanPurpose = action.payload.loanPurpose
            state.balance = action.payload.amount
            }
        },
        payLoan(state,action){
            state.loan = 0
            state.loanPurpose = ""
            state.balance -= state.loan
        }
    }
})

async function convert (from, to, amount){
    const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
    const data = await res.json()
    return (amount * data.rates[to].toFixed(2));
}

export function deposit(depositAmount, currency){
    if (currency === "USD") return {type: "account/deposit", payload: { depositAmount,  currency}};

    return async function (dispatch, getState){
        const convertedAmount = await convert( currency, "INR", depositAmount )
        console.log(convertedAmount)
        dispatch({type: "account/deposit", payload: { depositAmount, currency, convertedAmount }})
    }
}

export const { withdraw, requestLoan, payLoan} = accountSlice.actions
export default accountSlice.reducer;

/*
export default function accountReducer(state = initialState, action){

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
*/