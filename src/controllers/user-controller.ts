import { prisma } from "..";

/**
 * @param id The id of the user
 * @returns The user's current balance
 */
async function balance(id: number): Promise<number> {
  try {
    // Find the user's account that matches the id
    const acc = await prisma.account.findUnique({ where: { userId: id } });

    // Check if the account exists
    if (!acc) {
      throw new Error("Account doesn't exist");
    }

    // Return the user's balance
    return acc.balance;
  } catch (err: any) {
    // If an error occured during execution (most likely prisma) return a generic message
    throw new Error("User's account couldn't be found");
  }
}

/**
 * Deposits the specified amount to the user's account
 * @param id The id of the user
 * @param amount The amount to be deposited
 * @returns The new balance after the deposit
 * @throws Will throw an error if the user is not found
 */
async function deposit(id: number, amount: number): Promise<number> {
  try {
    // Find the user's account that matches the id
    const acc = await prisma.account.findUnique({ where: { userId: id } });

    // Check if the account exists
    if (!acc) {
      throw new Error("Account doesn't exist");
    }

    // Store the amount to the account
    const updatedAcc = await prisma.account.update({
      where: { id: acc.id },
      data: { balance: acc.balance + amount },
    });

    // Return the user's balance
    return updatedAcc.balance;
  } catch (err: any) {
    // If an error occured during execution (most likely prisma) return a generic message
    throw new Error("User's account couldn't be found");
  }
}

/**
 * Deposits the specified amount to the user's account
 * @param id The id of the user
 * @param amount The amount to be withdrawn
 * @returns The new balance after the withdrawal
 * @throws Will throw an error if the user is not found or the amount requested is greater than the user's balance
 */
async function withdraw(id: number, amount: number): Promise<number> {
  try {
    // Find the user's account that matches the id
    const acc = await prisma.account.findUnique({ where: { userId: id } });

    // Check if the account exists
    if (!acc) {
      throw new Error("Account doesn't exist");
    }

    // Check if the withdrawal can be made
    if (amount > acc.balance) {
      throw new Error("Insufficient funds in user's account");
    }

    // Withdraw the amount to the account
    const updatedAcc = await prisma.account.update({
      where: { id: acc.id },
      data: { balance: acc.balance - amount },
    });

    // Return the user's balance
    return updatedAcc.balance;
  } catch (err: any) {
    // If an error occured during execution (most likely prisma) return a generic message
    throw new Error("User's account couldn't be found");
  }
}

export default {
  balance,
  deposit,
  withdraw,
};
