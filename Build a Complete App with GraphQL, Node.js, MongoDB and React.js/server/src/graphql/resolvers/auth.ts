import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../../models";
import { UserInput } from "../../interfaces/User";
import { transformUser } from "./merge";

const createUser = async (args: { userInput: UserInput }) => {
    try {
        const { email, password } = args.userInput;
        const user = await User.findOne({ email });
        if (user) {
            throw new Error("User already exists!");
        }

        const hashedPassword = await hash(password, 12);
        if (!hashedPassword) {
            throw new Error("Creating user failed, please try again!");
        }
        const newUser = new User({ email, password: hashedPassword });
        const createdUser = await newUser.save();
        return transformUser(createdUser);
    } catch (error) {
        throw error;
    }
};

const login = async (args: { email: string; password: string }) => {
    try {
        const { email, password } = args;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User doesn't exists!");
        }
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new Error("Incorrect Password!");
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_KEY!,
            { expiresIn: "1h" }
        );
        return { userId: user.id, token, tokenExpiration: 1 };
    } catch (error) {
        throw error;
    }
};

export default { createUser, login };
