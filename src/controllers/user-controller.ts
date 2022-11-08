/**
 * @param id The id of the user
 * @returns The user's current balance
 */
async function balance(id: number): Promise<number> {
  return -1;
}

/**
 * Deposits the specified amount to the user's account
 * @param id The id of the user
 * @param amount The amount to be deposited
 * @returns The new balance after the deposit
 * @throws Will throw an error if the user is not found
 */
async function deposit(id: number, amount: number): Promise<number> {
  return -1;
}

/**
 * Deposits the specified amount to the user's account
 * @param id The id of the user
 * @param amount The amount to be withdrawn
 * @returns The new balance after the withdrawal
 * @throws Will throw an error if the user is not found or the amount requested is greater than the user's balance
 */
async function withdraw(id: number, amount: number): Promise<number> {
  return -1;
}

export default {
  balance,
  deposit,
  withdraw,
};
