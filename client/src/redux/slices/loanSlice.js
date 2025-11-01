import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loanAmount: 100000,
  tenure: 24,
  purpose: 'Other',
  interestRate: 13.0,
  emi: 0,
  totalInterest: 0,
  totalAmount: 0,
  salary: 0,
  creditScore: null,
  eligibilityTier: null,
  status: 'pending',
  documents: [],
  sanctionLetter: null
};

const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    setLoanAmount: (state, action) => {
      state.loanAmount = action.payload;
    },
    setTenure: (state, action) => {
      state.tenure = action.payload;
    },
    setPurpose: (state, action) => {
      state.purpose = action.payload;
      // Update interest rate based on purpose
      const rates = {
        'Education': 12.5,
        'Medical': 12.0,
        'Business': 13.5,
        'Home Renovation': 13.0,
        'Wedding': 13.5,
        'Travel': 14.0,
        'Other': 13.0
      };
      state.interestRate = rates[action.payload] || 13.0;
    },
    setInterestRate: (state, action) => {
      state.interestRate = action.payload;
    },
    calculateEMI: (state) => {
      const P = state.loanAmount;
      const r = state.interestRate / 12 / 100;
      const n = state.tenure;
      
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalAmount = emi * n;
      const totalInterest = totalAmount - P;
      
      state.emi = Math.round(emi);
      state.totalAmount = Math.round(totalAmount);
      state.totalInterest = Math.round(totalInterest);
    },
    setSalary: (state, action) => {
      state.salary = action.payload;
    },
    setCreditScore: (state, action) => {
      state.creditScore = action.payload;
    },
    setEligibilityTier: (state, action) => {
      state.eligibilityTier = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    addDocument: (state, action) => {
      state.documents.push(action.payload);
    },
    setSanctionLetter: (state, action) => {
      state.sanctionLetter = action.payload;
    },
    resetLoan: (state) => {
      return initialState;
    }
  }
});

export const {
  setLoanAmount,
  setTenure,
  setPurpose,
  setInterestRate,
  calculateEMI,
  setSalary,
  setCreditScore,
  setEligibilityTier,
  setStatus,
  addDocument,
  setSanctionLetter,
  resetLoan
} = loanSlice.actions;

export default loanSlice.reducer;
